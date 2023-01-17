import {Platform} from 'react-native';
import {SocialType} from './apis/social';

export enum WebViewMessageType {
  WEB_LOADED = 'WEB_LOADED',
  INITIALIZED = 'INITIALIZED',
  AUTH_TOKEN = 'AUTH_TOKEN',
  SESSION_CHECK = 'SESSION_CHECK',
  SOCIAL_SIGN_IN = 'SOCIAL_SIGN_IN',
  SOCIAL_SIGN_IN_RESULT = 'SOCIAL_SIGN_IN_RESULT',
  DEVICE_INFO = 'DEVICE_INFO',
  PUSH_NAVIGATION = 'PUSH_NAVIGATION',
  REPLACE_NAVIGATION = 'REPLACE_NAVIGATION',
  POP_NAVIGATION = 'POP_NAVIGATION',
  CLEAR_NAVIGATION = 'CLEAR_NAVIGATION',
  GO_BACK = 'GO_BACK',
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

export interface SocialSignInPayload {
  provider: SocialType;
}

export interface SocialSignInResultPayload {
  provider: SocialType;
  accessToken: string;
  pId: string;
}
