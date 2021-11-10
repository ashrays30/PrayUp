import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, KeyboardAvoidingView, View, Text } from 'react-native';
import { TextInput, Button, TextBox } from 'react-native-paper';

const WallFeedsScreen = ({ route, navigation }) => {
  return (
    <View>
      <View style={StyledContainer}>
        <StatusBar style="dark" />
        <View style={InnerContainer}>
          <View style={{ width: '100%' }}>
            <TextInput
              left={<TextInput.Icon name="login" size={25} />}
              mode={'outlined'}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={TextBox}
            />
            <TextBox
              left={<TextInput.Icon name="lock" size={25} />}
              mode={'outlined'}
              secureTextEntry={true}
              value={pass}
              onChangeText={(text) => setPass(text)}
              style={TextBox}
            />
            <Button style={LoginButton} mode="contained" onPress={() => postFeeds()}>
              Post Feeds
            </Button>
            <View style={FeedCointainer}>
              {cointainer}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WallFeedsScreen;
