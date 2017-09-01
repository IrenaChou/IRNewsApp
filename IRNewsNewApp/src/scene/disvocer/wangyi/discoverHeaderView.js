/**
 * Created by qiaoqiao on 2017/4/20.
 */
//import liraries
import React, { Component,PropTypes } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Paragraph } from '../../../widget/text'
import screen        from '../../../common/screen'
import color         from '../../../widget/color'


export default class DiscoverHeaderView extends Component {
    static defaultProps = {
        onSelected: () => {}
    };

    render(){
        let items = [];
        for (let i = 0; i < this.props.titles.length; i++){
            let item = (
                <TouchableOpacity style={[{ backgroundColor: this.props.selectedIndex === i ? color.theme : 'white'}, styles.item]}
                                  key={i}
                                  onPress={() => this.props.onSelected(i)}
                >
                    <Paragraph style={{ color: this.props.selectedIndex === i ? 'white' :  '#555555'}} />
                </TouchableOpacity>
            )
            items.push(item)
        }

        return(
            <View style={styles.container}>
                {items}
            </View>
        );
    }
}


//define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap     : 'wrap',
    },
    item: {
        width           : screen.width / 4 - 10,
        marginLeft      : 8,
        marginTop       : 5,
        marginBottom    : 5,
        height          : 30,
        justifyContent  : 'center',
        alignItems      : 'center',
        borderRadius    : 15,
        borderWidth     : 1,
        borderColor     : color.border,
    },
});