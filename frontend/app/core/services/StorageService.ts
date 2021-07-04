import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

export interface StorageModel {
  name: string;
  type: StorageType;
}

export enum StorageType {
  Secure,
  Unsecure,
}

/**
 * List of used storage points.
 */
const Points: { [name: string]: StorageModel } = {
  LANGUAGE: {
    name: 'language',
    type: StorageType.Unsecure,
  },
  TOKEN: {
    name: 'token',
    type: StorageType.Secure,
  },
  REFRESHTOKEN: {
    name: 'refreshtoken',
    type: StorageType.Secure,
  },
  PIN: {
    name: 'pin',
    type: StorageType.Secure,
  },
  AFTERINTRO: {
    name: 'afterintro',
    type: StorageType.Unsecure,
  },
  ROLES: {
    name: 'roles',
    type: StorageType.Unsecure,
  }
};

/**
 * Sets the value of storage point.
 *
 * @param point - Storage point from list of used points.
 * @param value - String to save in storage.
 *
 */
let set = async (point: StorageModel, value: string): Promise<void> => {
  try {
    if (point.type === StorageType.Secure) {
      await RNSecureStorage.set(point.name, value, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } else {
      await AsyncStorage.setItem(point.name, value);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the value of storage point.
 *
 * @param point - Storage point from list of used points.
 * @returns The value of storage point.
 *
 */
let get = async (point: StorageModel): Promise<string> => {
  let value: string;
  try {
    if (point.type === StorageType.Secure) {
      value = (await RNSecureStorage.get(point.name)) || '';
    } else {
      value = (await AsyncStorage.getItem(point.name)) || '';
    }
    return value;
  } catch (error) {
    return '';
  }
};

/**
 * Removes the value of storage point.
 *
 * @param point - Storage point from list of used points.
 *
 */
let remove = (point: StorageModel): void => {
  try {
    if (point.type === StorageType.Secure) {
      RNSecureStorage.remove(point.name);
    } else {
      AsyncStorage.removeItem(point.name);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Removes all points from list of storage points.
 */
let removeAll = (): void => {
  Object.keys(Points).forEach((point: string) => {
    remove(Points[point]);
  });
};

export default {
  Points,
  set,
  get,
  remove,
  removeAll,
};
