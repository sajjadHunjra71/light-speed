import { theme } from '@theme';

/**
 * Helper function to safely get nested object values (similar to lodash.get)
 * This function traverses a nested object using dot notation paths
 */
const getNestedValue = (obj: any, path: string, fallback?: any) => {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = result[key];
        } else {
            return fallback !== undefined ? fallback : path;
        }
    }

    return result;
};

/**
 * useToken hook for resolving theme tokens
 *
 * Based on NativeBase's useToken implementation, this function resolves
 * theme tokens like colors, spacing, etc. from the theme object.
 *
 * @param property - The theme property category (e.g., 'colors', 'spacing')
 * @param token - The token name or array of token names (e.g., 'coolGray.400' or ['coolGray.400', 'primary.500'])
 * @param fallback - Optional fallback value(s) if token is not found
 * @returns The resolved token value(s) from the theme
 *
 * @example
 * // Single token
 * const color = useToken('colors', 'coolGray.400')
 *
 * // Multiple tokens
 * const [inactive, active] = useToken('colors', ['coolGray.400', 'coolGray.900'])
 *
 * // With fallback
 * const color = useToken('colors', 'nonexistent.color', '#FF0000')
 */
export const useToken = <T extends string | number>(property: string, token: T | T[], fallback?: T | T[]): T | T[] => {
    // Handle array of tokens (like NativeBase)
    if (Array.isArray(token)) {
        const fallbackArr: T[] = fallback ? (Array.isArray(fallback) ? fallback : [fallback]) : [];

        return token.map((innerToken, index) => {
            const path = `${property}.${innerToken}`;
            const resolvedValue = getNestedValue(theme, path, fallbackArr[index] ?? innerToken);
            return resolvedValue as T;
        }) as T[];
    }

    // Handle single token
    const path = `${property}.${token}`;
    const resolvedValue = getNestedValue(theme, path, fallback ?? token);

    // Log warning if token not found (only in development)
    if (resolvedValue === path && process.env.NODE_ENV === 'development') {
        console.warn(`Token not found: ${property}.${token}`);
    }

    return resolvedValue as T;
};

/**
 * useColorModeValue hook for theme-aware color values
 *
 * This function returns different values based on the current color mode
 * (light/dark theme).
 *
 * @param light - Value to return in light mode
 * @param dark - Value to return in dark mode
 * @returns The appropriate value based on current color mode
 */
export const useColorModeValue = (light: any, dark: any) => {
    // TODO: Implement proper color mode detection with GlueStack UI
    const colorScheme = require('react-native').Appearance?.getColorScheme();
    return colorScheme === 'dark' ? dark : light;
};

/**
 * useColorMode hook for color mode management
 *
 * Provides access to the current color mode and toggle functionality
 *
 * @returns Object with colorMode and toggleColorMode function
 */
export const useColorMode = () => {
    // TODO: Implement proper color mode management with GlueStack UI
    const colorScheme = require('react-native').Appearance?.getColorScheme();
    return {
        colorMode: colorScheme || 'light',
        toggleColorMode: () => console.warn('toggleColorMode not implemented with GlueStack UI yet'),
    };
};
