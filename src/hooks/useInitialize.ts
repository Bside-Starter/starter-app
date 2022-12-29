import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

export function useInitialize() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);
}
