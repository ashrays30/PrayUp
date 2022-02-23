import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text, Appbar } from 'react-native-paper';
import WallFeedsScreen from './WallFeeds';
import Consultanat from './Consultanat';
import ProfileScreen from './Profile';
import { CenterText } from './../components/styles';

const LandingPage = ({ navigation }) => {
  const FeedsRoute = () => <WallFeedsScreen navigation={navigation} />;

  const spritualRoute = () => <Text style={CenterText}>Flow</Text>;

  const ConsultRoute = () => <Consultanat navigation={navigation} />;

  const TrackRoute = () => <Text style={CenterText}>Track Your Progress</Text>;

  const ProfileRoute = () => <ProfileScreen navigation={navigation} />;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'feeds', title: 'Today', icon: 'post-outline', color: '#FFFFFF' },
    { key: 'spritual', title: 'Flow', icon: 'meditation', color: '#FFFFFF' },
    { key: 'consult', title: 'Pray Up', icon: require('./../assets/img/app_logo.svg'), color: '#FFFFFF'},
    { key: 'track', title: 'Track', icon: 'chart-areaspline', color: '#FFFFFF' },
    { key: 'profile', title: 'Profile', icon: 'account', color: '#FFFFFF' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feeds: FeedsRoute,
    spritual: spritualRoute,
    consult: ConsultRoute,
    track: TrackRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={'#000000'}
      inactiveColor={'grey'}
    />
  );
};

export default LandingPage;
