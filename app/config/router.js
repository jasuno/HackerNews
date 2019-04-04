import React, { Component } from "react";
import { Button } from "react-native-elements";

import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import MainScreen from "../screens/MainScreen";

export const Main = createStackNavigator({
  MainScreen: {
    screen: MainScreen,
    title: "Hacker news"
  }
});
