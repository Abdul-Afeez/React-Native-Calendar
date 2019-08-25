import React from 'react';
import Welcome from '../screens/Welcome';
import Settings from '../screens/Setting'
import { createStackNavigator, createAppContainer } from "react-navigation";
const AppNavigator = createStackNavigator({
  Welcome: {
      screen: Welcome
    },
  Settings: {
    screen: Settings
  }
  },
 {
  initialRouteName: "Welcome"
 });
  
  export default createAppContainer(AppNavigator);