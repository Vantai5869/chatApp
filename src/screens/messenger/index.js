import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { showRoomName } from '../../helper';
import { ScreenNames } from '../../routes/screen';
import { socket } from '../../socketio/Socket';
import { fetchUsers } from '../../store/reducers/userListSlice';
import { colors } from '../../theme/colors';
import {
  IconFind,
  IconMessenger
} from '../../theme/icons';
import Avatar from '../card/components/Avatar';
import StoryItem from './storyItem';
moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'seconds',
    ss: '%ss',
    m: 'a minute',
    mm: '%dm',
    h: 'an hour',
    hh: '%dh',
    d: 'a day',
    dd: '%dd',
    M: 'a month',
    MM: '%dM',
    y: 'a year',
    yy: '%dY',
  },
});

const MessengerScreen = props => {
  const me = useSelector(state => state.auth.data);
  const dispatch = useDispatch();
  const screenState = useSelector(state => state.userList);
  useEffect(() => {
    if (me?._id) dispatch(fetchUsers({meId: me._id, page: 0}));
  }, [me]);
  const [searchList, setSearchList] = useState([]);
  const [isSearching, setSearching] = useState(false);
  console.log({screenState});
  const renderUserMessage = ({item}) => {
    const handleClickUserMessage = async () => {
      socket.emit('SEEN', {roomId: item._id, seenerId: me._id});
      props.navigation.navigate(ScreenNames.ChatScreen, {
        room: {me: me, _id: item._id, name: item.name, avatar: item.avatar},
      });
    };

    return (
      <TouchableOpacity
        style={styles.userMessageItem}
        onPress={handleClickUserMessage}>
        <Avatar
          size={56}
          url={item?.avatar?.length>1?  (item.avatar[0] !== me?.avatar ? item.avatar[0] : item.avatar[1]) : item.avatar[0]}
          onPress={() => {}}
        />
        <View style={styles.userMessageContent}>
          <Text style={styles.name}>
            {showRoomName(item.name, me?.username) > 20
              ? showRoomName(item.name, me?.username).substring(0, 20) + '..'
              : showRoomName(item.name, me?.username)}
          </Text>
          <Text style={styles.messenger}>
            {item?.userId?._id === me._id ? 'You: ' : ''} z
            <Text style={styles.contenText}>
              {item.content.length > 33
                ? item.content.substring(0, 30) + '...'
                : item.content}
            </Text>
          </Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.time}>{moment(item.updatedAt).fromNow()} </Text>
          {item.readBy.length !== 0 && item?.userId?._id !== me._id && (
            <Text style={styles.misMes}>{item.readBy[0]}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearch = text => {
    console.log('text');
    console.log(text);
    if (text === '') {
      setSearching(false);
    } else {
      setSearching(true);
      setSearchList(
        screenState.users.filter(i =>
          i.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.container.header}>
          <Text style={styles.container.header.title}>Messages</Text>
          <TouchableOpacity style={styles.container.header.button}>
            <IconMessenger stroke="#E94057" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <IconFind />
          <TextInput
            style={styles.searchTxt}
            placeholder="Search"
            onChangeText={text => handleSearch(text)}
          />
          {/* <Text style={styles.searchTxt}></Text> */}
        </View>
        {!isSearching && (
          <>
            <Text style={styles.title}>Activities</Text>
            <View style={styles.listActivities}>
              <FlatList
                data={[{create: true}, ...screenState.users]}
                renderItem={({item}) => <StoryItem item={item} props={props} />}
                keyExtractor={item => item._id}
                horizontal
                paddingHorizontal={40}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </>
        )}

        <Text style={styles.title}>Messages</Text>
        <View style={styles.userMessagesList}>
          {
            screenState.loading?
            <View style={styles.loader}>
              <View style={{marginTop:20}}>
                <ContentLoader active avatar  pRows={1} pHeight={[25]}  containerStyles={{width: 400,}} />
              </View>
              <View style={{marginTop:20}}>
                <ContentLoader active avatar  pRows={1} pHeight={[25]}  containerStyles={{width: 400,}} />
              </View>
              <View style={{marginTop:20}}>
                <ContentLoader active avatar  pRows={1} pHeight={[25]}  containerStyles={{width: 400,}} />
              </View>
              <View style={{marginTop:20}}>
                <ContentLoader active avatar  pRows={1} pHeight={[25]}  containerStyles={{width: 400,}} />
              </View>
            </View>:
             <FlatList
              data={isSearching ? searchList : screenState?.users}
              renderItem={renderUserMessage}
              keyExtractor={item => item._id}
              paddingHorizontal={40}
              showsHorizontalScrollIndicator={false}
            />
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 44,
    backgroundColor: '#FFFFFF',
    header: {
      paddingHorizontal: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      title: {
        fontSize: 34,
        lineHeight: 51,
        color: '#000000',
        fontFamily: 'Sk-Modernist-Bold',
      },
      button: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E6EA',
        boxSizing: 'border-box',
        borderRadius: 15,
        paddingHorizontal: 14,
        paddingVertical: 14,
      },
    },
    main: {
      fontSize: 27,
      color: '#000000',
      fontFamily: 'Sk-Modernist-Bold',
      lineHeight: 24,
    },
  },

  searchBox: {
    marginHorizontal: 40,
    marginTop: 21,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 21,
    // paddingVertical: 12,
    borderColor: colors.c_E8E6EA,
    alignItems: 'center',
  },
  searchTxt: {
    marginLeft: 13,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
  },
  title: {
    marginTop: 10,
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 18,
    lineHeight: 27,
    paddingHorizontal: 40,
  },
  avatarBox: {
    borderWidth: 1,
    borderColor: colors.c_E94057,
    borderRadius: 33,
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: colors.c_ffff,
  },
  item: {
    marginRight: 15,
    alignItems: 'center',
  },
  listActivities: {
    marginTop: 10,
  },
  userMessageItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  userMessageContent: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 14,
    lineHeight: 21,
    color: colors.c_000000,
  },
  messenger: {
    fontFamily: 'Sk-Modernist-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  timeBox: {},
  time: {
    color: colors.c_ADAFBB,
    lineHeight: 18,
    fontSize: 12,
  },
  misMes: {
    backgroundColor: colors.c_E94057,
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    // paddingLeft: 3,
    alignSelf: 'flex-end',
    marginTop: 3,
    color: colors.c_ffff,
  },
  userMessagesList: {
    paddingBottom: 0,
    flex: 1,
  },
  contenText: {
    color: colors.black,
    fontFamily: 'Sk-Modernist-Regular',
  },
  loader:{
    padding:20
  }
});

export default MessengerScreen;
