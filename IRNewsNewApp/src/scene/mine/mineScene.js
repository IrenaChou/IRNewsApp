/**
 * Created by qiaoqiao on 2017/7/28.
 */
//import libary
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    PixelRatio,
    StatusBar,
    Platform,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import {  Container,
          Header,
          Content,
          List,
          ListItem,
          Left,
          Body,
          Right,
          Icon,
          Thumbnail,
          Toast,
          Root
        } from 'native-base';

/*
* 清除本地缓存数据
* */
function clearLocalNewsData(){
  storage.clearMapForKey('news');
}
export default class MineScene extends Component {

  constructor(props){
      super(props);

      this.state = {
        avatarSource: null,
      };
  }

  /*
  * 图片选择
  */
  selectPhotoTapped() {
    const options = {
      quality       : 1.0,
      maxWidth      : 500,
      maxHeight     : 500,
      storageOptions: {
        skipBackup  : true
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

        this.saveLocalIcon(response.data);

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  /*
  * 保存选中的头像
  * */
  saveLocalIcon(userIcon){
    storage.save({
        key    : "userIcon",
        id     : userIcon,
        expires: null,
        data   : userIcon
    });

  }
  /*
  * 获取选中的头像
  * */
  getLocalIcon(){
    storage.getIdsForKey('userIcon').then(ids => {

        if (ids.length >= 1){
            this.setState({
                avatarSource: { uri: 'data:image/jpeg;base64,' + ids },
            })
        }else{
            this.setState({
                avatarSource: { uri: "http://7xrirn.com1.z0.glb.clouddn.com/blogblog_icon.png" },
            })
        }
    });
  }
  componentDidMount() {
    this.getLocalIcon();
  }

  render() {
      var statusBar;
      if (Platform.OS==='ios') {
          statusBar = (
              <StatusBar
                  barStyle="light-content"
                  animated={true}
              />
          );
      }
     return (
         <Root>
             <Container>
                 <Header style={{height: 10}}/>
                 <Content>
                     <List>
                         {statusBar}
                         <ListItem avatar style={styles.cell}>
                             <Left>

                                 <TouchableOpacity
                                     onPress={this.selectPhotoTapped.bind(this)}
                                 >
                                     <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                                         { this.state.avatarSource === null
                                             ? <Text>请选择头像照片</Text>
                                             : <Thumbnail style={styles.avatared}
                                                          source={this.state.avatarSource}/>
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
                                         text       : '历史记录已清除',
                                         position   : 'bottom',
                                         buttonText : '确定'
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
     paddingLeft    : 10,
     paddingRight   : 10,
     paddingTop     : 10,
   },
   avatarContainer: {
     borderColor    : '#9B9B9B',
     borderWidth    : 1 / PixelRatio.get(),
     justifyContent : 'center',
     alignItems     : 'center'
   },
   avatar: {
     borderRadius   : 75,
     width          : 80,
     height         : 80
   },
   avatared: {
     borderRadius   : 40,
     width          : 80,
     height         : 80
   }

 });
