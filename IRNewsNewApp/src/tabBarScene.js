/**
 * Created by qiaoqiao on 2017/8/31.
 */

import React,{Component} from 'react';

import MineScene         from './scene/mine/mineScene';
import storage           from './common/storage'
import DisCoverScene     from './scene/disvocer/discoverScene'
import HistoryScene      from './scene/history/historyScene'
import WYNewsDetail      from './scene/disvocer/wangyi/detail/wangyiNewsDetailView'
import ImageViewer       from './widget/ImageViewer'
import color             from './widget/color'

import {
    Image,
} from 'react-native';

import {
    StackNavigator,
    TabNavigator,
    TabBarBottom
} from 'react-navigation';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

const Tab = TabNavigator(
    {
        Home: {
            screen: DisCoverScene,
            navigationOptions:({navigation})=>({
                title        :'发现',
                headerTruncatedBackTitle:'返回',
                headerBackTitle:null,
                headerStyle:{
                    backgroundColor: color.theme
                },
                headerTitleStyle:{
                    color   :'white',
                    fontSize:18
                },
                gesturesEnabled     :true,
                headerBackTitleStyle:{
                    color:'white'
                },
                tabBarIcon:({focused,tintColor})=>(
                    <Image
                        source={focused
                            ?require("./img/tabbar/pfb_tabbar_homepage_selected.png")
                            :require('./img/tabbar/pfb_tabbar_homepage.png')}
                        style={{width:22,height:22}}
                    />
                )
            })
        },
        History: {
            screen: HistoryScene,
            navigationOptions:({navigation})=>({
                title:'历史',
                headerStyle:{
                    backgroundColor: color.theme
                },
                headerBackTitle:null,
                headerTitleStyle:{
                    color:'white',
                    fontSize:18
                },
                gesturesEnabled:true,
                headerBackTitleStyle:{
                    color:'white'
                },
                tabBarIcon:({focused,tintColor})=>(
                    <Image
                        source={focused
                            ?require("./img/tabbar/pfb_tabbar_order_selected.png")
                            :require('./img/tabbar/pfb_tabbar_order.png')}
                        style={{width:22,height:22}}
                    />
                )
            })
        },
        Mine: {
            screen: MineScene,
            navigationOptions:({navigation})=>({
                title:'我的',
                headerTruncatedBackTitle:'返回',
                headerBackTitle:null,
                headerStyle:{
                    backgroundColor: color.theme
                },
                headerTitleStyle:{
                    color:'white',
                    fontSize:18
                },
                gesturesEnabled:true,
                headerBackTitleStyle:{
                    color:'white'
                },
                tabBarIcon:({focused,tintColor})=>(
                    <Image
                        source={focused
                            ?require("./img/tabbar/pfb_tabbar_mine_selected.png")
                            :require('./img/tabbar/pfb_tabbar_mine.png')}
                        style={{width:22,height:22}}
                    />
                )
            })
        }
    },
    {
        tabBarComponent : TabBarBottom,
        tabBarPosition  : 'bottom',
        swipeEnabled    : false,
        animationEnabled: false,
        lazy            : true,
        initialRouteName: 'Home',
        backBehavior    : 'none',

        tabBarOptions: {
            activeTintColor        : color.theme,
            activeBackgroundColor  : 'white',
            inactiveTintColor      : 'rgb(127,131,146)',
            inactiveBackgroundColor: 'white',

            labelStyle: {
                fontSize: 12
            }
        }
    }
);
const Nav = StackNavigator(
    {
        Tab:{
            screen: Tab
        },
        WYNewsDetail:{
            screen: WYNewsDetail,
            navigationOptions:({navigation}) => ({
                title: '详情',
                headerTruncatedBackTitle:'返回',
                headerStyle:{
                    backgroundColor: color.theme
                },
                headerBackTitle:null,
                headerTitleStyle:{
                    color:'white',
                    fontSize:18
                },
                gesturesEnabled:true,
                headerBackTitleStyle:{
                    color:'white'
                },
                headerTintColor:'white',

            }),
        },
        ImageViewer:{
            screen: ImageViewer
        }
    },
    {
        mode            :'card',
        headerMode      :'float',
        transitionConfig:(()=>({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal
        }))
    }
);
export default class TabBarScene extends Component {

    render() {
        return(
            <Nav/>
        );
    }
}

