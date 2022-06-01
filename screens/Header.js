import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import GlobalStyle from '../components/GlobalStyles';

const Header = ({ navigation, showBack, headingTitle, feeds }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View style={GlobalStyle.headercurve}>
      <Appbar.Header style={GlobalStyle.bg_pink}>
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
            zIndex: 20,
          }}
        >
          <Appbar.Action
            icon="bell"
            color='#ffffff'
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
