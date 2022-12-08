import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenNames} from '../../routes/screen';
import {savaAuth} from '../../store/reducers/authSlice';
import Button from '../card/components/Button';
import axiosConfig from './../../axiosConfig';
import {
  getDeviceToken,
  isValidDate,
  isValidPhone,
  storeData,
} from './../../helper';
import {styles} from './style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Register = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const authState = useSelector(state => state.auth);
  const mounted = useRef(true);
  const [gender, setGender] = useState('female');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [yearBirth, setYearBirth] = useState();
  const [dateBirth, setDateBirth] = useState();
  const [monthBirth, setMonthBirth] = useState();
  const [loadingNow, setLoadingNow] = useState(false);
  const verifyCode= useRef();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (authState.data !== null) {
      if(authState?.active){
        props.navigation.navigate(ScreenNames.CardScreen);
      }else{
        props.navigation.navigate(ScreenNames.Verification,{authState, verifyCode:verifyCode.current});
      }
    }
  }, [authState]);

  const handleSubmit = async () => {
    const checkDate = isValidDate(dateOfBirth);
    const checkPhone = isValidPhone(phone);
    if (username == '' || password == '' || email == '') {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (password != rePassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    if (!yearBirth) {
      setError('Ngày sinh không hợp lệ');
      return;
    }

    setLoadingNow(true);
     // gửi email xac minh
    verifyCode.current= Math.floor(Math.random() * 10000);
     try {
      const res = await axiosConfig.post('/send-mail', {
        email, content:`Mã xác minh ứng dụng của bạn là ${verifyCode.current}`
      });
      console.log(res);
      if (res) {
        
      }
    } catch (error) {
      
    }

    try {
      if (mounted.current) setLoading(true);
      const deviceToken = await getDeviceToken();
      const res = await axiosConfig.post('/users', {
        email,
        username,
        // dateOfBirth: new Date(dateOfBirth).getTime(),
        // phone,
        password,
        deviceToken,
        yearBirth,
        dateBirth,
        monthBirth,
        gender,
        verifyCode:verifyCode.current,
      });
      if (res) {
        setLoadingNow(false);
        console.log({res});
        const {token, user: data} = res.data;
        const newStoreData = {token, data};
        dispatch(savaAuth(newStoreData));
        storeData(newStoreData);
        setLoading(false);
        // if(authState?.data?.active){
        //   props.navigation.navigate(ScreenNames.CardScreen);
        // }else{
        //   props.navigation.navigate(ScreenNames.Verification);
        // }
      } else {
        setLoading(false);
        setError(res.data?.message);
      }
    } catch (error) {
      setLoadingNow(false);
      setLoading(false);
      setError(error?.message);
    }

   
  };

  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setYearBirth(+new Date(date).getFullYear());
    setDateBirth(+new Date(date).getDate());
    setMonthBirth(+new Date(date).getMonth() + 1);
    hideDatePicker();
  };

  console.log('isDatePickerVisible');
  console.log(isDatePickerVisible);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=>Keyboard.dismiss()} style={{flex:1,paddingHorizontal: 40}}>
      <KeyboardAvoidingView>
        <View style={styles.logo}>
          <Text style={styles.title}>Dating App</Text>
          <Text style={styles.wellcom}>Wellcom to app</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={txt => setEmail(txt)}
          />
          <TextInput
            placeholder="Tên tài khoản"
            style={styles.input}
            onChangeText={txt => setUsername(txt)}
          />
          {/* <TextInput
            placeholder="Ngày sinh: 01/01/2000"
            style={styles.input}
            onChangeText={txt => setDateOfBirth(txt)}
          /> */}
          {/* <TextInput
            placeholder="Số điện thoại"
            style={styles.input}
            onChangeText={txt => setPhone(txt)}
          /> */}
          <TextInput
            placeholder="Mật khẩu"
            style={styles.input}
            onChangeText={txt => setPassword(txt)}
            value={password}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Nhập lại mật khẩu"
            style={styles.input}
            onChangeText={txt => setRePassword(txt)}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.datePicker} onPress={()=>{
            Keyboard.dismiss();
            showDatePicker();
          } }>
            {/* <TextInput
              placeholder="Ngày sinh"
              style={styles.input}
              // onChangeText={txt => {}}
            /> */}
            <Text>
              {yearBirth
                ? `${dateBirth}/${monthBirth}/${yearBirth}`
                : 'Ngày sinh'}
            </Text> 
          </TouchableOpacity>

          <View style={styles.interestedInBox}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                setGender('female');
              }}>
              <Text
                style={[
                  styles.boxTxt,
                  gender === 'female' && styles.boxSelected,
                ]}>
                {' '}
                Girls
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                setGender('male');
              }}>
              <Text
                style={[
                  styles.boxTxt,
                  gender === 'male' && styles.boxSelected,
                ]}>
                {' '}
                Boys
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                setGender('');
              }}>
              <Text
                style={[styles.boxTxt, gender === '' && styles.boxSelected]}>
                {' '}
                other
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.error}>{error}</Text>
          <Button
            lable="Continue"
            onPress={handleSubmit}
            style={{marginTop: 30}}
            loading={loading||loadingNow}
          />
          <View style={styles.title2}>
            <Text>Đã có tài khoản? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.link}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
          {/* <Otp/> */}
        </View>
      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date('2010-12-28')}
      />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;
