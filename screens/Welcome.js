import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button } from 'react-native-paper';

import { Image, Text, View } from 'react-native';

import {
  StyledContainer,
  InnerContainer,
  WelcomePageImage,
  WelcomeButton,
  WelcomeHeading,
  WelcomeDots,
} from './../components/styles';

const Welcome = ({ navigation }) => {

    const [counter, setCounter] = React.useState(0);
    const headingList = ['Track Your Activity', 'Plan To Meditate', 'Daily Insights']
    const textList = [
        `Our/This app will help you track your goals and how they align to your path and the daily actions you will take to get there`,

        `We believe that prayer changes everything. Get help with how to pray from experts around world with live coaching and guided sessions.`,

        `Life should not be boring. Connect with our worldwide praying community and find out how prayer is transforming lives, families and nations!`
    ]

    const dotStyle = {color: "black"}

    const imageList = [
        require("./../assets/img/Meditation_Icon_1.png"),
        require("./../assets/img/Meditation_Icon_2.png"),
        require("./../assets/img/Meditation_Icon_3.png")
    ]

    const setCounterValue = () => {
        if(counter < 2) { 
            setCounter(counter + 1) 
        } else { 
            navigation.navigate("Login")
            setCounter(1)
        }
    }

    

  return (
    <View style={StyledContainer}>
      <StatusBar style="dark" />
      <View style={InnerContainer}>
        <Image
          style={WelcomePageImage}
          resizeMode="contain"
          source={imageList[counter]}
        />
        <Text style={WelcomeHeading}>{headingList[counter]}</Text>
        <Text>
            {textList[counter]}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={{...WelcomeDots, ...(counter === 0 && dotStyle)}}>.</Text>
          <Text style={{...WelcomeDots, ...(counter === 1 && dotStyle)}}>.</Text>
          <Text style={{...WelcomeDots, ...(counter === 2 && dotStyle)}}>.</Text>
        </View>
        <Button style={WelcomeButton} mode="contained" onPress={() => setCounterValue()}>
          {counter < 2 ? "Continue" : "Get Started"}
        </Button>
      </View>
    </View>
  );
};

export default Welcome;
