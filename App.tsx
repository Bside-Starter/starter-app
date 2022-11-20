/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {AsyncKeys} from './src/constants';
import {AuthTokenPayload, WebViewMessageType} from './src/types';
import {parseWebMessage, sendMessage} from './src/utils';

const App = () => {
  const webviewRef = useRef<WebView>(null);

  const handleOnMessage = async (event: WebViewMessageEvent) => {
    const webData = event.nativeEvent.data;
    const type = JSON.parse(webData);
    switch (type) {
      case WebViewMessageType.SESSION_CHECKED:
        // 스플래시 off
        break;
      case WebViewMessageType.SIGN_IN:
        const {payload} = parseWebMessage<AuthTokenPayload>(webData);
        const {token} = payload;
        if (token) {
          await AsyncStorage.setItem(AsyncKeys.AUTH_TOKEN, token);
        }
        break;
      default:
    }
  };

  const handleEndLoading = async () => {
    const token = await AsyncStorage.getItem(AsyncKeys.AUTH_TOKEN);
    sendMessage<AuthTokenPayload>(webviewRef, {
      type: WebViewMessageType.AUTH_TOKEN,
      payload: {
        token,
      },
    });
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <View style={styles.container}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          javaScriptEnabled
          onMessage={handleOnMessage}
          onLoadEnd={handleEndLoading}
          source={{
            uri:
              Platform.OS === 'ios'
                ? (Config.WEBVIEW_URL_IOS as unknown as string)
                : (Config.WEBVIEW_URL_ANDROID as unknown as string),
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default App;
