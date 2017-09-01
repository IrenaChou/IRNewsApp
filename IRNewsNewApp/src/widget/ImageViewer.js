import React, { Component } from 'react';
import {
    Modal
} from 'react-native';

import ImageZoomViewer from 'react-native-image-zoom-viewer';

export default class ImageViewer extends Component{

    render() {

        return (
            <Modal visible={true} transparent={true}>
                <ImageZoomViewer imageUrls={[{url: this.props.navigation.state.params.info}]}
                                 onClick  ={(close?:Function)=>{
                                     this.props.navigation.goBack();
                                 }}
                />
            </Modal>
        )
    }
}