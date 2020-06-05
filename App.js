import React from 'react';
import {createAppContainer, createSwitchNavigator, withNavigation } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen.js'
import MainScreen from './screens/MainScreen.js'
import MovieDetailsScreen from './screens/MovieDetails.js'

const MainStack = createStackNavigator(
  {
    MainScreen: MainScreen,
    MovieDetails: MovieDetailsScreen,
  },
  {
    initialRouteName: 'MainScreen'
  }
)

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Main: MainStack,
})

const App = createAppContainer(AppNavigator);

export default App
