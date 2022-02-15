import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, StyleSheet, useWindowDimensions } from 'react-native';
import { FAB, Card, Avatar, Portal, Provider } from 'react-native-paper';
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
  const [fabState, setFabState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setFabState({ open });

  const { open } = fabState;

  const FirstRoute = () => (
    <ScrollView style={{ marginTop: 10 }}>
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
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView style={{ marginTop: 10 }}>
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
    </ScrollView>
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
    <Provider>
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
        {/* <FAB style={styles.fabPlus} icon="plus" onPress={() => navigation.navigate('Questions')} /> */}
        <Portal>
          <FAB.Group
            open={open}
            icon={open ? 'plus' : 'plus'}
            actions={[
              {
                icon: 'help-circle-outline',
                label: 'Prayer for Health',
                onPress: () => navigation.navigate('Chat'),
              },
              {
                icon: 'help-circle-outline',
                label: 'Prayer for Success',
                onPress: () => navigation.navigate('Chat'),
              },
              {
                icon: 'help-circle-outline',
                label: 'Prayer for Overrall Wellbeing',
                onPress: () => navigation.navigate('Chat'),
              },
              {
                icon: 'help-circle-outline',
                label: 'Prayer for Wisdom',
                onPress: () => navigation.navigate('Chat'),
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </View>
    </Provider>
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
