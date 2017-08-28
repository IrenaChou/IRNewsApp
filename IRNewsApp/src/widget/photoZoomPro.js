import React, { Component,PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    Dimensions,
    StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from "react-native-button";
import screen from  '../common/screen'

var {
  height: deviceHeight
} = Dimensions.get("window");

export default class PhotoZoomPro extends Component{
  constructor(props){
      super (props);

      this.state = {
          offset: new Animated.Value(-deviceHeight)
      };
  }
  componentDidMount() {
      Animated.timing(this.state.offset, {
          duration: 150,
          toValue: 0
      }).start();
  }
  closeModal() {
      Animated.timing(this.state.offset, {
          duration: 150,
          toValue: -deviceHeight
      }).start(Actions.pop);
  }
  render(){
    let { info } = this.props

    return(
      <Animated.View style={[styles.container, {backgroundColor:"rgba(52,52,52,1)"},
                            {transform: [{translateY: this.state.offset}]},
                            {top: -20}]}>
        <StatusBar
             backgroundColor="rgba(52,52,52,1)"
             barStyle="light-content"
            //  hidden={true}
           />
          <ScrollView
          contentContainerStyle={styles.contentContainer}
          horizontal={true}
          keyboardDismissMode='on-drag'
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          >
            <Image
              source={{ uri: info.imgurl==''?'http://img.99danji.com/uploadfile/2017/0725/20170725102033300.jpg':info.imgurl }}
              style={{ height:screen.height-20,width: '100%' }} />
          </ScrollView>
          <Button style={{height: 20,color: 'white'}} onPress={this.closeModal.bind(this)}>See you next time!</Button>
      </Animated.View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  contentContainer: {
    width: 1000,
    height: screen.height + 5,
    paddingVertical: 0,
    backgroundColor:"rgba(52,52,52,0.5)",
  }
});
