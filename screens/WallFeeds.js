import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Title, Text, Paragraph, Appbar, Button } from 'react-native-paper';
import Header from './Header';
import { LoginButton } from './../components/styles';

const WallFeedsScreen = ({ navigation }) => {
  const feeds = [
    {
      author: 'Ashray Shah',
      cover: 'https://picsum.photos/700',
      title: 'Gola Becho',
      desc: 'yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda',
    },
    {
      author: 'Shubham Shah',
      cover: 'https://picsum.photos/600',
      title: 'Tela Becho',
      desc: 'yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda',
    },
    {
      author: 'Vivan',
      cover: 'https://picsum.photos/500',
      title: 'Node Becho',
      desc: 'yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda',
    },
  ];

  const trimContent = (str) => {
    if (str.length > 27) str = str.substring(0, 30) + ' ...';
    return str;
  };

  return (
    <View>
      <Header navigation={navigation} showBack={false} headingTitle={'Wall Feeds'} />
      {feeds.map((feed, index) => {
        return (
          <View style={{ padding: 10 }} key={index}>
            <TouchableOpacity>
              <Card>
                <Card.Title
                  subtitle={feed.author}
                  left={() => (
                    <Avatar.Text
                      size={35}
                      label={feed.author
                        .match(/(\b\S)?/g)
                        .join('')
                        .match(/(^\S|\S$)?/g)
                        .join('')
                        .toUpperCase()}
                    />
                  )}
                />
                <Card.Cover source={{ uri: feed.cover }} />
                <Card.Content>
                  <Title>{feed.title}</Title>
                  <Paragraph>{trimContent(feed.desc)}</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default WallFeedsScreen;
