import ObjectID from 'bson-objectid';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList, LogBox, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { hashArr, showRoomName } from '../../helper';
import { ScreenNames } from '../../routes/screen';
import { socket } from '../../socketio/Socket';
import { fetchUsers } from '../../store/reducers/userListSlice';
import { colors } from '../../theme/colors';
import {
  IconAdd,
  IconArrowRight,
  IconChecked,
  IconCreateGroup,
  IconFind,
  IconMessenger,
  IconUncheck
} from '../../theme/icons';
import Avatar from '../card/components/Avatar';
import axiosConfig from '../../axiosConfig';
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
  const [createGroupUserIds, setCreateGroupUserIds] = useState([]);
  const [isSearching, setSearching] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isCreate=  useRef(false)
  console.log({screenState});
  const renderUserMessage = ({item}) => {
    const handleClickUserMessage = async () => {
      socket.emit('SEEN', {roomId: item._id, seenerId: me._id});
      props.navigation.navigate(ScreenNames.ChatScreen, {
        room: {me: me, _id: item._id, name: item.name, avatar: item.avatar},
      });
    };
    console.log({searchList});
    if(item?.username && searchList.length>0 && isCreating){
      return (
        <TouchableOpacity
        style={styles.userMessageItem}
        onPress={handleClickUserMessage}>
        <Avatar
          size={56}
          url={item?.avatar?[item?.avatar]:"https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"}
          onPress={() => {}}
        />
        <View style={styles.userMessageContent}>
          <Text style={styles.name}>
            {item?.username}
          </Text>
          <Text style={styles.messenger}>
            {item?.userId?._id === me._id ? 'You: ' : ''} 
            {/* <Text style={styles.contenText}>
              {item.content.length > 33
                ? item.content.substring(0, 30) + '...'
                : item.content}
            </Text> */}
          </Text>
        </View>
        <View style={styles.timeBox}>
          {/* <Text style={styles.time}>{moment(item.updatedAt).fromNow()} </Text> */}
          {/* {item.readBy.length !== 0 && item?.userId?._id !== me._id && (
            <Text style={styles.misMes}>{item.readBy[0]}</Text>
          )} */}
        </View>
        <TouchableOpacity onPress={()=>{
           createGroupUserIds.includes(item._id)?
          setCreateGroupUserIds(createGroupUserIds.filter(i=>i!=item._id)):
          setCreateGroupUserIds([...createGroupUserIds, item._id])
        }
        }>
          {
            isCreating&&
            (
               createGroupUserIds.includes(item._id)?
            <IconChecked/>:
            <IconUncheck/>
            )
           
          }
        </TouchableOpacity>
      </TouchableOpacity>
      )
    }else if(item?.name  &&!isCreating){
      return (
        <TouchableOpacity
          style={styles.userMessageItem}
          onPress={handleClickUserMessage}>
          <Avatar
            size={56}
            url={item?.avatar}
            onPress={() => {}}
          />
          <View style={styles.userMessageContent}>
            <Text style={styles.name}>
              {showRoomName(item.name, me?.username) > 20
                ? showRoomName(item.name, me?.username).substring(0, 20) + '..'
                : showRoomName(item.name, me?.username)}
            </Text>
            <Text style={styles.messenger}>
              {item?.userId?._id === me._id ? 'You: ' : ''} 
              <Text style={styles.contenText}>
                {item.content.length > 33
                  ? item.content.substring(0, 30) + '...'
                  : item.content}
              </Text>
            </Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.time}>{moment(item.updatedAt).fromNow()} </Text>
            {/* {item.readBy.length !== 0 && item?.userId?._id !== me._id && (
              <Text style={styles.misMes}>{item.readBy[0]}</Text>
            )} */}
          </View>
          <TouchableOpacity onPress={()=>{
            createGroupUserIds.includes(item._id)?
            setCreateGroupUserIds(createGroupUserIds.filter(i=>i!=item._id)):
            setCreateGroupUserIds([...createGroupUserIds, item._id])
          }
          }>
            {
              isCreating&&
              (
                createGroupUserIds.includes(item._id)?
              <IconChecked/>:
              <IconUncheck/>
              )
            
            }
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }else{
      console.log({
        username:item,
         l:searchList.length>0,
         is: isCreating
      });
      return <></>
    }

  
  };

  const handleSearch = text => {
    setSearchKey(text)
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

  const handleCreateGroup=()=>{
    if(createGroupUserIds.length==0){
      setIsCreating(!isCreating)
    }else{
       let data = {
        _id: new ObjectID().toString(),
        userId: {
          _id: me._id,
          username: me.username,
          avatar: me.avatar,
        },
        roomId: hashArr([...createGroupUserIds, me._id]),
        content: "Đã tạo nhóm",
        type: 'info',
        readBy: [1],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        userIds:[...createGroupUserIds, me._id]
      };
      socket.emit('sendMessage', data);
    }

   
  }

  useEffect(() => {
    if(!isCreating){
      setSearchList(
        screenState.users.filter(i =>
          i.name.toLowerCase().includes(searchKey.toLowerCase()),
        ),
      );
      // setSearching(false);
      return; 
    }
    const getUserList = async () => {
      console.log("kkkkkkkkkkkkkkk");
      setIsLoading(true);
      const res = await axiosConfig.get(
        `/users/0/20?search=${searchKey}&except=${me?._id}`,
      );
      // setSearching(true);
      setSearchList(res.data );
    };
    if (me?._id) getUserList();
  }, [me, searchKey, isCreating]);

  useEffect(()=>{
    setIsLoading(false)
    console.log({searchList});
  },[searchList])

  console.log({xxxx:(isSearching||isCreating) &&searchList.length});
  console.log({xxxx:screenState?.users});
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.container.header}>
          <Text style={styles.container.header.title}>Messages</Text>
          <TouchableOpacity style={styles.container.header.button} onPress={handleCreateGroup}>
            {/* <IconMessenger stroke="#E94057" /> */}
            {
              createGroupUserIds.length>0?
              <IconArrowRight/>:
              <IconCreateGroup stroke="#E94057" />
            }
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
        {/* {!isSearching && (
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
        )} */}

        <Text style={styles.title}>Messages</Text>
        <View style={styles.userMessagesList}>
          {
            screenState.loading|| isLoading?
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
              data={(isSearching||isCreating) &&searchList.length>0 ? searchList : screenState?.users}
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
