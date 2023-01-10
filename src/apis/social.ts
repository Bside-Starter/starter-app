import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {login, getProfile} from '@react-native-seoul/kakao-login';

export type SocialType = 'kakao' | 'google' | 'apple';

export interface ISocialReturnProps {
  refreshToken?: string;
  accessToken: string;
  pId: string;
  provider: SocialType;
  email: string | null;
}

export const googleSignIn = async (): Promise<
  ISocialReturnProps | undefined
> => {
  const googleAuthResult = await GoogleSignin.signIn();
  console.log('googleAuthResult: ', JSON.stringify(googleAuthResult));

  if (googleAuthResult) {
    const googleCredential = auth.GoogleAuthProvider.credential(
      googleAuthResult.idToken,
    );
    console.log('googleCredential: ', googleCredential);
    const googleResult = await auth().signInWithCredential(googleCredential);
    console.log('googleResult: ', JSON.stringify(googleResult));

    let resToken = '';
    await auth()
      .currentUser?.getIdToken(true)
      .then(idToken => {
        resToken = idToken;
      })
      .catch(error => {
        console.log(error);
      });

    if (googleResult) {
      return {
        provider: 'google',
        accessToken: resToken,
        email: googleResult.user.email,
        pId: googleResult.user.uid,
      };
    }
  }
};

export const kakaoSignIn = async (): Promise<
  ISocialReturnProps | undefined
> => {
  const kakaoOAuthToken = await login();

  if (kakaoOAuthToken) {
    const {accessToken, refreshToken} = kakaoOAuthToken;
    const profile = await getProfile();
    const pId = profile.id;
    const email = profile.email;
    return {
      provider: 'kakao',
      refreshToken,
      accessToken,
      email,
      pId,
    };
  }
};
