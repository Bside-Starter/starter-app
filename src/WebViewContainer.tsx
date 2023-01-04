/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {AsyncKeys} from './constants';
import {
  AuthTokenPayload,
  DeviceInfoPayload,
  RoutePayload,
  WebViewMessageType,
} from './types';
import {parseWebMessage, sendMessage} from './utils';
import SplashScreen from 'react-native-splash-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import 'react-native-gesture-handler';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
// @ts-ignore
import TempBackground from './images/background_1.png';

const WebViewContainer = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'HOME'>) => {
  const webviewRef = useRef<WebView>(null);
  const path = route.params?.path;

  const [loading, setLoading] = useState(true);

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
        setTimeout(() => setLoading(false), 100);
        break;
      // 모든 웹 이니셜라이즈 동작이 끝난 후
      case WebViewMessageType.INITIALIZED:
        SplashScreen.hide();
        break;
      case WebViewMessageType.SIGN_IN:
        const {payload: authTokenPayload} =
          parseWebMessage<AuthTokenPayload>(webData);
        const {token} = authTokenPayload;
        if (token) {
          await AsyncStorage.setItem(AsyncKeys.AUTH_TOKEN, token);
        }
        break;
      case WebViewMessageType.PUSH_NAVIGATION:
        const pushPath = parseWebMessage<RoutePayload>(webData).payload.url;
        navigation.push('HOME', {path: pushPath});
        break;
      case WebViewMessageType.REPLACE_NAVIGATION:
        const replacePath = parseWebMessage<RoutePayload>(webData).payload.url;
        navigation.replace('HOME', {path: replacePath});
        break;
      case WebViewMessageType.REPLACE_NAVIGATION:
        navigation.goBack();
        break;
      default:
        break;
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
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webView}
        originWhitelist={['*']}
        javaScriptEnabled
        onMessage={handleOnMessage}
        source={{
          uri:
            Platform.OS === 'ios'
              ? path
                ? `${Config.WEBVIEW_URL_IOS}${path}`
                : (Config.WEBVIEW_URL_IOS as unknown as string)
              : (Config.WEBVIEW_URL_ANDROID as unknown as string),
        }}
      />
      {loading && (
        <Image
          source={TempBackground}
          resizeMode={'cover'}
          style={styles.loadingBackground}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  webView: {
    backgroundColor: '#080D20',
  },
  loadingBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default WebViewContainer;
