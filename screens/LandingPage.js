import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text, Appbar } from 'react-native-paper';
import WallFeedsScreen from './WallFeeds';
import Consultanat from './Consultanat';
import { CenterText } from './../components/styles';

const LandingPage = ({navigation}) => {
  const FeedsRoute = () => <WallFeedsScreen navigation={navigation}/>;

  const spritualRoute = () => <Text style={CenterText}>Spirituality</Text>;

  const ConsultRoute = () => <Consultanat navigation={navigation}/>;

  const ProfileRoute = () => <Text style={CenterText}>Profile</Text>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'feeds', title: 'Feeds', icon: 'post-outline' },
    { key: 'spritual', title: 'Spirituality', icon: 'meditation' },
    { key: 'consult', title: 'Consultant', icon: 'account-group' },
    { key: 'profile', title: 'Profile', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feeds: FeedsRoute,
    spritual: spritualRoute,
    consult: ConsultRoute,
    profile: ProfileRoute,
  });

  return <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />;
};

export default LandingPage;
