import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {IconBack} from '../theme/icons';
import {colors} from '../theme/colors';

export default function Back() {
  return (
    <TouchableOpacity style={styles.container}>
      <IconBack />
      <View style={styles.content}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.des}>Gợi ý cho bạn</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    lineHeight: 29,
    fontFamily: 'Sk-Modernist-Bold',
    color: colors.c_000000,
  },
  des: {
    fontSize: 12,
    fontFamily: 'Sk-Modernist-Regular',
    color: colors.c_rgba0007,
  },
});
