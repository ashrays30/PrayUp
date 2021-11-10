import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Main from './src/Main';

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
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

