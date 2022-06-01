import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, StyleSheet, useWindowDimensions,Image } from 'react-native';
import { FAB, Card, Avatar, Portal, Provider } from 'react-native-paper';
import Header from './Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot, where } from '@firebase/firestore';
import { TabView, SceneMap } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyle from '../components/GlobalStyles.js';
import { TabBar } from 'react-native-tab-view';

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
            <View  style={GlobalStyle.chatview} key={index}>
              <Card
                onPress={() => {
                  navigation.navigate('Chat', { room: room });
                }}
                style={GlobalStyle.cardcustom}
              >
                <Card.Title
                  title={room.userB.displayName}
                  titleStyle={GlobalStyle.dtext}
                  subtitle={room.lastMessage.text}
                  subtitleStyle={GlobalStyle.cardsubtitle} 
                  left={() => (
                    <Avatar.Text
                      size={40}
                      style={GlobalStyle.avatarlabel}
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
          <View style={GlobalStyle.chatview} key={index}>
            <Card
              onPress={() => {
                navigation.navigate('Chat', { room: group });
              }}
              style={GlobalStyle.cardcustom}
            >
              <Card.Title
                title={group.groupName}
                titleStyle={GlobalStyle.dtext}
                subtitle={group.lastMessage ? group.lastMessage.text : ''}
                subtitleStyle={GlobalStyle.cardsubtitle} 
                left={() => (
                  <Avatar.Text
                   size={40}
                   style={GlobalStyle.avatarlabel}
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
      <View style={[{ flex: 1},GlobalStyle.bg_purple]}>
        <Header navigation={navigation} showBack={false} headingTitle={'Pray Up'} />
        {!!routes.length && (
          <TabView
            //renderTabBar={() => null}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            //tab
            //style={{backgroundColor: 'white'}}
          />
        )}
        {/* <FAB style={styles.fabPlus} icon="plus" onPress={() => navigation.navigate('Questions')} /> */}
        <Portal style={{position:'relative',}}>
          <Image source={require('./../assets/img/plus.png')} style={GlobalStyle.fabimage}></Image>
          <FAB.Group
            open={open}
            
            //icon={open ? 'minus' : 'plus'}
           // icon={open ? 'minus' : 'plus'}
           //style={{position:'absolute',bottom:0,}}
           
            fabStyle={{backgroundColor:'transparent',position:'relative',right:5,bottom:-2,marginBottom:80,elevation:0,}}
            actions={[
              {
                icon: require('./../assets/img/plus.png'),
                label: 'Prayer for Health',
                //onPress: () => navigation.navigate('Chat'),
                onPress: () => navigation.navigate('QuestionAnswer'),
                labelStyle:{backgroundColor:'#e7327c',},
                labelTextColor:'white',
              },
              {
                icon: require('./../assets/img/plus.png'),
                label: 'Prayer for Success',
                onPress: () => navigation.navigate('Chat'),
                labelStyle:{backgroundColor:'#e7327c',},
                labelTextColor:'white',
              },
              {
                icon: require('./../assets/img/plus.png'),
                label: 'Prayer for Overrall Wellbeing',
                onPress: () => navigation.navigate('Chat'),
                labelStyle:{backgroundColor:'#e7327c',},
                labelTextColor:'white',
              },
              {
                icon: require('./../assets/img/plus.png'),
                label: 'Prayer for Wisdom',
                onPress: () => navigation.navigate('Chat'),
                labelStyle:{backgroundColor:'#e7327c',},
                labelTextColor:'white',
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
    //color:'#ffffff',
  },
});

export default Consultanat;
