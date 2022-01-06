import React from 'react';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Main from './src/Main';

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    fonts: configureFonts({
      web: {
        regular: {
          fontFamily: 'Nunito',
          fontWeight: 'normal',
        },
      }
    }),
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

