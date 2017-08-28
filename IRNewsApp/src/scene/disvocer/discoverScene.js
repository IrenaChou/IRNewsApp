/**
 * Created by qiaoqiao on 2017/4/19.
 */

//import libary
import React, { Component,PropTypes } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ListView,
  Image
} from 'react-native';

import { Actions } from 'react-native-router-flux'

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import RefreshListView, { RefreshState }    from '../../widget/refreshListView'
import { Heading1, Heading2, Paragraph }    from '../../widget/text'
import NavigationIrem    from '../../widget/navigationItem'
import Button            from '../../widget/button'
import color             from '../../widget/color'
import screen            from '../../common/screen'
import system            from '../../common/system'
import DiscoverListScene from './wangyi/discoverListScene'
import JuejinListScene   from './juejin/juejinListScene'


export default class DiscoverScene extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount(){

    }
    render(){
        let titles = ['网易头条', '掘金',  '全部']

        let storyListViews = [];

        // 网易头条
        let storyListView =
            <DiscoverListScene tabLabel={titles[0]}
                               key={0} />

        let juejinListView =
            <JuejinListScene tabLabel={titles[1]}
                             key={1}/>
        // 全部
        let storyListViewAll = <DiscoverListScene tabLabel={titles[2]}
                                                  key={2} />

        storyListViews.push(storyListView)
        storyListViews.push(juejinListView)
        storyListViews.push(storyListViewAll)

        return(
            <ScrollableTabView
                style={styles.container}
                tabBarBackgroundColor='white'
                tabBarActiveTextColor={color.theme}
                tabBarInactiveTextColor='#555555'
                tabBarTextStyle={styles.tabBarText}
                tabBarUnderlineStyle={styles.tabBarUnderline}
            >
                {storyListViews}
            </ScrollableTabView>
        );
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:color.background
    },
    searchBar: {
        width:          screen.width * 0.65,
        height:         30,
        borderRadius:   19,
        flexDirection:  'row',
        justifyContent: 'center',
        alignItems:     'center',
        backgroundColor:'#eeeeee',
        alignSelf:      'flex-end',
        marginTop:      system.isIOS ? 25 : 13,
        marginRight:    20,
    },
    searchIcon: {
        width:  20,
        height: 20,
        margin: 5,
    },
    tabBarText: {
        fontSize:  14,
        marginTop: 13,
    },
    tabBarUnderline: {
        backgroundColor: color.theme
    },
});
