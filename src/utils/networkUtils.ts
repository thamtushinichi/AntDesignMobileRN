/**
 * Network utilities for handling connectivity
 *
 * Note: To use this utility, install the @react-native-community/netinfo package:
 * pnpm add @react-native-community/netinfo
 */

import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';

export type NetworkType = 'wifi' | 'cellular' | 'unknown' | 'none';

/**
 * Get current network connection info
 * @returns Promise with network state
 */
const getConnectionInfo = async (): Promise<NetInfoState> => {
  return await NetInfo.fetch();
};

/**
 * Check if device is connected to the internet
 * @returns Promise with boolean indicating if connected
 */
const isConnected = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return !!state.isConnected;
};

/**
 * Get current network type (wifi, cellular, etc.)
 * @returns Promise with network type string
 */
const getNetworkType = async (): Promise<NetworkType> => {
  const state = await NetInfo.fetch();

  if (!state.isConnected) {
    return 'none';
  }

  switch (state.type) {
    case 'wifi':
      return 'wifi';
    case 'cellular':
      return 'cellular';
    default:
      return 'unknown';
  }
};

/**
 * Add a listener for network connectivity changes
 * @param callback Function to call when connectivity changes
 * @returns Unsubscribe function
 */
const addConnectionListener = (
  callback: (state: NetInfoState) => void
): NetInfoSubscription => {
  return NetInfo.addEventListener(callback);
};

const networkUtils = {
  getConnectionInfo,
  isConnected,
  getNetworkType,
  addConnectionListener,
};

export default networkUtils;
