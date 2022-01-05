import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, View, StyleSheet, useWindowDimensions } from 'react-native';
import { FAB, Card, Avatar } from 'react-native-paper';
import Header from './Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot, where } from '@firebase/firestore';
import { TabView, SceneMap } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth();
const db = getFirestore();

const Consultanat = ({ navigation }) => {
  const [currentUser] = useAuthState(auth);
  const [rooms, setRooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes, setRoute] = useState([]);
  const layout = useWindowDimensions();

  const FirstRoute = () => (
    <View style={{ marginTop: 10 }}>
      {rooms
        .filter((r) => !r.type)
        .map((room, index) => {
          return (
            <View style={{ padding: 10 }} key={index}>
              <Card
                onPress={() => {
                  navigation.navigate('Chat', { room: room });
                }}
              >
                <Card.Title
                  subtitle={room.lastMessage.text}
                  left={() => (
                    <Avatar.Text
                      size={35}
                      label={room.userB.displayName
                        .match(/(\b\S)?/g)
                        .join('')
                        .match(/(^\S|\S$)?/g)
                        .join('')
                        .toUpperCase()}
                    />
                  )}
                />
              </Card>
            </View>
          );
        })}
    </View>
  );

  const SecondRoute = () => (
    <View style={{ marginTop: 10 }}>
      {groups.map((group, index) => {
        return (
          <View style={{ padding: 10 }} key={index}>
            <Card
              onPress={() => {
                navigation.navigate('Chat', { room: group });
              }}
            >
              <Card.Title
                title={group.groupName}
                subtitle={group.lastMessage ? group.lastMessage.text : ''}
                left={() => (
                  <Avatar.Text
                    size={35}
                    label={group.groupName
                      .match(/(\b\S)?/g)
                      .join('')
                      .match(/(^\S|\S$)?/g)
                      .join('')
                      .toUpperCase()}
                  />
                )}
              />
            </Card>
          </View>
        );
      })}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const chatsQuery = query(collection(db, 'rooms'), where('participantsArray', 'array-contains', currentUser.email));

  useEffect(() => {
    AsyncStorage.getItem('UserSession').then((value) => {
      if (value !== null) {
        const usr = JSON.parse(value);
        if (usr.type === 'user') {
          setRoute([{ key: 'first', title: 'Messages' }]);
        } else {
          setRoute([
            { key: 'first', title: 'Messages' },
            { key: 'second', title: 'Groups' },
          ]);
        }
      } else {
        setRoute([
          { key: 'first', title: 'Messages' },
          { key: 'second', title: 'Groups' },
        ]);
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc.data().participants.find((p) => p.email !== currentUser.email),
      }));
      setRooms(parsedChats.filter((d) => d.lastMessage));
      setGroups(parsedChats.filter((d) => d.type === 'group'));
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} showBack={false} headingTitle={'Pray Up'} />
      {!!routes.length && (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      )}
      <FAB style={styles.fabPlus} icon="plus" onPress={() => navigation.navigate('Questions')} />
    </View>
  );
};

const styles = StyleSheet.create({
  fabPlus: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 0,
  },
});

export default Consultanat;
