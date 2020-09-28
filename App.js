/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import List from './src/List';
import Create from './src/Create';
import Update from './src/Update';

const ApplicationStack = createStackNavigator(
  {
    listScreen: {
      screen: List,
      navigationOptions: {
        headerShown: false,
      },
    },
    createScreen: {
      screen: Create,
      navigationOptions: {
        headerShown: false,
      },
    },
    updateScreen: {
      screen: Update,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'listScreen',
  },
);
const AppNavigator = createSwitchNavigator(
  {
    applicationStack: {screen: ApplicationStack},
  },
  {
    initialRouteName: 'applicationStack',
  },
);
const AppContainer = createAppContainer(AppNavigator);
const App: () => React$Node = () => {
  return <AppContainer />;
};

export default App;
