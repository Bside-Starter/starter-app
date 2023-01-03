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
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {AsyncKeys} from './src/constants';
import {
  AuthTokenPayload,
  DeviceInfoPayload,
  WebViewMessageType,
} from './src/types';
import {parseWebMessage, sendMessage} from './src/utils';
import SplashScreen from 'react-native-splash-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const App = () => {
  const webviewRef = useRef<WebView>(null);

  const handleOnMessage = async (event: WebViewMessageEvent) => {
    const webData = event.nativeEvent.data;
    const {type} = JSON.parse(webData);
    switch (type) {
      case WebViewMessageType.WEB_LOADED:
        sendMessage<DeviceInfoPayload>(webviewRef, {
          type: WebViewMessageType.DEVICE_INFO,
          payload: {
            platform: Platform.OS,
            statusBarHeight: getStatusBarHeight(true),
          },
        });
        break;
      // 모든 웹 이니셜라이즈 동작이 끝난 후
      case WebViewMessageType.INITIALIZED:
        SplashScreen.hide();
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

  /*
  Next.js의 프리렌더링 때문에 onLoadEnd가 생각대로 동작하지 않아서
  WEB_LOADED 확인 후 이니셜라이즈 하는 방향으로 구현했습니다.
  좋은 대안이 있으면 부탁드려요!
  */
  // const handleEndLoading = async () => {
  //   const token = await AsyncStorage.getItem(AsyncKeys.AUTH_TOKEN);
  //   sendMessage<AuthTokenPayload>(webviewRef, {
  //     type: WebViewMessageType.AUTH_TOKEN,
  //     payload: {
  //       token,
  //     },
  //   });
  // };

  // StatusBar.setBarStyle('light-content');
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.container}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          javaScriptEnabled
          onMessage={handleOnMessage}
          // onLoadEnd={handleEndLoading}
          source={{
            uri:
              Platform.OS === 'ios'
                ? (Config.WEBVIEW_URL_IOS as unknown as string)
                : (Config.WEBVIEW_URL_ANDROID as unknown as string),
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default App;
