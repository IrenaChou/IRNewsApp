/**
 * Created by qiaoqiao on 2017/4/19.
 */


//import libaries
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


//create a component
export default class Button extends Component {

    static propTypes = {
        onPress: PropTypes.func,
        disable: PropTypes.bool,
        style: Text.propTypes.style,
        containerStyle: View.propTypes.style,
        title: PropTypes.string,
        activeOpacity: PropTypes.number
    }

    static defaultProps = {
        onPress(){},
        disable: false,
        activeOpacity: 0.8
    }

    render(){
        let { onPress, disable, style, containerStyle, title, activeOpacity } = this.props
        return(
            <TouchableOpacity
                style={[styles.container, containerStyle]}
                onPress={onPress}
                disable={disable}
                activeOpacity={activeOpacity}
            >
                <Text style={style}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
}


//define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});