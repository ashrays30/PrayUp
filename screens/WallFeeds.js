import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, TouchableOpacity, View, ScrollView } from 'react-native';
import { Avatar, Card, Title, Text, Paragraph, Appbar, Button } from 'react-native-paper';
import Header from './Header';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import GlobalStyle from '../components/GlobalStyles.js';

const db = getFirestore();
const WallFeedsScreen = ({ navigation }) => {
  const postRef = collection(db, 'posts');

  const [posts] = useCollectionData(postRef);

  const trimContent = (str) => {
    if (!str) return '';
    if (str.length > 27) str = str.substring(0, 30) + ' ...';
    return str;
  };

  return (
    <View style={GlobalStyle.bg_purple}>
      <Header navigation={navigation} showBack={false} headingTitle={'Today'} feeds={false}/>
      <ScrollView style={{ marginBottom:92}}>
        {posts &&
          posts.map((feed, index) => {
            return (
              <View style={{ padding: 10 }} key={index} contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableOpacity>
                  <Card style={{borderRadius:18,backgroundColor:'#784179'}}>
                    <Card.Title
                      subtitle={feed.name}
                      subtitleStyle={GlobalStyle.cardsubtitlewallfeed}
                      left={() => (
                        <Avatar.Text
                          size={35}
                          label={feed.name
                            .match(/(\b\S)?/g)
                            .join('')
                            .match(/(^\S|\S$)?/g)
                            .join('')
                            .toUpperCase()}
                        />
                      )}
                    />
                    {feed.postImg && <Card.Cover source={{ uri: feed.postImg }} />}
                    <Card.Content>
                      <Title style={{fontFamily: 'Nunito',}}>{trimContent(feed.post)}</Title>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default WallFeedsScreen;
