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
      ? '1063325496850-8mj9nh6evivng58h5ligg5qrqrq42rj2.apps.googleusercontent.com'
      : '1063325496850-u4s2aku0j2o2iio1cm25f1dj6cpc2546.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => App);
