import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

const Header = ({ navigation, showBack, headingTitle, feeds }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View>
      <Appbar.Header>
        {showBack && (
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
        <Appbar.Content title={headingTitle} />
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
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                onPress={() => {
                  openMenu();
                }}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                navigation.navigate('Chat');
              }}
              title="Support"
            />
          </Menu>
        </View>
      </Appbar.Header>
    </View>
  );
};

export default Header;
