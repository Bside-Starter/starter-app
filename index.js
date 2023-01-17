/**
 * @format
 */

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

GoogleSignin.configure({
  webClientId:
    Platform.OS === 'android'
      ? '1063325496850-d1uvvdialbkt8ll82mj1qei4mvoqjui5.apps.googleusercontent.com'
      : '1063325496850-u4s2aku0j2o2iio1cm25f1dj6cpc2546.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => App);
