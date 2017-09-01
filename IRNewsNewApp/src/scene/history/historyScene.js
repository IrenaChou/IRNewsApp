/**
 * Created by qiaoqiao on 2017/4/19.
 */

//import libaries
import React, { Component } from 'react';
import {
    ListView,
    StatusBar,
    Platform,
    View
} from 'react-native';

import RefreshListView, { RefreshState } from '../../widget/refreshListView'
import DiscoverCell                      from '../disvocer/wangyi/discoverCell'
import DiscoverThreeImageCell            from '../disvocer/wangyi/discoverThreeImageCell'

export default class HistoryScene extends  Component {

    //构造
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows([]),
        }
    }

    componentDidMount() {
        this.refs.listView.startHeaderRefreshing();
    }


    _renderRow(rowData) {

        if(rowData.type === "doc"
            || rowData.type === "live"
            || rowData.picInfo.length < 3){
            return (
                <DiscoverCell
                    navigation = {this.props.navigation}
                    rowData    = {rowData}
                    info       = {rowData}
                />);
        }else{
            return (

                <DiscoverThreeImageCell
                    navigation = {this.props.navigation}
                    rowData    = {rowData}
                    info       = {rowData}
                />);
        }
    }

    // 读取本地缓存数据
    loadLocalData(){
      // 获取某个key下的所有数据
      storage.getAllDataForKey('news').then(news => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(news)
        });

          this.refs.listView.endRefreshing(RefreshState.Idle)
      });
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
            <View>
                {statusBar}
                <RefreshListView
                    ref         ='listView'
                    dataSource  ={this.state.dataSource}
                    renderRow   = {this._renderRow.bind(this)}
                    onHeaderRefresh={() =>
                        this.loadLocalData()
                    }
                    onFooterRefresh={() =>
                        this.loadLocalData()
                    }
                />

            </View>
        );
    }
}

