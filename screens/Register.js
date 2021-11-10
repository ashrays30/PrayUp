import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button } from 'react-native-paper';

import {
  Colors,
  StyledContainer,
  InnerContainer,
  PageLogo,
  LoginButton,
  PageSubTitle,
  RegisterButton,
  TextBox,
  ForgotButton
} from './../components/styles';

import { Image, Text, View } from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('');
  return (
    <View style={StyledContainer}>
      <StatusBar style="dark" />
      <View style={InnerContainer}>
        <Image style={PageLogo} resizeMode="cover" source={require('./../assets/img/app_logo.jpg')} />
        <Text style={PageSubTitle}>Login Into Your Pray Up Account</Text>
        <View style={{ width: '100%' }}>
        <TextInput
            left={<TextInput.Icon name="account" size={25} />}
            mode={'outlined'}
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={TextBox}
          />
          <TextInput
            left={<TextInput.Icon name="email" size={25} />}
            mode={'outlined'}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={TextBox}
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
          <TextInput
            left={<TextInput.Icon name="key" size={25} />}
            mode={'outlined'}
            label="Retype Password"
            secureTextEntry={true}
            value={pass}
            onChangeText={(text) => setPass(text)}
            style={TextBox}
          />
          <TextInput
            left={<TextInput.Icon name="phone" size={25} />}
            mode={'outlined'}
            label="Phone Number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            style={TextBox}
          />
          <Button style={RegisterButton} mode="outlined" onPress={() => navigation.navigate('Login')}>
            Create Account
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Login;
