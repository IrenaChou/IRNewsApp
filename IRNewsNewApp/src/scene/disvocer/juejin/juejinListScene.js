/**
 * Created by qiaoqiao on 2017/4/25.
 */
// import libary
import React, { Component,PropTypes } from 'react';

import {
    WebView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar } from 'react-native';

import Storage from '../../../common/storage'


// create component
export default class JuejinListScene extends Component{
    state = {
        url: 'https://juejin.im/explore/all',
    }
    render(){
        return(
            <WebView style={styles.container}
                     automaticallyAdjustContentInsets={false}
                     source={{uri: this.state.url}}
                     javaScriptEnabled={true}
                     domstorageenabled={true}
                     decelerationRate='normal'
                     startInLoadingState={true}
            />
        );
    }
}


// create your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});