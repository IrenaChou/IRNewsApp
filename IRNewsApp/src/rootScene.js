/**
 * Created by qiaoqiao on 2017/4/18.
 */

//import librayies
import React, { Component,PropTypes } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { Router, Scene, Actions, Schema,ActionConst }  from 'react-native-router-flux';

import color  from './widget/color'
import system from  './common/system'
import screen from  './common/screen'


import WangyiNewsDetailScene from './scene/disvocer/wangyi/detail/wangyiNewsDetailView'
import DiscoverScene         from './scene/disvocer/discoverScene'
import PhotoZoomPro          from './widget/photoZoomPro'
import MineScene             from './scene/mine/mineScene'
import HistoryScene          from  './scene/history/historyScene'
import TabBarItem            from './widget/tabBarItem'


const animate = props => {
    const { position, scene } = props;

    const index = scene.index;
    const inputRange = [index-1, index+1];
    const outputRange = [screen.width, -screen.width];

    const translateX = position.interpolate({ inputRange, outputRange });
    return { transform:[{ translateX }] };
}

export default class RootScene extends Component {
    render(){
        return (
            <Router
                ref='router'
                titleStyle={styles.navigationBarTitle}
                barButtonIconStyle={styles.navigationBarButtonIcon}
                navigationBarStyle={styles.navigationBarStyle}
                getSceneStyle={this.sceneStyle}
                panHandlers={null}
                animationStyle={animate}

                onSelect={el => {
                    const { sceneKey, statusBarStyle } = el.props
                    if (statusBarStyle) {
                        StatusBar.setBarStyle(statusBarStyle, false)
                    } else {
                        StatusBar.setBarStyle('default', false)
                    }
                    Actions[sceneKey]()
                }}
                onBack={(el) => {
                    if (el.sceneKey == 'home' && el.children.length == 2) {
                        StatusBar.setBarStyle('light-content', false)
                    }
                    Actions.pop()
                }}
            >
                <Scene
                    initial
                    key="tabBar"
                    tabs
                    tabBarStyle={styles.tabBar}
                    tabBarSelectedItemStyle={styles.tabBarSelectedItem}
                    tabBarSelectedTitleStyle={styles.tabBarSelectedTitle}
                    tabBarUnselectedTtitleStyle={styles.tabBarUnselectedImage}
                >
                    <Scene
                        key='home'
                        title='发现'
                        component={DiscoverScene}
                        image={require('./img/tabbar/pfb_tabbar_homepage.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_homepage_selected.png')}
                        icon={TabBarItem}
                        navigationBarStyle={{ backgroundColor: 'white' }}
                        titleStyle={{ color: color.theme }}
                        statusBarStyle='light-content'
                    />
                    <Scene
                        key='history'
                        title='历史'
                        component={HistoryScene}
                        image={require('./img/tabbar/pfb_tabbar_order.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_order_selected.png')}
                        icon={TabBarItem}
                        navigationBarStyle={{ backgroundColor: 'white' }}
                        titleStyle={{ color: color.theme }}
                        statusBarStyle='light-content'
                    />
                    <Scene
                        key='mine'
                        title='我的'
                        component={MineScene}
                        image={require('./img/tabbar/pfb_tabbar_mine.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_mine_selected.png')}
                        icon={TabBarItem}
                        navigationBarStyle={{ backgroundColor: 'white' }}
                        titleStyle={{ color: color.theme }}
                        statusBarStyle='light-content'
                    />
                </Scene>

                <Scene
                    key='newsDetail'
                    component={WangyiNewsDetailScene}
                    title='新闻详情'
                    navigationBarStyle={{ backgroundColor: 'white' }}
                    titleStyle={{ color: color.theme }}
                    hideTabBar
                    clone />
                <Scene key="photoZoomPro" component={PhotoZoomPro} hideTabBar hideNavBar clone/>
            </Router>
        );
    }
    sceneStyle = (props, computedProps) => {
        const style = {
            flex: 1,
            // backgroundColor: color.theme,
            backgroundColor: 'white',
            shadowColor: null,
            shadowOffset: null,
            shadowOpacity: null,
            shadowRadius: null,
        };
        if (computedProps.isActive) {
            style.marginTop = computedProps.hideNavBar ? (system.isIOS ? 20 : 0) : (system.isIOS ? 64 : 54);
            style.marginBottom = computedProps.hideTabBar ? 0 : 50;
        }
        return style;
    };


}

// define your styles
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#ffffff',
    },
    tabBarSelectedItem: {
        backgroundColor: '#ffffff',
    },

    tabBarSelectedTitle: {
        color: color.theme,
    },
    tabBarUnselectedTitle: {
        color: '#979797',
    },

    tabBarSelectedImage: {
        tintColor: color.theme,
    },
    tabBarUnselectedImage: {
        tintColor: '#979797'
    },

    navigationBarStyle: {
        backgroundColor: 'white'
    },
    navigationBarTitle: {
        color: '#333333'
    },
    navigationBarButtonIcon: {
        tintColor: color.theme
    },
});
