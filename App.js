import React from 'react';
import {createAppContainer, createSwitchNavigator, withNavigation } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen.js'
import MainScreen from './screens/MainScreen.js'
import MovieDetailsScreen from './screens/MovieDetails.js'
import PopularMoviesScreen from './screens/PopularMoviesScreen.js'
import Ionicons from 'react-native-vector-icons/Ionicons'

const MainStack = createStackNavigator(
  {
    MainScreen: MainScreen,
    MovieDetails: MovieDetailsScreen,
  },
  {
    initialRouteName: 'MainScreen'
  }
)

const PopularStack = createStackNavigator(
  {
    PopularMovies: PopularMoviesScreen,
    MovieDetails: MovieDetailsScreen,
  },
  {
    initialRouteName: 'PopularMovies'
  }
)

MainStack.navigationOptions = {
  tabBarIcon: ({focused}) => (
    <Ionicons  name={`ios-search`}  size={25} />
  ),
}

PopularStack.navigationOptions = {
  tabBarIcon: ({focused}) => (
    <Ionicons name={`ios-thumbs-up`} size={25} />
  ),
}

const Tabs = createBottomTabNavigator(
  {
    SearchMovie: MainStack,
    PopularMovies : PopularStack,
  }
)

const AppNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Main: Tabs,
})

const App = createAppContainer(AppNavigator);

export default App
