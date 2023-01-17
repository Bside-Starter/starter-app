/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import WebViewContainer from './src/WebViewContainer';
import {setRootViewBackgroundColor} from '@pnthach95/react-native-root-view-background';

export type RootStackParamList = {
  HOME: {path: string; disableAnimation?: boolean};
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    setRootViewBackgroundColor('#000');
  }, []);
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HOME"
          screenOptions={({route}) => ({
            ...TransitionPresets.SlideFromRightIOS,
            cardStyleInterpolator: !route.params?.disableAnimation
              ? undefined
              : CardStyleInterpolators.forNoAnimation,
            headerShown: false,
          })}>
          <Stack.Screen name="HOME" component={WebViewContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
