/**
 * Created by qiaoqiao on 2017/4/24.
 */
//import libary
import React, { Component,PropTypes } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Heading1, Heading2, Paragraph } from '../../../widget/text'
import screen from '../../../common/screen'
import color  from '../../../widget/color'



//create component
export default class DiscoverThreeImageCell extends Component{
    render(){
        let { info } = this.props

        let imageUrls = info.picInfo;

        return(
                <TouchableOpacity
                                  onPress={() => this.props.onPress()}>
                    <View style={styles.topContainer}>
                        <Heading1 style={info.local=="1"?styles.readNewsTitle:styles.newsTitle}>{info.title}</Heading1>
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
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: color.border,
        backgroundColor: 'white',
    },
    icon: {
        margin: 5, //控件之间的距离
        flex: 1,
        height: 80,
        borderRadius: 5,
    },
    topContainer: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        backgroundColor: 'white',
    },
    readNewsTitle: {
        color: 'gray',
    },
    newsTitle: {
      color: 'black',
    },
});
