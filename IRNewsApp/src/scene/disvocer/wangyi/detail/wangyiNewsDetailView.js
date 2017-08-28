/**
 * Created by qiaoqiao on 2017/4/26.
 */

// import libaries
import React, { Component,
                PropTypes } from 'react';

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

import { Heading1 } from '../../../../widget/text'

import api from '../../../../api'

import DetailCell from './detailCell'
import RefreshListView, { RefreshState } from '../../../../widget/refreshListView'
import PhotoZoomPro from '../../../../widget/photoZoomPro'

export default class WangyiNewsDetailView extends Component{

    constructor(props) {
        super(props)

        let ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2})

        this.state = {
            dataSource: ds.cloneWithRows([]),
            title: "",
        }
    }
    componentDidMount() {
        this.refs.listView.startHeaderRefreshing();
    }
    _renderRow(rowData) {
        return (
        <DetailCell
            info={rowData}
            onPress={()=>{
              //点击图片放大
              Actions.photoZoomPro({ info : rowData })
            }}
        />);
    }
    render(){
        return(
          <View style={styles.container}>
            <Heading1>{this.state.title}</Heading1>
            <RefreshListView
                ref='listView'
                dataSource={this.state.dataSource}
                renderRow= {this._renderRow}
                onHeaderRefresh={() =>
                    this.requestData(true)
                }
                onFooterRefresh={() =>
                    this.refs.listView.endRefreshing(RefreshState.Idle)
                }
            />
          </View>
        );
    }

    requestData(docId){

        let url = "http://7xrirn.com1.z0.glb.clouddn.com/localairContent1.json"

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log("irena===="+responseJson);
                let dataSources = [];
                for (var i = 0; i < responseJson.contents.length; i++) {
                  dataSources.push(responseJson.contents[i]);
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataSources),
                })

                setTimeout(() => {
                    this.refs.listView.endRefreshing(RefreshState.Idle)
                },300);
            })
            .catch((error) => {
                this.refs.listView.endRefreshing(RefreshState.Failure)
            })
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
