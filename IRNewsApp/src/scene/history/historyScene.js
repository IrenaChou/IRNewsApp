/**
 * Created by qiaoqiao on 2017/4/19.
 */

//import libaries
import React, { Component,PropTypes } from 'react';
import { View,
         Text,
         StyleSheet,
         ScrollView,
         TouchableOpacity,
         ListView,
         Image,
         StatusBar
       } from 'react-native';

import { Actions } from 'react-native-router-flux';

import RefreshListView, { RefreshState } from '../../widget/refreshListView'

import DiscoverCell           from '../disvocer/wangyi/discoverCell'
import DiscoverThreeImageCell from '../disvocer/wangyi/discoverThreeImageCell'
import screen                 from '../../common/screen'
import common                 from '../../common/common'

export default class HistoryScene extends  Component {

    //构造
    constructor(props){
        super(props)

        let ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows([]),
        }
    }

    componentDidMount() {
        this.refs.listView.startHeaderRefreshing();
    }

    _renderRow(rowData) {
        if(rowData.type == "doc"
            || rowData.type == "live"
            || rowData.picInfo.length < 3){
            return (
            <DiscoverCell
                info={rowData}
                onPress={()=>{
                    //跳转到详情页面
                    Actions.newsDetail({ info:rowData })
                }}
            />);
        }else{
            return (
            <DiscoverThreeImageCell
                info={rowData}
                onPress={()=>{
                    //跳转到详情页面
                    Actions.newsDetail({ info:rowData })
                }}
            />);
        }
    }

    // 读取本地缓存数据
    loadLocalData(){
      // 获取某个key下的所有数据
      storage.getAllDataForKey('news').then(news => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(news)
        })
        setTimeout(() => {
            this.refs.listView.endRefreshing(RefreshState.Idle)
        },300);
      });
    }

    render(){
        return(
            <RefreshListView
                ref='listView'
                dataSource={this.state.dataSource}
                renderRow= {this._renderRow}
                onHeaderRefresh={() =>
                    this.loadLocalData()
                }
                onFooterRefresh={() =>
                    this.loadLocalData()
                }
            />
        );
    }
}


//define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
