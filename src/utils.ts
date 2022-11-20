import {WebViewMessage} from './types';
import {WebView} from 'react-native-webview';
export const sendMessage = <T>(
  ref: React.RefObject<WebView<{}>>,
  message: WebViewMessage<T>,
) => {
  ref.current?.postMessage(JSON.stringify(message));
};

export const parseWebMessage = <T>(webData: string) => {
  return JSON.parse(webData) as WebViewMessage<T>;
};
