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
    if (!str) return '';
    if (str.length > 27) str = str.substring(0, 30) + ' ...';
    return str;
  };

  /**
   * Check if th
   * @param {string} URL
   * @returns
   */
  const checkValidURL = (URL) => {
    if (URL?.length > 0 && URL?.includes('https')) {
      return true;
    }
    return false;
  };

  return (
    <View>
      <Header navigation={navigation} showBack={false} headingTitle={'Today'} feeds={false} />
      <ScrollView style={{ marginBottom: 92 }}>
        {posts &&
          posts.map((feed, index) => {
            return (
              <View style={{ padding: 10 }} key={index} contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableOpacity>
                  <Card>
                    <Card.Title
                      subtitle={feed?.name ?? ''}
                      left={() => (
                        <Avatar.Text
                          size={35}
                          label={
                            feed?.name
                              ?.match(/(\b\S)?/g)
                              ?.join('')
                              ?.match(/(^\S|\S$)?/g)
                              ?.join('')
                              ?.toUpperCase() ?? ''
                          }
                        />
                      )}
                    />
                    {checkValidURL(feed?.postImg ?? '') && <Card.Cover source={{ uri: feed.postImg }} />}
                    <Card.Content>
                      <Title>
                        <Text>{trimContent(feed?.post ?? '')}</Text>
                      </Title>
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
