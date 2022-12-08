import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RootNavigation from './src/routes';
import {Provider as ReduxProvider} from 'react-redux';
import store from './src/store';
import Socket from './src/socketio/Socket';
import { PermissionsAndroid } from 'react-native';
const App = () => {
  const permision =()=>{
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)    
   }  

   useEffect(()=>{
    permision();
   },[]);

  return (
    <ReduxProvider store={store}>
      <Socket />
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <View style={styles.container}>
          <RootNavigation />
        </View>
      </SafeAreaView>
    </ReduxProvider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
