import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, Image, View, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const Splash = () => {
  return (
    <View style={{ flex: 1,  }}>
      <Image
        style={{ width: '100%', height: height / 2, marginVertical: height / 4 }}
        source={require('./../assets/img/app_logo.png')}
        resizeMode="contain"
        resizeMethod="resize"
      />
    </View>
  );
};

export default Splash;
