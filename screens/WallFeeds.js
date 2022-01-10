import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, TouchableOpacity, View, ScrollView } from 'react-native';
import { Avatar, Card, Title, Text, Paragraph, Appbar, Button } from 'react-native-paper';
import Header from './Header';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();
const WallFeedsScreen = ({ navigation }) => {
  const postRef = collection(db, 'posts');

  const [posts] = useCollectionData(postRef);

  const trimContent = (str) => {
    if (!!!str) return '';
    if (str.length > 27) str = str.substring(0, 30) + ' ...';
    return str;
  };

  return (
    <View>
      <Header navigation={navigation} showBack={false} headingTitle={'Today'} feeds={true} />
      <ScrollView
        style={{ padding: 10, marginBottom: 90 }}
        key={'feedScrollView'}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {posts &&
          posts.map((feed, index) => {
            return (
              <TouchableOpacity>
                <Card>
                  <Card.Title
                    subtitle={feed.name}
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
                    <Title>{trimContent(feed.post)}</Title>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default WallFeedsScreen;
