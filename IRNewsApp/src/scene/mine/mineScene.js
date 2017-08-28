/**
 * Created by qiaoqiao on 2017/7/28.
 */
//import libary
import React, { Component } from 'react';
import { View,
         Text,
         StyleSheet,
         ScrollView,
         TouchableOpacity,
         PixelRatio,
         ListView,
         Image,
       } from 'react-native';

import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker';

import {  Container,
          Header,
          Content,
          List,
          ListItem,
          Left,
          Body,
          Right,
          Switch,
          Icon,
          Thumbnail,
          Toast,
          Root
        } from 'native-base';


function clearLocalNewsData(){
  storage.clearMapForKey('news');
}
export default class MineScene extends Component {
  constructor(props){
      super(props)

      this.state = {
        avatarSource: null,
      };
  }

  /*
  * 图片选择
  */
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.saveLocalIcon(response.data)
        console.log("侃侃人"+source);
        this.setState({
          avatarSource: source
        });
      }
    });
  }

  // 保存选中的头像
  saveLocalIcon(userIcon){
    storage.save({
        key    : "userIcon",
        id     : userIcon,
        expires: null,
        data   : userIcon
    });

  }
  // 获取选中的头像
  getLocalIcon(){
    storage.getIdsForKey('userIcon').then(ids => {
      this.setState({
          avatarSource: { uri: 'data:image/jpeg;base64,' + ids },
      })
    });
  }
  componentDidMount() {
    this.getLocalIcon();
  }

  render() {
     return (
        <Root>
       <Container>
         <Header style={{height: 10}}/>
         <Content>
           <List>

             <ListItem avatar style={styles.cell}>
                <Left>

                  <TouchableOpacity
                                  onPress={this.selectPhotoTapped.bind(this)}
                                  >
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                    { this.state.avatarSource === null ? <Text>请选择头像照片</Text> :
                      <Thumbnail style={styles.avatared} source={this.state.avatarSource} />
                    }
                    </View>

                  </TouchableOpacity>
                </Left>
                <Body>
                  <Text style={{fontWeight:'bold'}}>Irena</Text>
                  <Text note>Stay hungry. Stay foolish.」</Text>
                </Body>
                </ListItem>


             <ListItem icon>
               <Left>
                 <Icon name="paw" />
               </Left>
               <Body>
                 <TouchableOpacity
                             onPress={()=>{
                               clearLocalNewsData();
                               Toast.show({
                                 text: '历史记录已清除',
                                 position: 'bottom',
                                 buttonText: '确定'
                               })
                           }}>
                   <Text>清除历史记录</Text>
               </TouchableOpacity>

               </Body>
               <Right>
                 <Icon name="arrow-forward" />
               </Right>
             </ListItem>

           </List>
         </Content>
       </Container>
     </Root>
     );
   }
 }
 //define your styles
 const styles = StyleSheet.create({
   cell: {
     paddingLeft: 10,
     paddingRight: 10,
     paddingTop: 10,
   },
   avatarContainer: {
     borderColor: '#9B9B9B',
     borderWidth: 1 / PixelRatio.get(),
     justifyContent: 'center',
     alignItems: 'center'
   },
   avatar: {
     borderRadius: 75,
     width: 80,
     height: 80
   },
   avatared: {
     borderRadius: 40,
     width: 80,
     height: 80
   }

 });
