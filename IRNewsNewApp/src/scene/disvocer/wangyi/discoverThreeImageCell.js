/**
 * Created by qiaoqiao on 2017/4/24.
 */
//import libary
import React, { Component,PropTypes } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import { Heading1 } from '../../../widget/text'
import color        from '../../../widget/color'

/*
 * 保存点击过的新闻到本地，做缓存记录，每次只保存一条
 * */
function saveReadNewsToLocation(rowData){
    storage.save({
        key     : "news",          // 注意:请不要在key中使用_下划线符号!common.storyKey
        id      : rowData.docid,   // 注意:请不要在id中使用_下划线符号!
        data    : rowData,
        expires : null,
    });
}


//create component
export default class DiscoverThreeImageCell extends Component{
    render(){
        let { info } = this.props;

        let imageUrls = info.picInfo;

        return(
                <TouchableOpacity
                                  onPress={() =>
                                  {
                                      saveReadNewsToLocation(this.props.rowData);
                                      this.props.navigation.navigate('WYNewsDetail',{info:this.props.rowData})

                                  }}>
                    <View style={styles.topContainer}>
                        <Heading1 style={info.local==="1"?styles.readNewsTitle:styles.newsTitle}>
                            {info.title}
                        </Heading1>
                    </View>

                    <View style={styles.container}>
                        <Image source={{ uri: imageUrls[0].url }} style={styles.icon}/>
                        <Image source={{ uri: imageUrls[1].url }} style={styles.icon}/>
                        <Image source={{ uri: imageUrls[2].url }} style={styles.icon}/>
                    </View>
                </TouchableOpacity>
            );
    }
}


//define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection       : 'row',
        padding             : 10,
        borderBottomWidth   : 1,
        borderColor         : color.border,
        backgroundColor     : 'white',
    },
    icon: {
        margin      : 5, //控件之间的距离
        flex        : 1,
        height      : 80,
        borderRadius: 5,
    },
    topContainer: {
        flexDirection   : 'column',
        paddingLeft     : 10,
        paddingRight    : 10,
        paddingTop      : 10,
        backgroundColor : 'white',
    },
    readNewsTitle: {
        color: 'gray',
    },
    newsTitle: {
      color: 'black',
    },
});
