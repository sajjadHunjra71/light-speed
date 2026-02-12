import { storage } from '@utils/storage';
import { Alert } from 'react-native';

export interface User {
  email: string;
  name: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

/**
 * Login function - simulates API call with setTimeout
 */
export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // Simulate successful login
        const mockResponse: AuthResponse = {
          access_token: 'mock_access_token_' + Date.now(),
          refresh_token: 'mock_refresh_token_' + Date.now(),
          user: {
            email,
            name: 'User Name',
          },
        };

        // Save token to AsyncStorage
        await storage.save('authToken', mockResponse);
        
        Alert.alert('Success', 'Login successful!');
        resolve(mockResponse);
      } catch (error) {
        reject(error);
      }
    }, 1500); // 1.5 second delay
  });
};

/**
 * Signup function - simulates API call with setTimeout
 */
export const signupApi = async (
  name: string,
  email: string,
  phone: string,
  password: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // Simulate successful signup
        Alert.alert('Success', 'Registration successful! Please login.');
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 1500); // 1.5 second delay
  });
};

/**
 * Forgot password function - simulates API call with setTimeout
 */
export const forgotPasswordApi = async (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // Simulate successful password reset request
        Alert.alert(
          'Success',
          'Password reset link has been sent to your email.'
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 1500); // 1.5 second delay
  });
};

/**
 * Change password function - simulates API call with setTimeout
 */
export const changePasswordApi = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // Simulate successful password change
        Alert.alert('Success', 'Password changed successfully!');
        resolve();
      } catch (error) {
        reject(error);
      }
    }, 1500); // 1.5 second delay
  });
};

/**
 * Logout function - clears AsyncStorage
 */
export const logoutApi = async (): Promise<void> => {
  try {
    await storage.remove('authToken');
    Alert.alert('Success', 'Logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
    Alert.alert('Error', 'Failed to logout');
    throw error;
  }
};
