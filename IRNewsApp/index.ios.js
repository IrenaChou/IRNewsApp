/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

import storage from './src/common/storage'
//import libaries
import  RootScene from './src/rootScene'

export default class IRNewsApp extends Component {
  render() {
    return (
        <RootScene/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('IRNewsApp', () => IRNewsApp);
