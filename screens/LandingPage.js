import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text, Appbar } from 'react-native-paper';
import WallFeedsScreen from './WallFeeds';
import Consultanat from './Consultanat';
import ProfileScreen from './Profile';
import { CenterText } from './../components/styles';
import GlobalStyle from '../components/GlobalStyles.js';

const LandingPage = ({ navigation }) => {
  const FeedsRoute = () => <WallFeedsScreen navigation={navigation} />;

  const spritualRoute = () => <Text style={CenterText}>Flow</Text>;

  const ConsultRoute = () => <Consultanat navigation={navigation} />;

  const TrackRoute = () => <Text style={CenterText}>Track Your Progress</Text>;

  const ProfileRoute = () => <ProfileScreen navigation={navigation} />;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'feeds', title: 'Today', icon: 'post-outline', },
    { key: 'spritual', title: 'Flow', icon: 'meditation',  },
    { key: 'consult', title: 'Pray Up', icon: require('./../assets/img/app_logo.png'), },
    { key: 'track', title: 'Track', icon: 'chart-areaspline',},
    { key: 'profile', title: 'Profile', icon: 'account',},

    
  ]);
  // { key: 'feeds', title: 'Today', icon: 'post-outline', color: '#FFFFFF' },
  const renderScene = BottomNavigation.SceneMap({
    feeds: FeedsRoute,
    spritual: spritualRoute,
    consult: ConsultRoute,
    track: TrackRoute,
    profile: ProfileRoute,
  });

  return (
    <View style={{flex:1,backgroundColor: '#491849',}}>
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      backgroundColor='white'
      // activeColor={'#ffffff'}
      // inactiveColor={'#ffffff'}
      barStyle={{
        backgroundColor: '#e7327c',
        position: 'absolute',
        bottom:6,
        width:'95%',
        marginLeft:'2.5%',
        overflow: 'hidden',
        borderRadius: 50,
        padding:3,
        elevation:0,
      }} 
    />
    </View>
  );
};

export default LandingPage;
