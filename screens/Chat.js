import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, KeyboardAvoidingView, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
      t.setSeconds(createdAt.seconds)
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

  const chat = <GiftedChat messages={parse(messages)} onSend={sendMessage} user={getUser()} />;

  if (Platform.OS === 'android') {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behaviour="padding" keyboardVerticalOffset={30} enabled>
        {chat}
      </KeyboardAvoidingView>
    );
  }

  return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>;
};

export default ChatScreen;
