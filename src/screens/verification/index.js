import React, { useEffect, useState,useRef } from 'react';
import {
  FlatList, Text, TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconcancelNumber } from '../../theme/icons.js';
import { styles } from './style.js';
import axiosConfig from './../../axiosConfig';
import { ScreenNames } from '../../routes/screen.js';
import { savaAuth } from '../../store/reducers/authSlice.js';
import { getData, storeData } from '../../helper.js';
import {useDispatch, useSelector} from 'react-redux';

const numbers=[1,2,3,4,5,6,7,8,9,'',0,<IconcancelNumber/>]


const Verification = props => {
  const verifyCode= useRef();
const authState = useSelector(state => state.auth);
const dispatch = useDispatch();
 const [OTP, setOTP] = useState(['x','x','x','x'])
 const [err, setErr] = useState()
 const [countDown, setCountDown] = useState(99);
  useEffect(()=>{
    if(countDown==0){
      return;
    }
    const count= setTimeout(()=>
      setCountDown(pre=>`0${pre-1}`.slice(-2))
    ,1000)
    return ()=>{
      clearTimeout(count);
    };
  },[countDown])
 const handleClickNumber=(item)=>{
  if(typeof item !='number'){
    const tmp = OTP.slice().reverse();
    const index= tmp.findIndex(i=>i!='x');
    tmp[index]='x';
    setOTP(tmp.reverse());
    return; 
  }
 
  const tmp = OTP.slice();
  const index= tmp.findIndex(i=>i=='x');
  tmp[index]=item;
  setOTP(tmp);
 
 }

 useEffect(() => {
  if (authState.data !== null) {
    if(authState?.data?.active){
      props.navigation.navigate(ScreenNames.CardScreen);
    }
  }
}, [authState]);


 const updateActiveUser=async ()=>{
  try {
    const res = await axiosConfig.post('/users/active', {
        _id:props?.route?.params?.authState?.data?._id 
    })
   if(!!res){
    const {token, user: data} = res.data;
    const newStoreData = {token, data};
    const state= await getData();
    console.log({state});
    state.data.active=true;
    console.log({state});
    dispatch(savaAuth(state));
    storeData(state);
    props.navigation.navigate(ScreenNames.CardScreen);
   }
  } catch (error) {
    console.log({error});
  }
 }
 useEffect(()=>{
  const index= OTP.findIndex(i=>i=='x');
  if(OTP.length>=4 && index<0){
    console.log({index});
    console.log({OTP});
    if(OTP.join('')==props?.route?.params?.verifyCode|| OTP.join('')==verifyCode.current && countDown>0){
      updateActiveUser();
    }else{
      console.log("=xxxxxxxx==");
      setOTP(['x','x','x','x']);
      setErr('Mã xác nhận không đúng!')
    }

  }
 },[OTP]);
  const ItemNumber=({item})=>{
    return (
      <TouchableOpacity onPress={()=>handleClickNumber(item)} style={item!==0? styles.numberBox:styles.numberBox}>
        <Text style={styles.numberText}>{item}</Text>
      </TouchableOpacity>
    )
  }

  const sendOTPAgain=async()=>{
    // gửi email xac minh
    verifyCode.current= Math.floor(Math.random() * 10000);
    try {
      const res = await axiosConfig.post('/send-mail', {
        email:props?.route?.params?.authState?.data?.email , content:`Mã xác minh ứng dụng của bạn là ${verifyCode.current}`
      });
      if (res) {
        setCountDown(99);
      }
    } catch (error) {
      console.log({error});
      
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>00:{countDown}</Text>
        <Text style={styles.wellcom}>Nhập mã xác minh mà chúng tôi đã gửi cho bạn</Text>
      </View>
      <View style={styles.otp}>
        {
          OTP.map((i, index)=>{
            return (
              <View style={[styles.boxOtp, i!='x' ? styles.boxOtpActive:( OTP.filter(i=>i!='x').length==index && styles.boxOtpPending) ]}>
                <Text style={[styles.textOtp, i!='x' && styles.textOtpActive]}>{i=='x'?'0':i}</Text>
              </View>
            )
          })
        }
       
      </View>

      <View style={{marginTop:20}}>
      {err && 
        <Text style={styles.error}>{err}</Text>
        }
      </View>
      <View style={styles.numbers}>
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            data={numbers}
            renderItem={ItemNumber}
            keyExtractor={item =>item}
            numColumns={3}
            // ListFooterComponent={renderLoader}
            // onEndReached={loadMoreItem}
            onEndReachedThreshold={5}
            // ref={flatList}
          />
      </View>
      <View style={styles.sendAgainTextW}>
        <TouchableOpacity  onPress={sendOTPAgain}  >
          <Text style={countDown>0 ? styles.sendAgainText:styles.sendAgainTextActive}>Gửi lại mã</Text>
        </TouchableOpacity>
        <Text style={styles.emailText} >{ props?.route?.params?.authState?.data?.email}</Text>
      </View>
    </SafeAreaView> 
  )
};

export default Verification;
