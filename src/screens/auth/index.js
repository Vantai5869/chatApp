import { useIsFocused } from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {navigationRef} from '../../routes/navigate';
import {ScreenNames} from '../../routes/screen';
import {getAuth, savaAuth} from '../../store/reducers/authSlice';
import Button from '../card/components/Button';
import axiosConfig from './../../axiosConfig';
import {storeData, getDeviceToken} from './../../helper';
import {styles} from './style.js';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const authState = useSelector(state => state.auth);
  const isFocus= useIsFocused();
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (authState.data !== null) {
      console.log({kkkk:authState});
      if(!authState?.data?.active){
        props.navigation.navigate(ScreenNames.Verification,{authState});
      }else{
        props.navigation.navigate(ScreenNames.CardScreen);
      }
    }
  }, [authState, isFocus]);

   

  const handleSubmit = async () => {
    if (email == '' || password == '') {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    try {
      if (mounted.current) setLoading(true);
      const deviceToken = await getDeviceToken();
      const res = await axiosConfig.post('/users/login', {
        email,
        phone: email,
        password: password,
      });
      console.log('login respon:');
      console.log(res);
      if (res) {
        setLoading(false);
        // axiosConfig.put(`/users/${res.data._id}`,{deviceToken:deviceToken});
        const {token, user: data} = res.data;
        const newStoreData = {token, data};
        dispatch(savaAuth(newStoreData));
        storeData(newStoreData);
        // console.log({xxxxxxxxxx:newStoreData});
        // return;
        // props.navigation.navigate(ScreenNames.CardScreen);
      } else {
        setLoading(false);
        setError('Thông tin đăng nhập không đúng!');
      }
    } catch (error) {
      setLoading(false);
      setError('Thông tin đăng nhập không đúng!');
    }
  };

  useEffect(() => {
    dispatch(getAuth());
  }, []);

  if (authState.data !== null) {
    return <></>
   }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.title}>Dating App</Text>
        <Text style={styles.wellcom}>welcome back</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={txt => setEmail(txt)}
        />
        <TextInput
          placeholder="Mật khẩu..."
          style={styles.input}
          onChangeText={txt => setPassword(txt)}
          secureTextEntry={true}
        />
        <Text style={styles.error}>{error}</Text>
        {/* {loading ? (
            <View style={styles.loaderStyle}>
              <ActivityIndicator size="large" color="#aaa" />
            </View>
          ) : (
            <Text style={styles.btnSubmit}>Đăng nhập</Text>
          )} */}
        <Button
          lable="Login"
          onPress={handleSubmit}
          style={{marginTop: 40}}
          loading={loading}
        />
        <View style={styles.title2}>
          <Text>Chưa có tài khoản? </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate(ScreenNames.Register)}>
            <Text style={styles.link}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
