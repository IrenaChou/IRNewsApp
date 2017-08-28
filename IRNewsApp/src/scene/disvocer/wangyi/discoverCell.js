/**
 * Created by qiaoqiao on 2017/4/19.
 */


//import libary
import React, { Component,PropTypes } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Heading1, Heading2, Paragraph } from '../../../widget/text'
import screen from '../../../common/screen'
import color from '../../../widget/color'


export default class DiscoverCell extends Component {
    render(){
        let { info } = this.props
        let imageUrl = info.picInfo.length
            ? info.picInfo[0].url
            : "http://cms-bucket.nosdn. 127.net/7e760caaa7814ad2bd425dea6592b8aa20170424114806.jpeg";

        return(
            <TouchableOpacity style={styles.container}
                              onPress={() => this.props.onPress()}>
                <Image source={{ uri: imageUrl }} style={styles.icon}/>

                <View style={styles.rightContainer}>
                    <Heading1 style={info.local=="1"?styles.readNewsTitle:styles.newsTitle}>{info.title}</Heading1>

                    <Paragraph numberOfLines={0} style={{marginTop: 8}}>
                        {info.digest}
                    </Paragraph>

                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: color.border,
        backgroundColor: 'white',
    },
    readNewsTitle: {
        color: 'gray',
    },
    newsTitle: {
      color: 'black',
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    }
});
