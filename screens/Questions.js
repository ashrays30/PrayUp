import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import Header from './Header';

const Questions = ({ navigation }) => {
  return (
    <View>
      <Header navigation={navigation} showBack={true} headingTitle={'Questions'} />
      <View style={{ marginTop: 50 }}>
        <FAB style={styles.fabPlus} label="Pray Up for Meditation" icon="plus" onPress={() => navigation.navigate('Chat')} />
        <FAB style={styles.fabPlus} label="Pray Up for Focous" icon="plus" onPress={() => navigation.navigate('Chat')} />
        <FAB style={styles.fabPlus} label="Pray Up for Marriage" icon="plus" onPress={() => navigation.navigate('Chat')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fabPlus: {
    position: 'Relative',
    margin: 16,
  },
});

export default Questions;
