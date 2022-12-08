import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical:40,
    backgroundColor:"#FFFFFF"
  },

  title: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 34,
    color: '#000000',
    lineHeight: 51,
    textAlign: 'center',
  },
  // head:{
  //   width:215,
  //   display:'flex',
  //   justifyContent:'center',
  //   flexDirection:'column',
  //   alignItems:'center'
  // },
  wellcom: {
    marginTop:8,
    paddingHorizontal:50,
    textAlign: 'center',
  },
  otp:{
    marginTop:48,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  boxOtp:{
    width: 67,
    height: 70,
    borderRadius: 15,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderColor: '#E8E6EA',
    borderWidth: 1,
    borderRadius: 10
  },

  boxOtpActive:{
    backgroundColor: '#E94057',
  },

  boxOtpPending:{
    backgroundColor: '#FFFFFF',
    borderColor: '#E94057'
  },

  textOtp:{
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 34,
    textAlign: 'center',
    color: '#E8E6EA',
  },
  textOtpActive:{
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 34,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  numbers:{
    marginTop:64,
    display:'flex',
    flexDirection:'row',
    width: Dimensions.get('screen').width,
    margin:-40
  },
  numberBox:{
    marginBottom:24,
    width:  (Dimensions.get('screen').width)/3,
    height:36,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'

  },
  numberText:{
    fontSize:24
  },
  
  error: {
    color: colors.error,
    textAlign: 'center',
  },
  sendAgainTextW:{
    position: 'absolute',
    bottom: 64,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    
  },
  sendAgainText:{
    textAlign:'center',
    // width: (Dimensions.get('screen').width)+80,
    color:'#ccc',
    fontFamily: 'Sk-Modernist-Bold',
    fontSize:16
  },
  sendAgainTextActive:{
    textAlign:'center',
    // width: (Dimensions.get('screen').width)+80,
    color:'#E94057',
    fontFamily: 'Sk-Modernist-Bold',
    fontSize:16
  },
  emailText:{
    marginTop:10,
    textAlign:'center',
    width: (Dimensions.get('screen').width),
    color:'#ccc',
    fontSize:14
  }
});
