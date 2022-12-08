import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {colors} from '../../../theme/colors';
import {IconAdd} from '../../../theme/icons';

export default function Avatar({onPress, url, size}) {
  return (
    <TouchableOpacity
      style={
        url ? styles.avatarBox : {...styles.avatarBox, borderColor: '#bbb'}
      }
      onPress={onPress}>
      {url ? (
        <Image
          source={{uri: url}}
          style={[styles.avatar, {width: size, height: size}]}
        />
      ) : (
        <View style={{padding: 18}}>
          <IconAdd />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarBox: {
    borderWidth: 1,
    borderColor: colors.c_E94057,
    borderRadius: 33,
    alignSelf: 'flex-start',
  },
  avatar: {
    borderRadius: 33,
    borderWidth: 1,
    borderColor: colors.c_ffff,
  },
});
