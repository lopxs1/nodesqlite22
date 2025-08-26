import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import Header from './components/Header';
import TabNavigator from './navigation/TabNavigator';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Header />
        <TabNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
