import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {colors} from '../../theme/colors';
import {IconDelete, IconFind} from '../../theme/icons';
import {IconHeart} from '../../theme/icons';
import {ScreenNames} from '../../routes/screen';
import moment from 'moment';
import ContentLoader from 'react-native-easy-content-loader';
import BigPanel from '../../components/LoadingAnimation/BigPanel';
const UserItem = ({item, props}) => {
  return (
    <TouchableOpacity
      style={styles.listUser.user}
      onPress={() =>
        props.navigation.navigate(ScreenNames.ProfileScreen, {item})
      }>
      <Image
        style={styles.listUser.user.imageBackground}
        source={{uri: item?.avatar}}
      />
      <Text style={styles.listUser.user.name}>
        {item.username}, {item.yearBirth}
      </Text>
      <View style={styles.listUser.user.groupButton}>
        <TouchableOpacity style={styles.listUser.user.groupButton.button}>
          <IconDelete stroke="white" />
        </TouchableOpacity>
        <View style={styles.listUser.user.groupButton.verticleLine}></View>
        <TouchableOpacity style={styles.listUser.user.groupButton.button}>
          <IconHeart fill="white" stroke="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const ListUser = ({onSearch, listUser, ...props}) => {
  const list = listUser.map(item => (
    <UserItem item={item} props={props.props} key={item._id} />
  ));

  const handleSearch = text => {
    onSearch(text);
  };

  return (
    <>
      <View style={styles.searchBox}>
        <IconFind />
        <TextInput
          style={styles.searchTxt}
          placeholder="Gõ tên ai đó.."
          onChangeText={text => handleSearch(text)}
        />
        {/* <Text style={styles.searchTxt}></Text> */}
      </View>
      {/* <View style={styles.timeline}>
        <View style={styles.timeline.line} />
        <View>
          <Text style={styles.timeline.time}>{props.time}</Text>
        </View>
        <View style={styles.timeline.line} />
      </View> */}
      <View style={styles.listUser}>
        {list && list?.length>0?
        list:
        <View style={{marginTop:20, }}>
          <View style={{display:'flex', flexDirection:'row'}}>
            <View style={{width:20}}>
              <ContentLoader 
              active
              tHeight={240}
              tWidth={Dimensions.get('window').width/2-60} 
              />
            </View>
            <View  style={{width:20, marginLeft:Dimensions.get('window').width/2-60}}>
              <ContentLoader 
              active
              tHeight={240}
              tWidth={Dimensions.get('window').width/2-50} 
              />
            </View>
          </View>
          <View style={{display:'flex', flexDirection:'row', marginTop:-50}}>
            <View style={{width:20}}>
              <ContentLoader 
              active
              tHeight={240}
              tWidth={Dimensions.get('window').width/2-60} 
              />
            </View>
            <View  style={{width:20, marginLeft:Dimensions.get('window').width/2-60}}>
              <ContentLoader 
              active
              tHeight={240}
              tWidth={Dimensions.get('window').width/2-50} 
              />
            </View>
          </View>
        </View>
      
      }
        
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  timeline: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#E8E6EA',
    },
    time: {
      paddingHorizontal: 10,
      fontFamily: 'Sk-Modernist-Regular',
      fontSize: 12,
      lineHeight: 18,
      textAlign: 'center',
      color: 'rgba(0, 0, 0, 0.7)',
    },
  },
  listUser: {
    paddingBottom: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    user: {
      marginBottom: 15,
      width: '48%',
      height: 250,
      oveflow: 'hidden',
      imageBackground: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 15,
      },
      name: {
        position: 'absolute',
        bottom: 44,
        marginHorizontal: 16,
        fontFamily: 'Sk-Modernist-Bold',
        fontSize: 16,
        lineHeight: 24,
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 2,
      },
      groupButton: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        verticleLine: {
          width: 1,
          height: '100%',
          backgroundColor: colors.c_ffff,
        },
        button: {
          opacity: 0.7,
          flex: 1,
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
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

  searchBox: {
    marginTop: 21,
    marginBottom: 21,
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
});

export default ListUser;
