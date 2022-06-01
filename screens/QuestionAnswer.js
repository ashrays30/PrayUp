import React, { useEffect, useState } from 'react';
import { View,Text,ScrollView,TextInput,TouchableOpacity,Alert } from 'react-native';
import { Avatar, List, Button } from 'react-native-paper';
import Header from './Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { RegisterButton } from './../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyle from '../components/GlobalStyles.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const db = getFirestore();
const auth = getAuth();
const QuestionAnswerScreen = ({ navigation }) => {
 
   const postRef = collection(db, 'questionAnswer/Prayer for Health/questions');

  const [posts] = useCollectionData(postRef);

  console.log("questions", posts);

  const [currentUser] = useAuthState(auth);
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };
  const [data,setdata]=useState();
  const SubmitbtnHandler=()=>{
    Alert.alert("hello",data);
  }
  return (
    <View>
      <Header navigation={navigation} showBack={false} headingTitle={'Question & Answer'} />
      <ScrollView>
        {posts &&
          posts.map((feed, index) => {
            return (
              <View style={{ padding: 10 }} key={index} contentContainerStyle={{ flexGrow: 1 }}>
                    <Text>{feed.text}</Text>
                    <TextInput 
                        value={data}
                        style={{borderColor:'black',borderWidth:1,paddingLeft:12,}}
                        onChangeText={data=>{setdata(data)}}
                    />
              </View>
            );
          })}
      </ScrollView>
      <View
        style={{
          paddingLeft:20,
        }}>
        <TouchableOpacity style={{backgroundColor:'#e7327c',width:100,padding:12,borderRadius:50,}} onPress={() => navigation.navigate('Chat')}>
            <Text style={{color:'#ffffff',textAlign:'center'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionAnswerScreen;
