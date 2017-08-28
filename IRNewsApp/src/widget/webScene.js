/**
 * Created by qiaoqiao on 2017/4/18.
 */

import React, { Component,PropTypes } from 'react';
import { View, Text, StyleSheet,WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class WebScene export Component {
    constructor(props){
        super(props)
        this.state = {
            source : {}
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({source: {url: this.props.url}})
        },500);
    }

    render(){
        return(
            <View style={styles.container}>
                <WebView
                    ref = 'webView'
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={this.state.source}
                    onloadend={(e) => this.onLoadEnd(e)}
                    scalesPageToFit={true}
                />
            </View>
        );
    }
    onLoadEnd(e){
        Actions.refresh({ title: e.nativeEvent.title })
    }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
       backgroundColor: '#2c3e50',
   } ,
    webView: {
       flex: 1,
        backgroundColor: 'white',
    }
});