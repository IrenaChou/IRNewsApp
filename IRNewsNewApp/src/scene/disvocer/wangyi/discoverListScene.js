/**
 * Created by qiaoqiao on 2017/4/19.
 */

//import libaries
import React, { Component } from 'react';
import {
    ListView,
} from 'react-native';

import RefreshListView, { RefreshState } from '../../../widget/refreshListView'
import DiscoverCell                      from './discoverCell'
import DiscoverThreeImageCell            from './discoverThreeImageCell'
import api                               from '../../../api'

/*
* 因为返回的数据使用syrec2函数做了包裹，所以接收到的数据要解包裹
* */
function syrec2(respnseText) {
    return respnseText;
}

export default class DiscoverListScene extends  Component {

    //构造
    constructor(props){
        super(props);

        let ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2});

        this.state = {
            dataSource      : ds.cloneWithRows([]),
            startNum        : 0,
            dataSourceMake  : [],
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

    /*
    * 请求网络数据
    * */
    requestData(isHeaderRefresh){
      // storage.clearMapForKey('news');
      // storage.clearMap();

        let url = isHeaderRefresh
            ? api.articleList
            : api.articeListUrlWithStartNum(this.state.startNum);

        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {

                let jsonText = eval(responseText);

                // 过虑广告数据
                let dataSources = [];
                for (var i = 0;i<jsonText.list.length ;i++){
                    if (jsonText.list[i].type === null
                        || jsonText.list[i].type === ""
                        || jsonText.list[i].title === null
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
                if (localData.length === 0) {
                  storage.getIdsForKey('news').then(result => {
                    localData = result;

                      var localFlag = "0";

                      for (var i = 0;i<dataSources.length ;i++){
                          var obj = dataSources[i];
                          for (var j = 0; j<result.length ; j++){
                              if (obj.docid === result[j]){
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
                          startNum      : startIndex,
                          dataSource    : this.state.dataSource.cloneWithRows(dataSources)
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
                ref        = 'listView'
                dataSource = {this.state.dataSource}
                renderRow  = {this._renderRow.bind(this)}
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
