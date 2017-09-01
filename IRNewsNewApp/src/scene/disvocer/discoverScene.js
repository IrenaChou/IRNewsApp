/**
 * Created by qiaoqiao on 2017/4/19.
 */

//import libary
import React, { Component,PropTypes } from 'react';

import {
    StyleSheet,
    StatusBar,
    Platform,
    View
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view'
import color             from '../../widget/color'
import DiscoverListScene from './wangyi/discoverListScene'
import JuejinListScene   from './juejin/juejinListScene'


export default class DiscoverScene extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){

    }
    render(){
        var statusBar;
        if (Platform.OS==='ios') {
            statusBar = (
                <StatusBar
                    barStyle="light-content"
                    animated={true}
                />
            );
        }
        return(
        <View style={styles.container}>
            {statusBar}

            <ScrollableTabView
                style                  ={styles.container}
                tabBarBackgroundColor  ='white'
                tabBarActiveTextColor  ={color.theme}
                tabBarInactiveTextColor='#555555'
                tabBarTextStyle        ={styles.tabBarText}
                tabBarUnderlineStyle   ={styles.tabBarUnderline}
            >
                <DiscoverListScene navigation={this.props.navigation}
                                   tabLabel  = '网易头条'
                                   key       ={0} />

                <JuejinListScene navigation  ={this.props.navigation}
                                 tabLabel    = '掘金'
                                 key         ={1} />

                <DiscoverListScene navigation={this.props.navigation}
                                   tabLabel  = '全部'
                                   key       ={2} />

            </ScrollableTabView>
        </View>
        );
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex            : 1,
        justifyContent  :'center',
        alignItems      :'center',
        backgroundColor :color.background
    },
    tabBarText: {
        fontSize : 14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: color.theme
    },
});
