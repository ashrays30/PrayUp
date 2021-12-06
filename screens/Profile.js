import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, List, Text } from 'react-native-paper';
import Header from './Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const ProfileScreen = ({ navigation }) => {
  const [currentUser] = useAuthState(auth);
  return (
    <View>
      <Header navigation={navigation} showBack={false} headingTitle={'Profile'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30%',
        }}
      >
        <Avatar.Text
          size={100}
          label={currentUser.displayName
            .match(/(\b\S)?/g)
            .join('')
            .match(/(^\S|\S$)?/g)
            .join('')
            .toUpperCase()}
        />
      </View>
      <List.Section>
        <List.Subheader>Profile</List.Subheader>
        <List.Item title={currentUser.displayName} left={() => <List.Icon icon="account" />}></List.Item>
        <List.Item title={currentUser.email} left={() => <List.Icon icon="email" />} />
        <List.Item title={Math.floor(1000000000 + Math.random() * 900000000)} left={() => <List.Icon icon="phone" />} />
        <List.Item title={
            currentUser.displayName === 'volunteer' && "Volunteer" ||
            currentUser.displayName === 'admin' && "Admin" || 
            "User"} left={() => <List.Icon icon="target-account" />} />
      </List.Section>
    </View>
  );
};

export default ProfileScreen;
