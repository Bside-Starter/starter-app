export enum WebViewMessageType {
  AUTH_TOKEN = 'AUTH_TOKEN',
  SESSION_CHECKED = 'SESSION_CHECKED',
  SIGN_IN = 'SIGN_IN',
}

export interface WebViewMessage<T> {
  type: WebViewMessageType;
  payload: T;
}

export interface AuthTokenPayload {
  token: string | null;
}
