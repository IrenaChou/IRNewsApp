/**
 * Created by qiaoqiao on 2017/4/26.
 */

// import libaries
import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    ListView,
} from 'react-native';

import { Heading1 } from '../../../../widget/text'
import DetailCell   from './detailCell'

import RefreshListView, { RefreshState } from '../../../../widget/refreshListView'

export default class WangyiNewsDetailView extends Component{

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2})

        this.state = {
            dataSource: ds.cloneWithRows([]),
            title     : "",
        }
    }
    componentDidMount() {
        this.refs.listView.startHeaderRefreshing();
    }

    _renderRow(rowData) {
        return (
        <DetailCell
            navigation = {this.props.navigation}
            info       = {rowData}
        />);
    }
    render(){
        return(
          <View style={styles.container}>
            <Heading1>
                {this.state.title}
            </Heading1>
            <RefreshListView
                ref             ='listView'
                dataSource      ={this.state.dataSource}
                renderRow       = {this._renderRow.bind(this)}
                onHeaderRefresh ={() =>
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

        let url = "http://7xrirn.com1.z0.glb.clouddn.com/localairContent1.json";

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {

                let dataSources = [];
                for (let i = 0; i < responseJson.contents.length; i++) {
                  dataSources.push(responseJson.contents[i]);
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(dataSources),
                });

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
