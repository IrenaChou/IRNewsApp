import React, { Component,PropTypes } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Heading1, Heading2, Paragraph } from '../../../../widget/text'
import screen from '../../../../common/screen'
import color from '../../../../widget/color'

export default class DetailCell extends Component {
    render(){
        let { info } = this.props;
        let imageUrl = info.imgurl.length
            ? info.imgurl
            : "http://cms-bucket.nosdn. 127.net/7e760caaa7814ad2bd425dea6592b8aa20170424114806.jpeg";

        return(
          <TouchableOpacity style={styles.container}
                            onPress={() => this.props.onPress()}>

              <Image
                source={{ uri: imageUrl }}
                style={{ width: screen.width,height:200 }}
                resizeModel='contain'
              />

              <View>
                  <Paragraph numberOfLines={0} style={{marginTop: 10}}>
                      { info.txt }
                  </Paragraph>
              </View>
          </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 5,
        borderColor: 'white',
        // borderColor: color.border,
        backgroundColor: 'white',
    },
    icon: {
        width: screen.width,
    },
});
