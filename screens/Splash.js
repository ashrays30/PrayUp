import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, Image, View, Dimensions } from 'react-native';
// import Video from 'react-native-video';
import { Video, AVPlaybackStatus } from 'expo-av';

const height = Dimensions.get('window').height;
const Splash = () => {
  return (
    <View style={{ flex: 1,backgroundColor:'#f0f4f7'  }}>
      {/* <Image
        style={{ width: '100%', height: height / 2, marginVertical: height / 4 }}
        source={require('./../assets/img/app_logo.png')}
        resizeMode="contain"
        resizeMethod="resize"
      /> */}
      {/* <Video source={require('../assets/Prayup-Opening-Animation.mp4')}
              style={{position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: 0.3}}
                      muted={true}
                      repeat={true}
                      resizeMode="cover"   /> */}
                      <Video
                //source={{ uri: '../assets/Prayup-Opening-Animation.mp4' }}
                source={require('./../assets/Prayup-Opening-Animation.mp4')}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{position: 'absolute',
                      top: 0,
                      left: '3%',
                      right: 0,
                      bottom: 0,
                      width:'100%',
                      }}
                />
    </View>
  );
};

export default Splash;
