import React from 'react';
import {useEffect} from 'react';
// import IncomingCall from 'react-native-incoming-call';
import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import {rootURL} from '../config';
import { decryptData } from '../helper/aes';
import { navigationRef } from '../routes/navigate';
import { ScreenNames } from '../routes/screen';
import {addMessageTmp, deleteMessage} from '../store/reducers/conversationSlice';
import {
  makeUserToTopList,
  updateUserList,
} from '../store/reducers/userListSlice';
export const socket = io(rootURL);

const Socket = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  console.log(authState);
  socket.on('connect', () => {
    console.log(socket.id);
  });
  useEffect(() => {
    const socketOn = () => {
      socket.on('disconnect', () => {
        console.log(socket.id);
      });

      socket.on('getMessage', data => {
        const dataTmp = {...data, readBy: [1]};
        if(dataTmp?.userId?._id!==authState?.data?._id){
          dispatch(addMessageTmp(dataTmp));
        }
        dispatch(makeUserToTopList(dataTmp));
      });

      socket.on('DeleteMessage',  data => {
       
       dispatch(deleteMessage(data));
      
      });

      socket.on('SEEN', data => {
        const dataTmp = {...data, readBy: []};
        if (data?.seenerId === authState?.data?._id)
          dispatch(updateUserList(dataTmp));
      });

      socket.on('ping', data => {
        // RootNavigation.navigate('Call')
        console.log('======================Ping===============');
      });

      socket.on('call', data => {
        const inFo = {...data, meId:authState?.data?._id};
        navigationRef.navigate(ScreenNames.Call, inFo);
        // if (inFo.userId._id == authState.data._id) {
        //   RootNavigation.navigate('Call', inFo);
        // } else {
        //   IncomingCall.display(
        //     'callUUIDv4', // Call UUID v4
        //     inFo.userId.username, // Username
        //     inFo.userId.avatar, // Avatar URL
        //     'Đang gọi', // Info text
        //     20000, // Timeout for end call after 20s
        //   );
        // }

        console.log('==============================++++++++++++++++++++++++++');
        console.log(data);

        // PushNotification.localNotification({
        //   channelId: 'test-channel',
        //   title: 'dfasdf sàdsadfsa',
        //   message: 'fsfg'
        // })
        // RootNavigation.navigate('IncomingCall', data)

        // RootNavigation.navigate('IncomingCall', data)
      });
    };
    socketOn();

    return () => {  
      socket.off('disconnect');
      socket.off('getMessage');
      socket.off('ping');
      socket.off('call');
    };
  }, [authState]);

  return <></>;
};

export default Socket;
