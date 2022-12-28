import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';

export const styles = StyleSheet.create({
  messageContent: {
    flexDirection: 'column-reverse',
  },

  leftMessage: {
    color: colors.black,
    fontSize: 15,
  },
  rightMessage: {
    color: colors.colorMessage,
    fontSize: 15,
  },
  leftMessageWapper: {
    backgroundColor: '#FDF2F3',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginLeft: 40,
    maxWidth: 280,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    margin: 2,
    alignSelf: 'flex-start',
    elevation: 0.5,
    minWidth: 50,
  },
  rightMessageWapper: {
    backgroundColor: colors.bgRightMess,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 2,
    marginRight: 10,
    maxWidth: 290,
    minWidth: 50,
    borderRadius: 10,
    alignSelf: 'flex-end',
    elevation: 0.5,
  },

  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },

  avatar: {
    marginLeft: 5,
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: -35,
  },
  messageName: {
    marginLeft: 40,
    opacity: 0.5,
  },
  time: {
    color: colors.black,
    fontSize: 10,
    opacity: 0.5,
  },
  infoMessageWapper: {
    height:200,
    alignItems: 'center',
    margin:'auto'
  },
  infoMessage: {
    color: '#ADA2FF',
  },

  leftIMGMessageWapper: {
    padding: 5,
    alignSelf: 'flex-start',
    elevation: 0.5,
    marginLeft: 40,
  },
  rightIMGMessageWapper: {
    padding: 5,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  oneImage: {
    width: 180,
    height: 280,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  multiImage: {
    width: 95,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
    margin: 2,
  },
  modal: {
    backgroundColor: 'white',
    width: '80%',
    paddingVertical: 30,
    backgroundColor: colors.white,
    borderRadius: 5,
    left: '10%',
    right: '10%',
    marginVertical: 130,
    opacity: 1,
    elevation: 5,
  },
  messageAction: {
    fontSize: 16,
    color: colors.black,
    paddingVertical: 15,
    paddingLeft: 20,
  },
});
