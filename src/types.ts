import {Platform} from 'react-native';

export enum WebViewMessageType {
  WEB_LOADED = 'WEB_LOADED',
  INITIALIZED = 'INITIALIZED',
  AUTH_TOKEN = 'AUTH_TOKEN',
  SESSION_CHECK = 'SESSION_CHECK',
  SIGN_IN = 'SIGN_IN',
  DEVICE_INFO = 'DEVICE_INFO',
  PUSH_NAVIGATION = 'PUSH_NAVIGATION',
  REPLACE_NAVIGATION = 'REPLACE_NAVIGATION',
  POP_NAVIGATION = 'POP_NAVIGATION',
}

export interface WebViewMessage<T> {
  type: WebViewMessageType;
  payload: T;
}

export interface AuthTokenPayload {
  token: string | null;
}
export interface DeviceInfoPayload {
  platform: typeof Platform.OS;
  statusBarHeight: number;
}

export interface RoutePayload {
  url: string;
}
