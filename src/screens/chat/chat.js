import BottomSheet from '@gorhom/bottom-sheet';
import { useCameraRoll } from "@react-native-camera-roll/camera-roll";
import ObjectID from 'bson-objectid';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Keyboard, PermissionsAndroid, StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { showRoomName } from '../../helper';
import { imageUpload } from '../../helper/imageUpload';
import { socket } from '../../socketio/Socket';
import {
  addMessageTmp,
  fetchConversation
} from '../../store/reducers/conversationSlice';
import {
  addNewUser,
  makeUserToTopList
} from '../../store/reducers/userListSlice';
import { colors } from '../../theme/colors';
import {
  IconBack,
  IconChecked, IconImgPicker, IconMore,
  IconSend, IconUncheck
} from '../../theme/icons';
import Avatar from '../card/components/Avatar';
import MessageDisplay from './MessageDisplay/MessageDisplay';
// import BottomSheet from './BottomSheet';
import { FlatList as FlastListBottomSheet, GestureHandlerRootView } from 'react-native-gesture-handler';

const ChatScreen = props => {
  const [photos, getPhotos, save] = useCameraRoll();
  const dispatch = useDispatch();
  const room = props?.route?.params?.room;
  const flatList = useRef();
  const isFirtTime = useRef(true);
  const [messageContent, setMessageContent] = useState('');
  const [imgsSelected, setImgsSelected] = useState([]);
  const [isShowBottonSheet, setIsShowBottonSheet] = useState(false);
  const [isActiveBootomSheet, setIsActiveBootomSheet] = useState(true);
  const [imgsPrepare, setImgsPrepare] = useState([]);
  const conversationState = useSelector(state => state.conversationList);
  const me = useSelector(state => state.auth.data);
  const checkExitConversation = conversationState.conversations.find(
    conversation => conversation._id == props.route.params.room._id,
  );

  const permision =()=>{
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)    
   }  

   useEffect(()=>{
    permision();
   },[]);


   // ref
   const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleShowBottonSheet = useCallback(() => {
    permision();
    setIsShowBottonSheet(true);
    console.log({xxxxxx:bottomSheetRef.current});
    bottomSheetRef.current?.snapToIndex(0);
    setIsActiveBootomSheet(true);
    Keyboard.dismiss();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsActiveBootomSheet(false);
  }, []);

  useEffect(()=>{
    handleClosePress();
    getPhotos();
  },[])

  useEffect(() => {
    if (checkExitConversation?.data.length > 0) isFirtTime.current = false;
  }, [checkExitConversation]);

  useEffect(() => {
    if (!checkExitConversation)
      dispatch(
        fetchConversation({roomId: props.route.params.room._id + '', page: 0}),
      );
  }, []);
  const renderLoader = () => {
    return conversationState.loading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  const loadMoreItem = () => {
    if (!conversationState.loading && checkExitConversation.hasMore) {
      dispatch(
        fetchConversation({
          roomId: props.route.params.room._id + '',
          page: checkExitConversation.nextPage + 1,
        }),
      );
    }
  };

  const addCustomMessage = async messData => {
    if (props.route.params.room?._id) {
      let data = {
        _id: new ObjectID().toString(),
        userId: {
          _id: me._id,
          username: me.username,
          avatar: me.avatar,
        },
        roomId: props.route.params.room._id,
        content: messData.content,
        type: messData.type,
        readBy: [1],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      if (props.route.params.room.userId && isFirtTime.current) {
        isFirtTime.current = false;
        data = {...data, userIds: [...props.route.params.room.userId, me._id]};
        dispatch(
          addNewUser({
            _id: props.route.params.room._id,
            avatar: [props.route.params.room.avatar[0]],
            content: messData.content,
            name: props.route.params.room.name,
            userId: {
              _id: me._id,
              username: me.username,
            },
            updatedAt: Date.now(),
            readBy: [1],
          }),
        );
      }
      socket.emit('sendMessage', data);
      setTimeout(() => {
        if(messData.type!=='image' || messData?.tmp)
        dispatch(addMessageTmp(data));
        dispatch(makeUserToTopList(data));
        try {
          flatList.current.scrollToIndex({index: 0});
        } catch (error) {
          
        }
      }, 0);
    } else {
    }
  };

  const handleSendMessage =async () => {
    handleClosePress();
    // if (imgsPrepare.length>0) {
    //   addCustomMessage({content: imgsPrepare[0], type: 'image'});
    //   return; 
    // }
    if(imgsSelected.length>0){
     imgsSelected.forEach( async(i)=>{
      addCustomMessage({content: i, type: 'image', tmp:true});
           try {
            const res = await imageUpload([{uri:i, 
              name: "1", type: "image/jpeg",
            }]);

            if(res){
              addCustomMessage({content:res[0].url, type: 'image'});
            }
            // const arr = [];
            // for (var i = 0; i < res.length; i++) {
            //   arr.push(res[i].url);
            // }
            // setImgsPrepare(arr);

          } catch (error) {
            console.log({'00000':error});
          }
      })
      setImgsSelected([])
      return;
    }

 


    setMessageContent('');
    if (messageContent !== '')
      addCustomMessage({content: messageContent, type: 'message'});
  };

  

  const renderItem = ({item, index}) => {
    return <MessageDisplay onHandlePress={handleClosePress} item={item} me={me} index={index} props={props} />;
  };

  useEffect(() => {
    if (props.route.params?.room?._id)
      socket.emit('SEEN', {
        roomId: props.route.params?.room?._id,
        seenerId: me._id,
      });
  }, [checkExitConversation]);

  const handleSelectDocument = async type => {
    let typeDoc = DocumentPicker.types.images;
    switch (type) {
      case 'image': {
        typeDoc = DocumentPicker.types.images;
        break;
      }
      case 'video': {
        typeDoc = DocumentPicker.types.video;
        break;
      }

      default:
        typeDoc = DocumentPicker.types.images;
    }
    try {
      const images = await DocumentPicker.pickMultiple({
        type: typeDoc,
      });
      console.log({images});
      return;
      const res = await imageUpload([images[0]]);
      const arr = [];
      for (var i = 0; i < res.length; i++) {
        arr.push(res[i].url);
      }

      if (arr[0]) {
        console.log('res..........................');
        console.log(res);
        addCustomMessage({content: arr[0], type: type});
      }
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  };

  // const ref = useRef(null);

  // const handleShowBottonSheet = useCallback(() => {
  //   const isActive = ref?.current?.isActive();
  //   if (isActive) {
  //     ref?.current?.scrollTo(0);
  //     setIsActiveBootomSheet(false);
  //   } else {
  //     ref?.current?.scrollTo(-200);
  //     setIsActiveBootomSheet(true);
  //   }
  // }, []);

  const handleChecked=async (photos)=>{
    
    if(!imgsSelected.includes(photos?.node?.image?.uri)){
      setImgsSelected(pre=>[...pre, photos?.node?.image?.uri])
    }else{
      const index = imgsSelected.indexOf(photos?.node?.image?.uri);
      if (index > -1) { 
        const tmp = [...imgsSelected];
        tmp.splice(index,1)
        setImgsSelected(tmp)
      }
    }
   
  }

  const ItemPicker=({item:photos, index})=>{
    return (
      <TouchableHighlight 
      style={[styles.itemImg,{opacity: photos?.node?.image?.uri === 1 ? .5 : 1}]}
      onPress={()=>handleChecked(photos)}
      underlayColor='transparent'
    >
      <>
      <Image
        style={{width: Dimensions.get('screen').width / 3, height:  Dimensions.get('screen').width /3}}
        source={{uri: photos?.node?.image?.uri}}
        resizeMode='cover'
      />
      <View style={styles.selectIcon}>
        {
          imgsSelected.includes(photos?.node?.image?.uri)?
          <IconChecked/>:
          <IconUncheck/>

        }
      </View>
      </>
    </TouchableHighlight>
    )
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
     
      <View style={styles.modalView}>
        <View style={styles.modalTop}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => props.navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <Avatar
            size={56}
            url={
              room?.avatar
            }
            onPress={() => {}}
          />
          <View style={styles.boxName}>
            <Text style={styles.modalTitle}>
              {showRoomName(props?.route?.params?.room?.name, me.username)
                ?.length < 12
                ? showRoomName(props?.route?.params?.room?.name, me.username)
                : showRoomName(
                    props?.route?.params?.room?.name,
                    me.username,
                  ).substring(0, 12) + '..'}
            </Text>
            <Text style={styles.status}>online</Text>
          </View>
          <TouchableOpacity>
            <IconMore />
            {/* <Text style={styles.clear}>Close</Text> */}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.messenges}
          onPress={handleClosePress}
          // showsVerticalScrollIndicator={false}
        >
          {/* <>
            <View style={styles.leftMess}>
              <Text style={styles.leftTxt}>
                Hi Jake, how are you? I saw on the app that we’ve crossed paths
                several times this week 😄
              </Text>
            </View>
            <Text style={styles.timeMess}>2:55 PM</Text>
          </>
          <>
            <View style={styles.rightMess}>
              <Text style={styles.rightTxt}>
                Haha truly! Nice to meet you Grace! What about a cup of coffee
                today evening? ☕️
              </Text>
            </View>
            <Text style={[styles.timeMess, {textAlign: 'right'}]}>
              3:02 PM <IconDbCheck />
            </Text>
          </>
          */}
           <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={checkExitConversation?.data ?? []}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            // ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={5}
            style={{transform: [{scaleY: -1}]}}
            ref={flatList}
          />
         
        </TouchableOpacity>
        <View style={[styles.inputChatBoxArea, isActiveBootomSheet ?{marginBottom:192}:{marginBottom:0}]}>
          <View style={[styles.inputChatBox]}>
            <TextInput
              style={styles.inputChat}
              placeholder="Type message"
              value={messageContent}
              onFocus={handleClosePress}
              onChangeText={text => setMessageContent(text)}
            />
             {/* <TouchableOpacity onPress={() => handleSelectDocument('image')}> */}
             <TouchableOpacity onPress={handleShowBottonSheet} style={{padding:10}}>
              <IconImgPicker />
            </TouchableOpacity>
          </View>
          {/* <View> */}
          <TouchableOpacity onPress={handleSendMessage} style={styles.iconMic}>
            {/* <IconMic /> */}
            <IconSend />
          </TouchableOpacity>


          {/* </View> */}

          
        </View>

        {
          isShowBottonSheet &&
          
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
        >
           <FlastListBottomSheet
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
            data={photos.edges}
            renderItem={ItemPicker}
            keyExtractor={item => item?.node?.image?.uri}
            numColumns={3}
            // ListFooterComponent={renderLoader}
            // onEndReached={loadMoreItem}
            onEndReachedThreshold={5}
            // ref={flatList}
          />

        </BottomSheet>
        }
       

      </View>
    </View>
    </GestureHandlerRootView>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // padding: 40,
    // height: '90%',
    flex: 1,
    overflow: 'hidden',
  },
  modalTop: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.c_E8E6EA,
  },
  boxName: {
    marginLeft: 10,
    flex: 1,
  },
  modalTitle: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 24,
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
  closeBtn: {
    position: 'absolute',
    top: -20,
    left: Dimensions.get('window').width * 0.5 - 20,
    borderWidth: 5,
    borderColor: colors.c_000_012,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  userMessagesList: {
    paddingBottom: 60,
  },
  messenges: {
    paddingHorizontal: 20,
    marginVertical: 10,
    flex: 1,
  },
  leftMess: {
    maxWidth: Dimensions.get('window').width * 0.7,
    backgroundColor: '#FDF2F3',
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    padding: 16,
    marginTop: 32,
    alignSelf: 'flex-start',
  },
  rightMess: {
    maxWidth: Dimensions.get('window').width * 0.7,
    backgroundColor: '#F3F3F3',
    borderRadius: 15,
    borderBottomRightRadius: 0,
    padding: 16,
    marginTop: 32,
    alignSelf: 'flex-end',
  },
  timeMess: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  inputChatBoxArea: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: colors.c_E8E6EA,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputChatBox: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.c_E8E6EA,
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  inputChat: {
    paddingVertical: 12,
    width: '90%',
  },
  iconMic: {
    padding: 14.8,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.c_E8E6EA,
    marginLeft: 15,
  },
  itemImg:{
    padding:2,
  },
  selectIcon:{
    position:'absolute',
    backgroundColor:'#fff',
    borderRadius:50,
    margin:10
  }
});
