import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../../../theme/colors';

export default function Button({
  onPress,
  lable,
  style,
  loading = false,
  ...res
}) {
  return (
    <TouchableOpacity res onPress={onPress} style={[styles.container, style]}>
      {loading ? (
        <ActivityIndicator size="small" color="#aaa" />
      ) : (
        <Text style={styles.lable}>{lable}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_E94057,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 15,
  },
  lable: {
    color: colors.c_ffff,
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
