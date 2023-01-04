import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {ScreenNames} from '../../routes/screen';
import {colors} from '../../theme/colors';
import Avatar from '../card/components/Avatar';
import {navigationRef} from './../../routes/navigate';
import {listActivities} from './../messenger/index';

export default function StoryItem({item, props}) {
  const handleClickStory = item => {
    props.navigation.navigate(ScreenNames.Story, {listActivities, item});
  };

  const addStory = () => {
    Alert.alert('Comming son');
  };
  if (item?.create) {
    return (
      <View style={styles.item}>
        <Avatar size={66} url={''} onPress={addStory} />
        {/* <Text style={styles.name}>{item.name.substring(0, 7) + '..'}</Text> */}
      </View>
    );
  }
  return (
    <View style={styles.item}>
      <Avatar
        size={66}
        url={item.avatar[0]}
        onPress={() => handleClickStory(item)}
      />
      {/* <Text style={styles.name}>{item.name.substring(0, 7) + '..'}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginRight: 15,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 14,
    lineHeight: 21,
    color: colors.c_000000,
  },
});
