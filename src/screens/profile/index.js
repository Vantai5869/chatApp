import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  IconCamera,
  IconDbCheck,
  IconDislike,
  IconLike,
  IconMappin,
  IconNotLikeYet,
  IconSend,
  IconStar,
} from '../../theme/icons';
import {colors} from '../../theme/colors';
import GalleryModal from '../../components/GalleryModal';
import {ScreenNames} from '../../routes/screen';
import {hash, removeData} from '../../helper';
import {clearAuth} from '../../store/reducers/authSlice';
import {clearUserList} from '../../store/reducers/userListSlice';
import {clearConversation} from '../../store/reducers/conversationSlice';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import axiosConfig from './../../axiosConfig';
import {imageUpload} from '../../helper/imageUpload';

export const images = [
  'https://s3-alpha-sig.figma.com/img/ade2/99db/18dd3c49a75f2a004f6dee7a7222d442?Expires=1655078400&Signature=NsIqH12BPuZ4A-Dc~gsLzXDj2MsQGOOZQyy4JkGbX7VvnDTusLQU1n6c0lt~0TCvdLbL7k2Ra8u5BC8h5-onarH6Sv-C6uRkvUkOt24hZxXj77ZYcYMx5hRt4WMN1V8kW2UbMqiFzYFJwWbHRq4q6UgQVsj6yk6FmBoX8hOW5gSWmJ9tGRuW4-O-uiMiwfTadSmouwCITsezGAj35pA2K55w7pQ76Q~8unj0kxJeLtM0Q3dAms5RM-hnDIg9ek-84-6tD4dQGQdAUqWbBbOjOMNhmB28dgnASVudYVwKnDZLHSrGefMYWdzZpbeMZdXIFmgYEIct7oXoTvjKE3Lfsw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  'https://s3-alpha-sig.figma.com/img/d37f/c793/8fb82d4a26462094831080d07bfcf911?Expires=1655078400&Signature=HO~Vw7lWDEcUjGSP-iOLTuYgnF9lXI3Kk3eM1VYKysajNtwH535CjqRU8VkJg1z36fQsA4O~x~5BJ9DEJhR6SE45orFJA9mcnZZliiXlIEmT9b4QAPsWKPYGdGiwpCpDQyT20j4OrpF75tAnwyxMdHlSQPQDE1yiQnC3KvqRl1J3vCSH6hArXGH9Ivu83LvevXw7K7-JVEaq4FPNtx~zooeFUWuHCBdnxEDMky3DuCIoGyP~s6axn22Cl658vC0ba7f5HLPfocKudwScokc347t64amSSux7LsVSElSnhCov7pjJzgyLt7VClwNMNrxQJcWYd~zEaBedu4lJFyExGQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  'https://s3-alpha-sig.figma.com/img/ca87/6c58/ddc0a7347fbce7db2120a4a1deabd31e?Expires=1655078400&Signature=Umc0BPy~Is-uafWm3y5nF5zB7fQ8em8Ive7aVHyTxWWU4J2cvqmMYlsAVbACGXqElyp3oSZu77F2Gk1lCrflPDHa0a869dDNmnzJwKU5mvnQtKnN1llXfAonT-kN5DqYN~nTRZrMJl1boiB6CvinruuRAZR-ng6YFNzFcjTn-BAm-YiP7ovokJBO1nFV0hcFN5NENMlXH0LvcvwKLW5j5LIxaGcQsUJ6eAP96ndXDhk7XQu35noOgcqow5HI5eaRNFnkSD813rRvwRHtPDvI9DLozheov50HQ2eVUuiXoSqS84sBRAYYCW6QXG45-bhSJCVvoTsbiWUkh1GKpi1fiQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  'https://hinhanhdephd.com/wp-content/uploads/2015/12/hinh-anh-dep-girl-xinh-hinh-nen-dep-gai-xinh.jpg',
  'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',
];
export default function ProfilePage(props) {
  const dispatch = useDispatch();
  const [gallery, setGallery] = useState(images);
  const [isShowModal, setIsShowModal] = useState(false);
  const authState = useSelector(state => state.auth.data);
  const [avatar, setAvatar] = useState();
  const [user, setUser] = useState();
  const handleClickImg = index => {
    props.navigation.navigate(ScreenNames.Gallery, {images, index});
  };

  console.log({user})
  console.log({authState})
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axiosConfig.get('/users/' + authState._id);
        setUser(res.data?.data);
      } catch (error) {
        console.log('error');
        console.log(error);
      }
    };
    if (!props.route.params?.item) getProfile();
  }, [authState]);

  useEffect(() => {
    if (!!props.route.params?.item) setUser(props.route.params.item);
  }, [props.route.params?.item]);

  const handleLogout = () => {
    setAvatar();
    setUser();
    const res = removeData();
    dispatch(clearAuth());
    dispatch(clearUserList());
    dispatch(clearConversation());
    if (res) {
      props.navigation.navigate(ScreenNames.Login);
    }
  };

  const changeAvatar = async () => {
    try {
      const images = await DocumentPicker.pickMultiple({
        type: DocumentPicker.types.images,
      });
      const res = await imageUpload([images[0]]);
      const arr = [];
      for (var i = 0; i < res.length; i++) {
        arr.push(res[i].url);
      }

      if (arr[0]) {
        const res = await axiosConfig.put('/users/' + authState._id, {
          avatar: arr[0],
        });
        setAvatar(arr[0]);
        console.log('update avatar res:');
        console.log(res);
      }
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  };

  console.log('avatar=======================');
  console.log(avatar);

  const goToChat = () => {
    props.navigation.navigate(ScreenNames.ChatScreen, {
      room: {
        me: authState,
        _id: hash(authState._id) + hash(user._id),
        userId: [user._id],
        name: user.username,
        avatar: [user?.avatar, ''],
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {!isShowModal ? (
        <ScrollView style={styles.scrollView}>
          <View
            style={{
              width: '100%',
              height: Dimensions.get('window').height * 0.5,
            }}>
            <Image
              source={{
                uri: avatar ? avatar : user?.avatar,
              }}
              style={{width: '100%', resizeMode: 'cover', height: '100%'}}
            />
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text>Thoát</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.actions}>
              {/* <IconDislike styles={styles.icon} onPress={() => {}} /> */}
              {}
              {/* <IconLike onPress={() => {}} /> */}
              {
               !props.route.params?.item ?
                <TouchableOpacity
                  style={styles.iconCamera}
                  onPress={changeAvatar}>
                  <IconCamera />
                </TouchableOpacity>:
                <IconNotLikeYet /> //  <IconLike/>
              }
              
              {/* <IconStar onPress={() => {}} /> */}
            </View>
            <View style={styles.info}>
              <View style={styles.text}>
                <Text style={styles.txtName}>
                  {user?.username}, {new Date().getFullYear() - user?.yearBirth}
                </Text>
                <Text style={styles.txtIntro}>
                  {/* Professional model */}
                  {user?.gender === 'male' ? 'Nam' : 'Nữ'}
                </Text>
              </View>
              <TouchableOpacity style={styles.sendBtn} onPress={goToChat}>
                <IconSend />
              </TouchableOpacity>
            </View>

            <View style={styles.location}>
              <View>
                <Text style={styles.locationText}>Location</Text>
                <Text style={styles.positionText}>
                  Chicago, IL United States
                </Text>
              </View>
              <View style={styles.mappinBtn}>
                <IconMappin />
                <Text>1km </Text>
              </View>
            </View>

            <View style={styles.about}>
              <Text style={styles.aboutTitle}>About</Text>
              <Text style={styles.aboutTxt}>
                {user?.about ? user?.about : 'nothing'}
              </Text>
              {user?.about.length > 50 && (
                <Text style={styles.readMore}> Read more</Text>
              )}
            </View>

            <View style={styles.interests}>
              <Text style={styles.aboutTitle}>Interests</Text>
              <View style={styles.interestsCards}>
                <View style={styles.interestsCard}>
                  <IconDbCheck />
                  <Text>Travelling</Text>
                </View>
                <View
                  style={[styles.interestsCard, styles.interestsCardChecked]}>
                  <IconDbCheck />
                  <Text>Travelling</Text>
                </View>
                <View style={styles.interestsCard}>
                  <IconDbCheck />
                  <Text>Travelling</Text>
                </View>
                <View
                  style={[styles.interestsCard, styles.interestsCardChecked]}>
                  <IconDbCheck />
                  <Text>Travelling</Text>
                </View>
                <View style={styles.interestsCard}>
                  <IconDbCheck />
                  <Text>Travelling</Text>
                </View>
                <View
                  style={[styles.interestsCard, styles.interestsCardChecked]}>
                  <IconDbCheck />
                  <Text>Travelling</Text>
                </View>
              </View>
            </View>

            <View style={styles.gallery}>
              <View style={styles.headGallery}>
                <Text style={styles.aboutTitle}>Gallery</Text>
                <Text style={styles.seeAllGallery}>See all</Text>
              </View>
              <View style={styles.images}>
                {user?.gallery.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleClickImg(index)}
                    style={
                      [0, 1].includes(index)
                        ? styles.galleryCard2
                        : styles.galleryCard3
                    }>
                    <Image source={{uri: img}} style={styles.img} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <GalleryModal
          images={images}
          // onClose={()=>setIsShowModal(false)}
          // current={imgSelected}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  content: {
    backgroundColor: colors.c_ffff,
    // paddingVertical: 90,
    paddingHorizontal: 40,
  },
  info: {
    // marginTop:90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 52,
  },

  txtName: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 24,
    lineHeight: 36,
    marginRight: 10,
  },
  txtIntro: {
    fontFamily: 'Sk-Modernist-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  actions: {
    // width: Dimensions.get('window').width-100,
    marginTop: -40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sendBtn: {
    padding: 14,
    color: colors.c_E8E6EA,
    borderWidth: 1,
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: colors.c_E8E6EA,
    borderRadius: 15,
  },
  location: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 52,
  },
  locationText: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.c_000000,
  },
  positionText: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(0, 0, 0, 0.7)',
    fontFamily: 'Sk-Modernist-Regular',
  },
  mappinBtn: {
    width: 61,
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.c_FDECEE,
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderRadius: 7,
  },
  about: {
    marginTop: 30,
  },
  aboutTitle: {
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.c_000000,
  },
  aboutTxt: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(0, 0, 0, 0.7)',
    fontFamily: 'Sk-Modernist-Regular',
  },
  readMore: {
    marginTop: 5,
    color: colors.c_E94057,
    fontFamily: 'Sk-Modernist-Bold',
  },
  interests: {
    marginTop: 30,
  },
  interestsCards: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestsCard: {
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginRight: 10,
    borderColor: colors.c_E8E6EA,
  },
  interestsCardChecked: {
    borderColor: colors.c_E94057,
  },
  gallery: {
    marginTop: 30,
  },
  headGallery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seeAllGallery: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 21,
    color: colors.c_E94057,
    fontFamily: 'Sk-Modernist-Bold',
  },
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  galleryCard2: {
    maxWidth: (Dimensions.get('window').width - 90) * 0.5,
    width: '100%',
    height: 200,
    marginVertical: 5,
    borderRadius: 5,
  },
  galleryCard3: {
    maxWidth: (Dimensions.get('window').width - 100) * 0.33,
    width: '100%',
    height: 200,
    marginVertical: 5,
    borderRadius: 5,
  },
  img: {
    width: '100%',
    resizeMode: 'cover',
    height: '100%',
    borderRadius: 5,
  },
  logoutBtn: {
    position: 'absolute',
    backgroundColor: colors.c_E8E6EA,
    top: 20,
    right: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    color: colors.c_6674031a,
  },
  iconCamera: {
    backgroundColor: colors.c_ADAFBB,
    padding: 10,
    borderRadius: 70,
  },
});
