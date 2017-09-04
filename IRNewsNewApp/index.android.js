/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import TabBarScene from './src/tabBarScene'

export default class IRNewsNewApp extends Component {
  render() {
    return (
        <TabBarScene />
      );
  }
}

AppRegistry.registerComponent('IRNewsNewApp', () => IRNewsNewApp);
