export enum WebViewMessageType {
  WEB_LOADED = 'WEB_LOADED',
  INITIALIZED = 'INITIALIZED',
  AUTH_TOKEN = 'AUTH_TOKEN',
  SESSION_CHECK = 'SESSION_CHECK',
  SIGN_IN = 'SIGN_IN',
}

export interface WebViewMessage<T> {
  type: WebViewMessageType;
  payload: T;
}

export interface AuthTokenPayload {
  token: string | null;
}
