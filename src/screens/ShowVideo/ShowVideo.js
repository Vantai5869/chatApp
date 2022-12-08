import React from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {Dimensions, Image} from 'react-native';
import Video from 'react-native-video';
import {IconBack} from '../../theme/icons';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const ShowVideo = props => {
  return (
    <View
      style={{
        width: deviceWidth,
        height: deviceHeight,
        flex: 1,
        backgroundColor: 'black',
      }}>
      <TouchableOpacity
        style={{marginRight: 10, marginLeft: 10}}
        onPress={() => props.navigation.goBack()}>
        <IconBack />
      </TouchableOpacity>
      <StatusBar hidden />
      <Video
        source={{uri: props.route.params.uri}}
        pauseOnPress
        style={{flex: 1, height: deviceHeight, width: deviceWidth}}
        fullscreen
        controls
        resizeMode="contain"
      />
    </View>
  );
};

export default ShowVideo;
