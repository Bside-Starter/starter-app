import React, {useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

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
              ? 'http://localhost:3000'
              : 'http://10.0.2.2:3000',
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
