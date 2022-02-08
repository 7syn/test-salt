
//App.js
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './screens/Home';
import Detail from './screens/Detail';
import List from './screens/List';

const appNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Detail: {
      screen: Detail,
    },
    List: {
      screen: List,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerShown: false,
    }
  },
);

const AppContainer = createAppContainer(appNavigator);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;