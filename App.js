import React from 'react';
import {View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Add">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Netflix Store',
            headerStyle: {backgroundColor: '#0f4c75'},
            headerTitleStyle: {textAlign: 'center', color: '#00bc72'},
          }}></Stack.Screen>

        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            title: 'Netflix Store',
            headerStyle: {backgroundColor: '#0f4c75'},
            headerTitleStyle: {textAlign: 'center', color: '#00bc72'},
          }}></Stack.Screen>

        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            title: 'Netflix Store',
            headerStyle: {backgroundColor: '#0f4c75'},
            headerTitleStyle: {textAlign: 'center', color: '#00bc72'},
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
