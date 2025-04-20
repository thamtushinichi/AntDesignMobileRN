import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utility functions for working with AsyncStorage
 */
const storage = {
  /**
   * Get an item from storage
   * @param key Storage key
   */
  get: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from storage:`, error);
      return null;
    }
  },

  /**
   * Store an item in storage
   * @param key Storage key
   * @param value Item to store
   */
  set: async <T>(key: string, value: T): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in storage:`, error);
      return false;
    }
  },

  /**
   * Remove an item from storage
   * @param key Storage key
   */
  remove: async (key: string): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from storage:`, error);
      return false;
    }
  },

  /**
   * Clear all storage
   */
  clear: async (): Promise<boolean> => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },
};

export default storage;
