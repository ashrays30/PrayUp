import React from 'react';
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

  return (
    <View style={[StyledContainer,{paddingLeft:25,paddingRight:25,backgroundColor:'#ffffff',flex:1,paddingTop:90,}]}>
      <StatusBar style="dark" />
      <View style={InnerContainer}>
        <Image style={PageLogo} resizeMode="cover" source={require('./../assets/img/app_logo.png')} />
        <Text style={PageSubTitle}>Login Into Your Pray Up Account</Text>
        <View style={{ width: '100%' }}>
          <TextInput
            left={<TextInput.Icon name="login" size={25} />}
            mode={'outlined'}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[TextBox,{borderColor:'#fcfcfc',borderWidth:0.5}]}
          />
          <TextInput
            left={<TextInput.Icon name="lock" size={25} />}
            mode={'outlined'}
            label="Password"
            secureTextEntry={true}
            value={pass}
            onChangeText={(text) => setPass(text)}
            style={TextBox}
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
          <Button
            icon="google"
            mode="outlined"
            style={{marginTop: 10}}
            onPress={() => {}}
          >Sign In With Google</Button>
          <Text style={errorCode}>{error}</Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
