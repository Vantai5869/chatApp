import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors} from '../../../theme/colors';
import {IconAdd} from '../../../theme/icons';

export default function Avatar({onPress, url, size}) {

  const renderAvatar=()=>{
    if(url.length==1){
      return  (
        <Image
        source={{uri: url[0]}}
        style={[styles.avatar, {width: size, height: size}]}
      />
      )
    }else if(url.length>1){
      return(
         <View style={styles.avatars}>
          <Image
            source={{uri: url[0]}}
            style={[styles.avatars1, {width: size/1.2, height: size/1.2}]}
          />
          <Image
            source={{uri: url[1]}}
            style={[styles.avatars2, {width: size/1.4, height: size/1.4}]}
          />
        </View>
      )
     
    }
  }
  return (
    <TouchableOpacity
      style={
        url ? styles.avatarBox : {...styles.avatarBox, borderColor: '#bbb'}
      }
      onPress={onPress}>
      {url ?renderAvatar() : (
        <View style={{padding: 18}}>
          <IconAdd />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarBox: {
    // borderWidth: 1,
    // borderColor: colors.c_E94057,
    borderRadius: 33,
    alignSelf: 'flex-start',
  },
  avatar: {
    borderRadius: 33,
    borderWidth: 1,
    borderColor: colors.c_ffff,
  },
  avatars:{
    width:56,
    height:56,
    position:'relative',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: colors.c_ffff,
  },
  avatars1:{
    position:'absolute',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: colors.c_ffff,
  },
  avatars2:{
    position:'absolute',
    left:13,
    top:13,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: colors.c_ffff,
  }
});
