import { extractErrorMessage } from '@utils/api-utils';
import { clearStorageExceptUsername, storage } from '@utils/storage';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';

// Configuration constants (to be replaced with actual values)
const API_KEY = 'your-api-key';
const BASE_URL = 'https://your-api-url.com';
const TENANT_NAME = 'your-tenant';

// Control variable for console logging
const ENABLE_API_LOGGING = __DEV__;

// HTTP Status codes
const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
} as const;

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  headers?: Record<string, any>;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  uuid?: string;
}

/**
 * Enhanced HTTP Client with automatic token refresh and error handling
 * 
 * Note: This is prepared for future API integration.
 * Currently, auth screens use setTimeout for simulation.
 */
class ApiClient {
  private readonly client: AxiosInstance;
  private token: string | undefined;
  private refreshToken: string | undefined;
  private readonly isDevMode: boolean = __DEV__;
  private readonly logPrefix: string = '[API Client]';
  private refreshPromise: Promise<TokenResponse> | null = null;

  constructor(tenantName: string, additionalHeaders: Record<string, string> = {}) {
    this.client = this.createAxiosInstance(tenantName, additionalHeaders);
    this.setupInterceptors();
  }

  /**
   * Creates and configures the Axios instance with default headers
   */
  private createAxiosInstance(tenantName: string, additionalHeaders: Record<string, string>): AxiosInstance {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
        tenantName,
        ...additionalHeaders,
      },
    });
  }

  /**
   * Sets up request and response interceptors
   */
  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      this.handleRequest.bind(this),
      this.handleRequestError.bind(this)
    );

    this.client.interceptors.response.use(
      this.handleSuccessResponse.bind(this),
      this.handleErrorResponse.bind(this)
    );
  }

  /**
   * Handles outgoing requests - adds authorization and logs request details
   */
  private handleRequest(apiConfig: any): any {
    this.addAuthorizationHeader(apiConfig);
    this.logRequestDetails(apiConfig);
    return apiConfig;
  }

  private handleRequestError(error: any): Promise<never> {
    this.logError('Request Error', error);
    return Promise.reject(error);
  }

  /**
   * Handles successful responses and logs response details
   */
  private handleSuccessResponse(response: AxiosResponse): any {
    this.logResponseDetails(response);
    return response.data;
  }

  /**
   * Comprehensive error handling with retry logic for token refresh
   */
  private async handleErrorResponse(error: any): Promise<any> {
    this.logError('Response Error', error);

    if (!error.response) {
      this.handleNetworkError(error);
      throw error;
    }

    // Handle token refresh for 401 errors
    if (this.shouldAttemptTokenRefresh(error)) {
      return this.attemptTokenRefresh(error);
    }

    throw error;
  }

  /**
   * Determines if a token refresh should be attempted
   */
  private shouldAttemptTokenRefresh(error: any): boolean {
    const originalRequest = error.config;
    const hasAuthHeader = originalRequest?.headers?.Authorization;
    const isUnauthorized = error.response?.status === HTTP_STATUS.UNAUTHORIZED;
    return !!(hasAuthHeader && isUnauthorized && !originalRequest?._retry);
  }

  /**
   * Attempts to refresh the access token and retry the original request
   */
  private async attemptTokenRefresh(error: any): Promise<any> {
    const originalRequest = error.config!;
    originalRequest._retry = true;

    try {
      const tokenResponse = await this.refreshAccessToken();
      if (!tokenResponse) {
        return Promise.reject(error);
      }
      this.client.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.access_token}`;
      return this.client.request(originalRequest);
    } catch (refreshError) {
      this.logError('Token refresh failed', refreshError);
      return Promise.reject(error);
    }
  }

  /**
   * Handles network-related errors (no response received)
   */
  private handleNetworkError(error: any): void {
    if (error.request) {
      this.logError('Network Error: No response received', error.request);
    } else {
      const message = extractErrorMessage(error.message || '');
      this.logError('Request Setup Error', message);
    }
  }

  /**
   * Adds authorization header to requests if token is available
   */
  private addAuthorizationHeader(config: CustomAxiosRequestConfig): void {
    if (this.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = this.token.includes('Bearer') 
        ? this.token 
        : `Bearer ${this.token}`;
    }
  }

  /**
   * Logs detailed request information in development mode
   */
  private logRequestDetails(config: any): void {
    if (!ENABLE_API_LOGGING) return;

    const endpoint = config.url?.split('/').pop() || 'unknown';
    console.log(`🚀 ${this.logPrefix} Request to /${endpoint}:`, {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
      data: config.data,
    });
  }

  /**
   * Logs detailed response information in development mode
   */
  private logResponseDetails(response: AxiosResponse): void {
    if (!ENABLE_API_LOGGING) return;

    const endpoint = response.config.url?.split('/').pop() || 'unknown';
    console.log(`✅ ${this.logPrefix} Response from /${endpoint}:`, {
      status: response.status,
      data: response.data,
    });
  }

  /**
   * Logs error information in development mode
   */
  private logError(context: string, error: any): void {
    if (!ENABLE_API_LOGGING) return;

    const endpoint = error?.config?.url?.split('/').pop() || 'unknown';
    console.log(`❌ ${this.logPrefix} ${context} for /${endpoint}:`, {
      message: error?.message,
      response: error?.response?.data,
    });
  }

  /**
   * Sets authentication tokens
   */
  async setToken(token: TokenResponse): Promise<void> {
    const { access_token, refresh_token } = token || {};
    if (!access_token || !refresh_token) {
      this.logError('Invalid tokens provided', { token: !!access_token, refreshToken: !!refresh_token });
      return;
    }
    this.token = access_token;
    this.refreshToken = refresh_token;
  }

  /**
   * Gets current token
   */
  getToken(): string | undefined {
    return this.token;
  }

  /**
   * Clears stored tokens and resets application state
   */
  async resetStorage(): Promise<void> {
    this.token = undefined;
    this.refreshToken = undefined;

    try {
      await clearStorageExceptUsername();
    } catch (error) {
      this.logError('Error while resetting storage', error);
    }
  }

  /**
   * Refreshes the access token using the refresh token
   */
  private async refreshAccessToken(): Promise<TokenResponse | null> {
    if (!this.refreshToken) {
      await this.resetStorage();
      return null;
    }

    try {
      const parsedToken: any = jwtDecode(this.refreshToken);
      const isExpired = parsedToken?.exp 
        ? parsedToken.exp < Math.floor(Date.now() / 1000) 
        : true;

      if (isExpired) {
        await this.resetStorage();
        return null;
      }

      // Use the shared refresh promise
      if (this.refreshPromise) {
        return this.refreshPromise;
      }

      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', this.refreshToken || '');

      this.refreshPromise = this.post<TokenResponse>('/auth/oauth/token', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((response) => {
          const { access_token } = response;
          if (access_token) {
            this.setToken(response);
            storage.save('token', response);
          }
          return response;
        })
        .catch(async (error) => {
          await this.resetStorage();
          throw error;
        })
        .finally(() => {
          this.refreshPromise = null;
        });

      return this.refreshPromise;
    } catch (error) {
      this.logError('Token refresh failed', error);
      await this.resetStorage();
      throw error;
    }
  }

  // HTTP Methods

  /**
   * Performs a GET request
   */
  async get<T = any>(endpoint: string, params?: any, headers?: any): Promise<T> {
    try {
      const response: any = await this.client.get(endpoint, { params, headers });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Performs a POST request
   */
  async post<T = any>(endpoint: string, data?: any, options?: any): Promise<T> {
    try {
      const response: any = await this.client.post(endpoint, data, options);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Performs a PUT request
   */
  async put<T = any>(endpoint: string, data?: any, options?: any): Promise<T> {
    try {
      const response: any = await this.client.put(endpoint, data, options);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Performs a DELETE request
   */
  async delete<T = any>(endpoint: string, headers?: any): Promise<T> {
    try {
      const response: any = await this.client.delete(endpoint, { headers });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const client = new ApiClient(TENANT_NAME);

// Export utility function
export const setAccessAndRefreshToken = async (token: TokenResponse) => {
  await client.setToken(token);
  await storage.save('token', token);
};
