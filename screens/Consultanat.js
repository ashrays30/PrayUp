import React , { useEffect, useState }from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, View, StyleSheet, Text } from 'react-native';
import { FAB, Card, Avatar } from 'react-native-paper';
import Header from './Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot, where } from '@firebase/firestore';

const auth = getAuth();
const db = getFirestore();

const Consultanat = ({ navigation }) => {
  const [currentUser] = useAuthState(auth);
  const [rooms, setRooms] = useState([]);

  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));
      setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Header navigation={navigation} showBack={false} headingTitle={'Pray Up'} />
      <View style={{marginTop:50}}>
          {rooms.map((room, index) => {
              return (
                <View style={{ padding: 10 }} key={index}>
                    <Card onPress={() => {navigation.navigate('Chat', {room: room})}}>
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
      <FAB style={styles.fabPlus} icon="plus" onPress={() => navigation.navigate('Questions')} />
    </View>
  );
};

const styles = StyleSheet.create({
  fabPlus: {
    position: 'fixed',
    margin: 16,
    right: 20,
    bottom: 80,
  },
});

export default Consultanat;
