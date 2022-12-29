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
import {useInitialize} from './src/hooks/useInitialize';

const App = () => {
  useInitialize();

  const webviewRef = useRef<WebView>(null);

  const handleOnMessage = async (event: WebViewMessageEvent) => {
    const webData = event.nativeEvent.data;
    const {type} = JSON.parse(webData);
    switch (type) {
      // 웹뷰 준비 완료 후 이니셜라이즈 동작 시작
      case WebViewMessageType.WEB_LOADED:
        // 디바이스에 저장된 토큰을 통한 세션 체크
        const storedToken = await AsyncStorage.getItem(AsyncKeys.AUTH_TOKEN);
        sendMessage<AuthTokenPayload>(webviewRef, {
          type: WebViewMessageType.SESSION_CHECK,
          payload: {
            token: storedToken,
          },
        });
        break;
      // 모든 웹 이니셜라이즈 동작이 끝난 후
      case WebViewMessageType.INITIALIZED:
        // TODO: 스플래시 스크린 off
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
  // AsyncStorage.clear();
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
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
