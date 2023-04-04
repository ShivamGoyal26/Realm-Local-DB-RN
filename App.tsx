import React from 'react';
import {} from 'react-native';
import HomeStack from './src/routers/HomeStack';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
