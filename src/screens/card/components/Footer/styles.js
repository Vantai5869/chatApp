import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width - 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  fIcon: {
    padding: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.c_6674031a,
  },
});
