import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

const Header = ({ navigation, showBack, headingTitle, feeds }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View>
      <Appbar.Header style={{backgroundColor: "#F6F6F6"}}>
        {showBack && (
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
        <Appbar.Content style={{fontWeight: "bold"}} title={headingTitle} />
        {feeds && (
          <Appbar.Action
            icon="plus"
            onPress={() => {
              navigation.navigate('WallPost');
            }}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'right',
            zIndex: 20,
          }}
        >
          <Appbar.Action
            icon="bell"
            onPress={() => {
              ;
            }}
          />
        </View>
      </Appbar.Header>
    </View>
  );
};

export default Header;
