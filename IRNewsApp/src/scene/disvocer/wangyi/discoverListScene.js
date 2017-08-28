/**
 * Created by qiaoqiao on 2017/4/19.
 */

//import libaries
import React, { Component,PropTypes } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,ListView, Image,StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';

import RefreshListView, { RefreshState } from '../../../widget/refreshListView'
import { Heading1, Heading2, Paragraph } from '../../../widget/text'

import DiscoverCell           from './discoverCell'
import DiscoverThreeImageCell from  './discoverThreeImageCell'

import screen  from '../../../common/screen'
import common  from '../../../common/common'
import api     from '../../../api'

/*
* 因为返回的数据使用syrec2函数做了包裹，所以接收到的数据要解包裹
* */
function syrec2(respnseText) {
    return respnseText;
}

/*
 * 保存点击过的新闻到本地，做缓存记录，每次只保存一条
 * */
function saveReadNewsToLocation(rowData){
    storage.save({
        key: "news",  // 注意:请不要在key中使用_下划线符号!common.storyKey
        id: rowData.docid,   // 注意:请不要在id中使用_下划线符号!
        data: rowData,
        expires: null,
    });
}

export default class DiscoverListScene extends  Component {

    //构造
    constructor(props){
        super(props)

        let ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2})

        this.state = {
            dataSource: ds.cloneWithRows([]),
            startNum: 0,
            dataSourceMake: [],
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
                    saveReadNewsToLocation(rowData);

                    //跳转到详情页面
                    Actions.newsDetail({ info:rowData })
                }}
            />);
        }else{
            return (
            <DiscoverThreeImageCell
                info={rowData}
                onPress={()=>{

                    saveReadNewsToLocation(rowData);

                    //跳转到详情页面
                    Actions.newsDetail({ info:rowData })
                }}
            />);
        }
    }

    /*
    * 请求网络数据
    * */
    requestData(isHeaderRefresh){
      // storage.clearMapForKey('news');
      // storage.clearMap();

        let url = isHeaderRefresh
            ? api.articleList
            : api.articeListUrlWithStartNum(this.state.startNum)

        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {

                let jsonText = eval(responseText);

                // 过虑广告数据
                let dataSources = [];
                for (var i = 0;i<jsonText.list.length ;i++){
                    if (jsonText.list[i].type == null
                        || jsonText.list[i].type == ""
                        || jsonText.list[i].title == null
                    ){
                        continue;
                    }else{
                        dataSources.push(jsonText.list[i]);
                    }
                }
                let startIndex = 0
                if (isHeaderRefresh){
                    startIndex = jsonText.list.length + 1
                }else{
                    startIndex  = jsonText.list.length + this.state.startNum
                    dataSources = this.state.dataSourceMake.concat(dataSources)
                }


                /*
                 * 获取缓存数据
                 * */
                // 获取某个key下的所有id
                var localData = [];
                if (localData.length == 0) {
                  storage.getIdsForKey('news').then(result => {
                    localData = result;

                      var localFlag = "0";

                      for (var i = 0;i<dataSources.length ;i++){
                          var obj = dataSources[i];
                          for (var j = 0; j<result.length ; j++){
                              if (obj.docid == result[j]){
                                localFlag = "1";
                                break;
                              }else{
                                localFlag = "0";
                                continue;
                              }
                          }
                          obj.local = localFlag;
                      }

                      this.setState({
                          dataSourceMake: dataSources,
                          startNum: startIndex,
                          dataSource: this.state.dataSource.cloneWithRows(dataSources)
                      })
                  });
                }

                setTimeout(() => {
                    this.refs.listView.endRefreshing(RefreshState.Idle)
                },300);
            })
            .catch((error) => {
                this.refs.listView.endRefreshing(RefreshState.Failure)
            })
    }

    render(){
        return(
            <RefreshListView
                ref='listView'
                dataSource={this.state.dataSource}
                renderRow= {this._renderRow}
                onHeaderRefresh={() =>
                    this.requestData(true)
                }
                onFooterRefresh={() =>
                    this.requestData(false)
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
