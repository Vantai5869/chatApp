import React, {memo, useState} from 'react';
import {Image, Text, TouchableOpacity, View, Modal} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import {getTime} from '../../../helper';
import {colors} from '../../../theme/colors';
// import * as RootNavigation from './../../../RootNavigation';
import {styles} from './MessageDisplay.styles';
import {ScreenNames} from '../../../routes/screen';

let preId = '';
let preUserName = '';
const Messagedisplay = ({item, me, index,onHandlePress, props}) => {
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
    console.log(item.content);
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
                {item.content}{' '}
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
          {/* <Text style={styles.infoMessage}>{item.content} </Text> */}
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
                      uri: content[0],
                    })
                  }
                  activeOpacity={0.9}
                  >
                  <Image source={{uri: content[0]}} style={styles.oneImage} />
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
                  <Text style={styles.messageAction}>Chỉnh sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.messageAction}>Sao chép</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.messageAction}>Trả lời</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.messageAction}>Chuyển tiêp</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.messageAction}>Xóa</Text>
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
