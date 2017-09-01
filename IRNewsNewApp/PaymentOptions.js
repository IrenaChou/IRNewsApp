/**
 * Created by qiaoqiao on 2017/8/31.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';

export default class PaymentOptions extends  Component{
    constructor(props){
        super(props);
        //noinspection JSAnnotator
        this.state = {selectedIndex: -1,
        };
    }

    _keyExtractor = (item, index) => item.index;

    fetchData(){
        return [{ width: 30,height: 20,title: '银联',index: 0},
            { width: 26,height: 24,title: '微信',index: 1},
            { width: 25,height: 24,title: '支付宝',index: 2}
        ];
    }

    _data = [{width: 30,height: 20,title: '银联',index: 0},
            { width: 26,height: 24,title: '微信',index: 1},
            { width: 25,height: 24,title: '支付宝',index: 2}
    ];

    _renderItem(item){
        let whetherSel = (this.state.selectedIndex === item.index);

        return(
            <TouchableOpacity style={{backgroundColor: whetherSel ? '#EAF3FF' : '#FEFFFD'}}
                              activeOpacity={0.5}
                              onPress={() => {
                                  if (whetherSel === false){
                                      this.setState({selectedIndex: item.index
                                      })
                                  }
                              }}
            >
                <Text>{item.title}</Text>
            </TouchableOpacity>
        );
    }
    render(){
            return(
                <View style={{height: 300,width: 300,alignSelf: 'center',marginTop: this.props.topDistance}}>

                    <FlatList data={this._data}//{this.fetchData()}
                              renderItem={({item}) => this._renderItem(item)}
                              keyExtractor={this._keyExtractor}
                              scrollEnabled={false}
                              extraData={this.state}
                    />
                </View>
            );
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});