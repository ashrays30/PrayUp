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
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum`,

        `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam 
        rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt`,

        `Quiere la boca exhausta vid, kiwi, piña y fugaz jamón. Fabio me exige, sin tapujos, que añada cerveza al whisky.
         Jovencillo emponzoñado de whisky, ¡qué figurota exhibes! La cigüeña tocaba cada vez mejor el`
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
