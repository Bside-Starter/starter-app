import React, {useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import Config from 'react-native-config';

const Main = () => {
  const mainWebviewRef = useRef<WebView>(null);
  return (
    <View style={styles.container}>
      <WebView
        ref={mainWebviewRef}
        originWhitelist={['*']}
        source={{
          uri:
            Platform.OS === 'ios'
              ? (Config.WEBVIEW_URL_IOS as unknown as string)
              : (Config.WEBVIEW_URL_ANDROID as unknown as string),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default Main;
