import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Files

import TodoList from '../containers/home/TodoList';
import Edit from '../containers/home/Edit';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'TodoList'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'TodoList'} component={TodoList} />
      <Stack.Screen name={'Edit'} component={Edit} />
    </Stack.Navigator>
  );
};

export default HomeStack;
