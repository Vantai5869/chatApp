import React, {memo, useState} from 'react';
import {Image, Text, TouchableOpacity, View, Modal} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import {getTime} from '../../../helper';
import {colors} from '../../../theme/colors';
// import * as RootNavigation from './../../../RootNavigation';
import {styles} from './MessageDisplay.styles';
import {ScreenNames} from '../../../routes/screen';
import { IconCreatedGroup } from '../../../theme/icons';
import { socket } from '../../../socketio/Socket';
import axiosConfig from './../../../axiosConfig'
import { decryptData } from '../../../helper/aes';
let preId = '';
let preUserName = '';
const Messagedisplay = ({item, me, index,onHandlePress,roomId, props}) => {
  const [opentModal, setOpenModal] = useState(false);
  let render;
  const nameMess = preUserName;
  const messOfMe = item.userId._id == me._id;
  let showAvatar = true;
  let showName = true;
  let showTime = true;
  if (preId === item.userId._id) {
    showAvatar = false;
    showName = false;
    showTime = false;
  }
  if (index == 0) {
    showName = false;
    showAvatar = true;
    showTime = true;
  }
  showAvatar = showAvatar && !messOfMe;
  preId = item.userId._id;
  preUserName = item.userId.username;

  const handleLongPress = () => {
    if (messOfMe) setOpenModal(true);
  };

  let content;
  try {
    content = JSON.parse(item.content);
  } catch (error) {
    content = [item.content];
  }
  switch (item.type) {
    case 'message': {
      render = (
        <>
          <View style={showAvatar ? {flexDirection: 'row'} : {}}>
            {showAvatar ? (
              <Image source={{uri: item.userId.avatar}} style={styles.avatar} />
            ) : null}
            <View
              style={
                !messOfMe
                  ? showAvatar
                    ? [styles.leftMessageWapper, {borderBottomLeftRadius: 10}]
                    : [styles.leftMessageWapper, {borderTopLeftRadius: 10}]
                  : styles.rightMessageWapper
              }
              key={item._id}>
              <Text
                style={!messOfMe ? styles.leftMessage : styles.rightMessage}>
                {decryptData(item.content, item.userId._id+roomId) }{' '}
              </Text>
              {showTime && (
                <Text style={styles.time}>{getTime(item.updatedAt)}</Text>
              )}
            </View>
          </View>
        </>
      );
      break;
    }
    case 'video': {
      render = (
        <TouchableOpacity
          onPress={() =>
            // RootNavigation.navigate('ShowVideo', {uri: content[0]})
            {}
          }
          activeOpacity={0.9}>
          <View style={showAvatar ? {flexDirection: 'row'} : {}}>
            {showAvatar ? (
              <Image source={{uri: item.userId.avatar}} style={styles.avatar} />
            ) : null}
            <View
              style={
                !messOfMe
                  ? styles.leftIMGMessageWapper
                  : styles.rightIMGMessageWapper
              }>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 180,
                  height: 280,
                  borderRadius: 5,
                  elevation: 0.5,
                  position: 'relative',
                }}>
                <Video
                  source={{uri: content[0]}}
                  muted={true}
                  paused
                  resizeMode="cover"
                  style={{flex: 1, height: 290, borderRadius: 5}}
                />
                {/* <Icon
                  type={Icons.Feather}
                  name="play-circle"
                  style={{
                    position: 'absolute',
                    color: 'white',
                    top: '43%',
                    left: '40%',
                    fontSize: 35,
                  }}
                /> */}
              </View>
              {showTime && (
                <Text style={styles.time}>{getTime(item.updatedAt)}</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    case 'info': {
      return (
        <View style={[styles.infoMessageWapper, {transform: [{scaleY: -1}]}]}>
          <IconCreatedGroup/>
          <Text style={styles.infoMessage}>{(messOfMe?'B???n':item?.userId?.username)+' '+ item.content} </Text>
         
        </View>
      );
    }
    case 'image': {
      if (content.length == 1)
        render = (
          <View>
            <View style={showAvatar ? {flexDirection: 'row'} : {}}>
              {showAvatar ? (
                <Image
                  source={{uri: item.userId.avatar}}
                  style={styles.avatar}
                />
              ) : null}
              <View
                style={
                  !messOfMe
                    ? styles.leftIMGMessageWapper
                    : styles.rightIMGMessageWapper
                }>
                <TouchableOpacity
                  style={{
                    elevation: 0.5,
                    borderRadius: 5,
                  }}
                  onPress={() =>
                    props.navigation.navigate(ScreenNames.Showimage, {
                      uri: decryptData(content[0], me?._id+props.route.params.room._id) ,
                    })
                  }
                  activeOpacity={0.9}
                  >
                  <Image source={{uri:decryptData(content[0], me?._id+props.route.params.room._id) }} style={styles.oneImage} />
                </TouchableOpacity>
                {showTime && (
                  <Text style={styles.time}>{getTime(item.updatedAt)}</Text>
                )}
              </View>
            </View>
          </View>
        );
      else {
        render = (
          <View style={showAvatar ? {flexDirection: 'row'} : {}}>
            {showAvatar ? (
              <Image source={{uri: item.userId.avatar}} style={styles.avatar} />
            ) : null}
            <View
              style={
                !messOfMe
                  ? styles.leftIMGMessageWapper
                  : styles.rightIMGMessageWapper
              }>
              <View
                style={{
                  width: 200,
                  elevation: 0.5,
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 1,
                  justifyContent: 'space-around',
                  alignSelf: 'flex-start',
                }}>
                {content.map(img => {
                  return (
                    <TouchableOpacity
                      key={img}
                      onPress={() =>
                        RootNavigation.navigate('ShowImage', {uri: img})
                      }
                      activeOpacity={0.9}>
                      <Image source={{uri: img}} style={styles.multiImage} />
                    </TouchableOpacity>
                  );
                })}
              </View>
              {showTime && (
                <Text style={styles.time}>{getTime(item.updatedAt)}</Text>
              )}
            </View>
          </View>
        );
      }
    }
  }

  const handleDeleteMessage=async ()=>{
    setOpenModal(!opentModal)
    const res = await axiosConfig.delete(
      `/messages/${item?._id}`,
    );
    console.log({deleteRes:res});

    if(res)
    socket.emit('DeleteMessage',{...item,roomId})
  }
  return (
    <Animatable.View>
      <View style={styles.wapperMessage}></View>
      <TouchableOpacity
        onLongPress={handleLongPress}
        onPress={onHandlePress}
        delayLongPress={150}
        activeOpacity={1}>
        <View style={{transform: [{scaleY: -1}]}}>
          {render}

          <Modal
            transparent
            visible={opentModal}
            animationType="fade"
            onRequestClose={() => {}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setOpenModal(!opentModal)}
              style={{
                backgroundColor: 'rgba(0,0,0,0.7)',
                flex: 1,
              }}>
              <View style={styles.modal}>
                <TouchableOpacity>
                  <Text style={styles.messageAction}>Ch???nh s???a</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.messageAction}>Sao ch??p</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.messageAction}>Tr??? l???i</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.messageAction}>Chuy???n ti??p</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteMessage}>
                  <Text style={styles.messageAction}>Thu h???i</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          {showName ? (
            <Text style={styles.messageName}>
              {nameMess == me.username ? null : nameMess}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default memo(Messagedisplay);
