import { useIsFocused } from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenNames} from '../../routes/screen';
import {socket} from '../../socketio/Socket';
import {getAuth} from '../../store/reducers/authSlice';
import {colors} from '../../theme/colors';
import Main from './components/Main';

export default function CardScreen(props) {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const isFocus= useIsFocused();
  console.log({authState});
  useEffect(() => {
    dispatch(getAuth());
  }, []);
  console.log('Cards');

  useEffect(() => {
    if ((authState.data == null && authState.loading == false) || !authState?.data?.active) {
      props.navigation.navigate(ScreenNames.Login);
    } else if (authState.data != null) {
      socket.emit('JOIN_ROOM', authState.data._id);
    }
  }, [authState, isFocus]);

  if ((authState.data == null && authState.loading == false) || !authState?.data?.active) {
    console.log("ao ma---------------------"+authState?.active);
    props.navigation.navigate(ScreenNames.Login);
    return <View>
      <Text></Text>
    </View>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Main props={props} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffff,
  },
});
