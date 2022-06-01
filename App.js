import React from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Main from './src/Main';
// import {useFonts} from 'expo-font';
//import AppLoading from 'expo-app-loading';


// const fontConfig = {
//   web: {
//     regular: {
//       fontFamily: 'Nunito-VariableFont_wght',
//       fontWeight: 'normal',
//     },
//   },
//   android: {
//     regular: {
//       fontFamily: 'Nunito-VariableFont_wght',
//       fontWeight: 'normal',
//     },
//   },
//   ios: {
//     regular: {
//       fontFamily: 'Nunito-VariableFont_wght',
//       fontWeight: 'normal',
//     },
//   },
// }
export default function App() {
  // let [fontsLoaded]=useFonts({
  //   'Nunito':require('./assets/fonts/Nunito-Black.ttf')
  // });
  // if(!fontsLoaded)
  // {
  //   return <AppLoading/>
  // }
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    //fonts: configureFonts(fontConfig),
    // fonts: configureFonts({
    //   web: {
    //     regular: {
    //       fontFamily: 'Nunito-VariableFont_wght',
    //       fontWeight: 'normal',
    //     },
    //     //assets:['./assets/fonts/'],
    //   },
    //   android: {
    //     regular: {
    //       fontFamily: 'Nunito-VariableFont_wght',
    //       fontWeight: 'normal',
    //     },
    //     //assets:['./assets/fonts/Nunito-Black.ttf'],
    //   }
    // }),
    colors: {
      ...DefaultTheme.colors,
      primary: '#4f5abf',
      accent: '#f1c40f',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  );
}

