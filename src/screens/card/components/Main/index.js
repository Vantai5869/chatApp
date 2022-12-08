import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  View,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Filter from './../../../../components/Filter';
import Card from './../Card';
import Footer from '../Footer';
import {ACTION_OFFSET, CARD} from './../utils/constants';
// import {pets as petsArray} from './data';
import {styles} from './styles';
import Back from '../../../../components/Back';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {colors} from '../../../../theme/colors';
import Button from '../Button';
import axiosConfig from './../../../../axiosConfig.js';
import {useSelector} from 'react-redux';
import BigPanel from '../../../../components/LoadingAnimation/BigPanel';

export default function Main({props}) {
  // const [pets, setPets] = useState(petsArray);
  const me = useSelector(state => state.auth.data);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [minAge, setMinAge] = useState(10);
  const [maxAge, setMaxAge] = useState(60);
  const [gender, setGender] = useState('both');
  const [userList, setUserList] = useState([]);
  const [loading, setIsloading] = useState(false);
  const listRef = useRef([]);
  useEffect(() => {
    if (!userList.length) {
      setUserList(listRef.current);
    }
  }, [userList.length]);
  useEffect(() => {
    const getUserList = async () => {
      setIsloading(true);
      const res = await axiosConfig.get(
        `/users/0/50?&minAge=${minAge}&maxAge=${maxAge}&gender=${gender}&except=${me?._id}`,
      );
      listRef.current = res.data;
      setUserList(res.data);
    };
    if (me?._id) getUserList();
  }, [me]);

  useEffect(()=>{
    if(!!userList?.length){
      setIsloading(false);
    }
  },[userList])

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy, y0}) => {
      swipe.setValue({x: dx, y: dy});
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setUserList(prevState => prevState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  const handleChoice = useCallback(
    direction => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x],
  );

  const handleChangeAge = value => {
    setMinAge(value[0]);
    setMaxAge(value[1]);
  };
  // const handleChangeDistance = value => {
  //   setDetance(value[0]);
  // };

  const handleContinue = async () => {
    if (me?._id) {
      const res = await axiosConfig.get(
        `/users/0/10?&minAge=${minAge}&maxAge=${maxAge}&gender=${gender}&except=${me?._id}`,
      );

      listRef.current = res.data;
      setUserList(res.data);
      setModalVisible(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topAction}>
        <Back />
        <Filter onPress={() => setModalVisible(!modalVisible)} />
      </View>
      <View style={styles.cards}>
         {
        loading?
        // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        //   <ActivityIndicator size={'large'}/>
        // </View>
        <BigPanel/>
        :
        userList
          .map((user, index) => {
            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <Card
                key={index}
                name={user?.username}
                source={user?.avatar}
                isFirst={isFirst}
                swipe={swipe}
                tiltSign={tiltSign}
                {...dragHandlers}
              />
            );
          })
          .reverse()}

        <Footer handleChoice={handleChoice} props={props} user={userList[0]} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTop}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.clear}>Close</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitles}>Interested in</Text>
            <View style={styles.interestedInBox}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  setGender('female');
                }}>
                <Text
                  style={[
                    styles.boxTxt,
                    gender === 'female' && styles.boxSelected,
                  ]}>
                  {' '}
                  Girls
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  setGender('male');
                }}>
                <Text
                  style={[
                    styles.boxTxt,
                    gender === 'male' && styles.boxSelected,
                  ]}>
                  {' '}
                  Boys
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.box}
                onPress={() => {
                  setGender('both');
                }}>
                <Text
                  style={[
                    styles.boxTxt,
                    gender === 'both' && styles.boxSelected,
                  ]}>
                  {' '}
                  Both
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.modalTitles}>Distance</Text>
              <Text>{detance} km</Text>
            </View>

            <View style={styles.distanceSlide}>
              <MultiSlider
                trackStyle={{backgroundColor: colors.c_E8E6EA, height: 2}}
                markerStyle={{
                  backgroundColor: colors.c_E94057,
                  width: 20,
                  height: 20,
                }}
                max={100}
                values={[detance]}
                onValuesChange={handleChangeDistance}
                selectedStyle={{backgroundColor: colors.c_E94057}}
              />
            </View> */}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.modalTitles}>Age</Text>
              <Text>
                {minAge}-{maxAge}
              </Text>
            </View>

            <View style={styles.age}>
              <MultiSlider
                min={0}
                max={100}
                values={[minAge, maxAge]}
                step={10}
                onValuesChange={handleChangeAge}
                sliderLength={Dimensions.get('screen').width - 80}
                trackStyle={{
                  backgroundColor: colors.c_E8E6EA,
                  height: 2,
                  borderRadius: 10,
                }}
                markerStyle={{
                  backgroundColor: colors.c_E94057,
                  width: 20,
                  height: 20,
                }}
                selectedStyle={{backgroundColor: colors.c_E94057}}
              />
            </View>

            <Button
              lable="Continue"
              onPress={handleContinue}
              style={{marginTop: 40}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
