import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  cards: {
    flex: 1,
    alignItems: 'center',
  },
  topAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 24,
    zIndex: 99,
  },
  centeredView: {
    backgroundColor: colors.c_000_012,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: colors.c_ffff,
    height: 'auto',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 40,
  },
  modalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 24,
    marginLeft: Dimensions.get('window').width / 2 - 80,
  },
  clear: {
    color: colors.c_E94057,
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 16,
  },
  modalTitles: {
    marginTop: 30,
    marginBottom: 20,
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 16,
  },
  interestedInBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.c_E8E6EA,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
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
});
