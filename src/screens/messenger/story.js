import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {colors} from '../../theme/colors';
import {IconBack, IconClose} from '../../theme/icons';
import Avatar from '../card/components/Avatar';
const {width} = Dimensions.get('screen');
const height = 'auto';

export default Story = props => {
  const story = props.route.params.item;
  const [imgs, setImgs] = useState([]);
  const topRef = useRef();
  const thumbRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [widthLineRed, setWidthLineRed] = useState(0);
  const [user, setUser] = useState();
  useEffect(() => {
    setImgs(props.route.params.listActivities.map(i => i.image));
    scrollToActiveIndex(
      props.route.params.listActivities
        .map(i => i.id)
        .indexOf(props.route.params.item.id),
    );
  }, []);

  useEffect(() => {
    setUser(props.route.params.listActivities[activeIndex]);
  }, [activeIndex]);

  useEffect(() => {
    const i = setTimeout(() => {
      if (widthLineRed > 300) {
        scrollToActiveIndex(activeIndex + 1);
        setWidthLineRed(0);
        // props.navigation.goBack();
      }
      setWidthLineRed(pre => pre + 10);
    }, 100);
    return () => clearTimeout(i);
  }, [widthLineRed]);
  const Item = ({item}) => {
    return (
      <View style={{width, height}}>
        <Image
          source={{uri: story?.avatar[0]}}
          // style={{width:'100%', resizeMode:'contain', height: Dimensions.get('window').width/200*300}}
          style={[StyleSheet.absoluteFillObject]}
        />
      </View>
    );
  };

  const scrollToActiveIndex = index => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animation: true,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={[styles.lineRed, {width: widthLineRed}]}></View>
      <View style={styles.user}>
        <Avatar size={66} onPress={() => {}} url={story?.avatar[0]} />
        <Text style={styles.name}>{user?.name} </Text>
      </View>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => props.navigation.goBack()}>
        <IconClose />
      </TouchableOpacity>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <FlatList
          ref={topRef}
          data={imgs}
          keyExtractor={(i, index) => index}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          onMomentumScrollEnd={ev => {
            scrollToActiveIndex(
              Math.floor(ev.nativeEvent.contentOffset.x / width + 0.1),
            );
          }}
          renderItem={({item}) => <Item item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backBtn: {
    top: 44,
    right: 40,
    position: 'absolute',
    zIndex: 99,
  },
  user: {
    position: 'absolute',
    top: 44,
    left: 40,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 99,
  },
  name: {
    marginLeft: 10,
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  lineRed: {
    left: 40,
    top: 20,
    right: 40,
    zIndex: 99,
    position: 'absolute',
    backgroundColor: colors.c_E94057,
    height: 2,
  },
});
