import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, KeyboardAvoidingView, View, Text } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Header from './Header';

const auth = getAuth();
const db = getFirestore();

const ChatScreen = ({ route, navigation }) => {
  const [currentUser] = useAuthState(auth);

  const messagesRef = collection(db, 'messages');

  const [messages] = useCollectionData(messagesRef, { uid: auth.currentUser.uid });

  console.log(messages);

  const parse = (messages) => {
    if (messages === undefined) {
      return [];
    }

    let msg = [];
    messages.forEach((val) => {
      const { _id, user, text, createdAt, image } = val;
      let t = new Date(1970, 0, 1);
      t.setSeconds(createdAt.seconds);
      msg.push({
        _id,
        createdAt: t,
        text,
        user,
        image,
      });
    });

    return msg;
  };

  const getUser = () => {
    const { uid, photoURL } = auth.currentUser;
    return {
      _id: uid,
      name: currentUser.displayName,
      avatar: photoURL,
    };
  };

  const sendMessage = async (message) => {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...message[0],
    });
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  const chat = (
    <GiftedChat
      messages={parse(messages)}
      onSend={sendMessage}
      user={getUser()}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );

  if (Platform.OS === 'android') {
    return (
      <View>
        <Header navigation={navigation} goBack={true} />
        <KeyboardAvoidingView style={{ flex: 1 }} behaviour="padding" keyboardVerticalOffset={30} enabled>
          {chat}
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} showBack={true} headingTitle={'Chat'} />
      {chat}
    </SafeAreaView>
  );
};

export default ChatScreen;
