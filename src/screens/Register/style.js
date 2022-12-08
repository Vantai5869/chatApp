import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  title: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 34,
    color: '#000000',
    lineHeight: 51,
    textAlign: 'center',
  },
  wellcom: {
    textAlign: 'center',
  },
  input: {
    borderColor: colors.c_E8E6EA,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 14,
    fontSize: 14,
    lineHeight: 21,
  },
  form: {
    marginTop: 32,
  },
  interestedInBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.c_E8E6EA,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 14,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
  },

  boxTxt: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Sk-Modernist-Bold',
    paddingVertical: 18,
    paddingHorizontal: 20,
    width: '100%',
    textAlign: 'center',
    // color:colors.c_ffff,
  },
  boxSelected: {
    color: colors.c_ffff,
    backgroundColor: colors.c_E94057,
  },

  title2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  error: {
    color: colors.error,
    textAlign: 'center',
  },
  link: {
    color: colors.c_E94057,
  },
  error: {
    marginTop: 10,
    color: colors.error,
    textAlign: 'center',
  },
  datePicker: {
    borderColor: colors.c_E8E6EA,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 14,
    fontSize: 14,
    lineHeight: 21,
  },
});
