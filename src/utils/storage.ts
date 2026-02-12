import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage utility for AsyncStorage operations
 */
class StorageService {
  /**
   * Save data to AsyncStorage
   */
  async save(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
      throw error;
    }
  }

  /**
   * Get data from AsyncStorage
   */
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error getting ${key} from storage:`, error);
      return null;
    }
  }

  /**
   * Remove data from AsyncStorage
   */
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
      throw error;
    }
  }

  /**
   * Clear all data from AsyncStorage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Get all keys from AsyncStorage
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }
}

export const storage = new StorageService();

/**
 * Clear all storage except username
 */
export const clearStorageExceptUsername = async (): Promise<void> => {
  try {
    const username = await storage.get('username');
    await storage.clear();
    if (username) {
      await storage.save('username', username);
    }
  } catch (error) {
    console.error('Error clearing storage except username:', error);
  }
};
