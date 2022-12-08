import React from 'react';
import {ImageBackground, StatusBar, TouchableOpacity, View} from 'react-native';
import {IconBack} from '../../theme/icons';
import * as Animatable from 'react-native-animatable';
const Showimage = props => {
  // const uri = props.route.params.uri.replace('ac_none,c_pad,h_600,w_600','')
  const uri = props.route.params.uri;
  return (
    <Animatable.View
      animation="fadeIn"
      duration={2000}
      style={{backgroundColor: 'black', flex: 1}}
    >
      <View style={{backgroundColor: 'black', flex: 1}}>
        <TouchableOpacity
          style={{marginRight: 10, marginLeft: 10}}
          onPress={() => props.navigation.goBack()}>
          <IconBack />
        </TouchableOpacity>
        <StatusBar hidden />
        <ImageBackground
          source={{uri: uri}}
          style={{
            flex: 1,
            width: '100%',
            // height: '100%',
          }}
          resizeMode="contain"
        />
      </View>
    </Animatable.View>
  );
};

export default Showimage;
