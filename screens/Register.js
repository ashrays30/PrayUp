import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, addDoc, collection, setDoc,doc } from '@firebase/firestore';
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
import GlobalStyle from '../components/GlobalStyles.js';

import { Image, Text, View } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');

  const registerUser = () => {
    const auth = getAuth();
    const db = getFirestore();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, { displayName: name, phoneNumber: phone }).then(async () => {
          const userRef = doc(db, 'userdata', user.uid);
          await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: email,
            phone: phone,
            imageUrl: '',
            registerTime: new Date(),
            type: 'user',
          });
          navigation.navigate('Login');
          console.log(user);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
      });
  };

  return (
    <View style={[StyledContainer,{backgroundColor:'#ffffff'}]}>
      <StatusBar style="dark" />
      <View style={InnerContainer}>
      <Image style={[PageLogo,{width:130,resizeMode:'contain'}]} resizeMode="cover" source={require('./../assets/img/app_logo.png')} />
        <Text style={PageSubTitle}>Login Into Your Pray Up Account</Text>
        <View style={{ width: '100%' }}>
          <TextInput
            left={<TextInput.Icon name="account" size={25} />}
            mode={'outlined'}
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            //style={TextBox}
            style={[GlobalStyle.input,{marginLeft:18,marginRight:18,}]}
            inputStyle={GlobalStyle.inputStyle}
            labelStyle={GlobalStyle.labelStyle}
            placeholderStyle={GlobalStyle.placeholderStyle}
          />
          <TextInput
            left={<TextInput.Icon name="email" size={25} />}
            mode={'outlined'}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            //style={TextBox}
            style={[GlobalStyle.input,{marginLeft:18,marginRight:18,}]}
            inputStyle={GlobalStyle.inputStyle}
            labelStyle={GlobalStyle.labelStyle}
            placeholderStyle={GlobalStyle.placeholderStyle}
          />
          <TextInput
            left={<TextInput.Icon name="lock" size={25} />}
            mode={'outlined'}
            label="Password"
            secureTextEntry={true}
            value={pass}
            onChangeText={(text) => setPass(text)}
            //style={TextBox}
            style={[GlobalStyle.input,{marginLeft:18,marginRight:18,}]}
            inputStyle={GlobalStyle.inputStyle}
            labelStyle={GlobalStyle.labelStyle}
            placeholderStyle={GlobalStyle.placeholderStyle}
          />
          <TextInput
            left={<TextInput.Icon name="key" size={25} />}
            mode={'outlined'}
            label="Retype Password"
            secureTextEntry={true}
            value={pass}
            onChangeText={(text) => setPass(text)}
            //style={TextBox}
            style={[GlobalStyle.input,{marginLeft:18,marginRight:18,}]}
            inputStyle={GlobalStyle.inputStyle}
            labelStyle={GlobalStyle.labelStyle}
            placeholderStyle={GlobalStyle.placeholderStyle}
          />
          <TextInput
            left={<TextInput.Icon name="phone" size={25} />}
            mode={'outlined'}
            label="Phone Number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            //style={TextBox}
            style={[GlobalStyle.input,{marginLeft:18,marginRight:18,}]}
            inputStyle={GlobalStyle.inputStyle}
            labelStyle={GlobalStyle.labelStyle}
            placeholderStyle={GlobalStyle.placeholderStyle}
          />
          <Button style={RegisterButton} mode="outlined" onPress={() => registerUser()}>
            Create Account
          </Button>
          <Text style={errorCode}>{error}</Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
