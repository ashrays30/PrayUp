import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  Colors,
  StyledContainer,
  InnerContainer,
  PageLogo,
  LoginButton,
  PageSubTitle,
  RegisterButton,
  TextBox,
  ForgotButton,
  errorCode,
} from './../components/styles';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

import { Image, Text, View } from 'react-native';
import GlobalStyle from '../components/GlobalStyles.js';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

//import * as GoogleSignIn from 'expo-google-sign-in';
//import * as AppAuth from 'expo-app-auth';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';


//GoogleSignin.configure();

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
//   webClientId: '913732199623-fdafimc3c4b1q93d7hi5t961srs79esh.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   hostedDomain: '', // specifies a hosted domain restriction
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   accountName: '', // [Android] specifies an account name on the device that should be used
//   iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//   openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//   profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });

//const { URLSchemes } = AppAuth;

const app = initializeApp({
  apiKey: 'AIzaSyCbAu78CKZIFUqVhGurZxXfs0tYjv7M080',
  authDomain: 'prayup-9fe0f.firebaseapp.com',
  projectId: 'prayup-9fe0f',
  storageBucket: 'prayup-9fe0f.appspot.com',
  messagingSenderId: '175364976092',
  appId: '1:175364976092:web:65a5faa819c0e1d06db319',
  measurementId: 'G-7GP68PV1XK',
});

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [error, setError] = React.useState('');
  const db = getFirestore();

  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        const userQuery = query(collection(db, 'userdata'), where('uid', '==', userCredential.user.uid));
        const userData = await getDocs(userQuery);
        userData.forEach((doc) => {
          const user = doc.data();
          AsyncStorage.setItem('UserSession', JSON.stringify(user));
        });
        navigation.navigate('Landing');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        console.log(error.code, error.message);
      });
  };

  // const GOOGLEsignIn1 = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     this.setState({ userInfo });
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };
// try {
//       await GoogleSignIn.askForPlayServicesAsync();
//       const { type, user } = await GoogleSignIn.signInAsync();
//       if (type === 'success') {
//         this._syncUserWithStateAsync();
//       }
//     } catch ({ message }) {
//       alert('login: Error:' + message);
//     }
  // const  _signIn = async () => {

  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const {accessToken, idToken} = await GoogleSignin.signIn();
  //     setloggedIn(true);
  //     console.log("check",statusCodes.SIGN_IN_CANCELLED)
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       alert('Cancel');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       alert('Signin in progress');
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        
  //       alert('PLAY_SERVICES_NOT_AVAILABLE');
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };
  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     setloggedIn(false);
  //     setuserInfo([]);
  //   } catch (error) {
  //     console.error(error);                 
  //   }
  // };
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
  //     webClientId:
  //       '913732199623-fdafimc3c4b1q93d7hi5t961srs79esh.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //   });
  // }, []);

  return (
    <View style={[StyledContainer,{paddingLeft:25,paddingRight:25,backgroundColor:'#ffffff',flex:1,}]}>
      <StatusBar style="dark" />
      <View style={InnerContainer}>
        <Image style={[PageLogo,{width:130,resizeMode:'contain'}]} resizeMode="cover" source={require('./../assets/img/app_logo.png')} />
        <Text style={PageSubTitle}>Login Into Your Pray Up Account</Text>
        <View style={{ width: '100%' }}>
          <TextInput
            left={<TextInput.Icon name="login" size={25} />}
            mode={'outlined'}
            label="Email"
            value={email}
            style={GlobalStyle.input}
            inputStyle={GlobalStyle.inputStyle}
            labelStyle={GlobalStyle.labelStyle}
            placeholderStyle={GlobalStyle.placeholderStyle}
            onChangeText={(text) => setEmail(text)}
            //style={[TextBox,{borderColor:'#fcfcfc',borderWidth:0.5}]}
          />
          <TextInput
            left={<TextInput.Icon name="lock" size={25} />}
            mode={'outlined'}
            label="Password"
            secureTextEntry={true}
            value={pass}
            style={GlobalStyle.input}
            inputStyle={GlobalStyle.inputStyle}
            labelStyle={GlobalStyle.labelStyle}
            placeholderStyle={GlobalStyle.placeholderStyle}
            onChangeText={(text) => setPass(text)}
           // style={TextBox}
          />
          <Button mode="text" onPress={() => console.log('Pressed')}>
            <Text style={ForgotButton}>Forgot Passoword ?</Text>
          </Button>
          <Button style={LoginButton} mode="contained" onPress={() => signIn()}>
            Log In with Pray Up
          </Button>
          <Button style={RegisterButton} mode="outlined" onPress={() => navigation.navigate('Register')}>
            Create Account
          </Button>
          {/* <Button
            icon="google"
            mode="outlined"
            style={{marginTop: 10}}
            //onPress={() => GOOGLEsignIn1()}
          >Sign In With Google</Button> */}
          <View>
          {/* <Button title={'Sign in with Google'} onPress={() =>  {
    GoogleSignin.configure({
        androidClientId: '913732199623-rc0vc4q504jetaulfhgo9tnnfeqdfa3q.apps.googleusercontent.com',
        iosClientId: '913732199623-mlrk93r6mke2elf35dg278i6k183qfsc.apps.googleusercontent.com',
    });
GoogleSignin.hasPlayServices().then((hasPlayService) => {
        if (hasPlayService) {
             GoogleSignin.signIn().then((userInfo) => {
                       console.log(JSON.stringify(userInfo))
             }).catch((e) => {
             console.log("ERROR IS: " + JSON.stringify(e));
             })
        }
}).catch((e) => {
    console.log("ERROR IS: " + JSON.stringify(e));
})
}} /> */}
            {/* <View >
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                //onPress={this._signIn}
                onPress={() => _signIn()}
              />
            </View> */}
          </View>
          <Text style={errorCode}>{error}</Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
