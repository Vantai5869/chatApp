import React,{useState,useRef, useEffect} from 'react';
import {
    StatusBar,
    FlatList,
    Image,
    Animated,
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Easing,
    SafeAreaViewBase,
    SafeAreaView,
} from 'react-native';
import { colors } from '../../theme/colors';
import { IconBack } from '../../theme/icons';
const { width } = Dimensions.get('screen');
const height='auto'

export default Gallery= (props) => {
  const [imgs, setImgs] = useState([])
  const topRef = useRef()
  const thumbRef = useRef()
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(()=>{
    setImgs(props.route.params.images);
    scrollToActiveIndex(props.route.params.index);
  },[])
  
  const Item=({item})=>{
    return(
      <View style={{ width, height}}>
        <Image
          source={{uri: item}}
          style={{width:'100%', resizeMode:'contain', height: Dimensions.get('window').width/200*300}}
          // style={[StyleSheet.absoluteFillObject]}
        />
      </View>
    )
  }
  const ItemPaging=({item, index})=>{
    return(
      <TouchableOpacity onPress={()=>scrollToActiveIndex(index)}>
        <Image
          source={{uri: item}}
          style={{
            width:80, height:80, borderRadius:12, marginRight:10,
            borderWidth:2,
            borderColor: activeIndex===index? '#fff':'transparent'
          }}
        />
      </TouchableOpacity>
    )
  }

  const scrollToActiveIndex=(index)=>{
    setActiveIndex(index);
    topRef?.current?.scrollToOffset(
      {
        offset: index*width, 
        animation:true
      }
    )
    if(index*(80+10)-80/2>width/2){
      thumbRef?.current?.scrollToOffset({
        offset: index*(80+10)-width/2+80/2, 
        animation:true
      })
    }else{
      thumbRef?.current?.scrollToOffset({
        offset: 0, 
        animation:true
      })
    }
   
  }
    return (
        <View style={styles.container}>
            <StatusBar hidden  />
            <TouchableOpacity style={styles.backBtn} onPress={() =>props.navigation.goBack()}>
              <IconBack/>
            </TouchableOpacity>
            <View style={{ flex: 1, backgroundColor: '#000'}}>
              <FlatList
                ref={topRef}
                data={imgs}
                keyExtractor={(i,index)=>index}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                onMomentumScrollEnd={
                  ev=>{
                    scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x/width+0.1))
                  }
                }
                renderItem={
                  ({item})=> <Item item={item} />
                }
              />
              <FlatList
                ref={thumbRef}
                data={imgs}
                keyExtractor={(i,index)=>index}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{position: 'absolute', bottom:30}}
                renderItem={
                  ({item, index})=> <ItemPaging item={item} index={index} />
                }
              />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#fff',
  },
 backBtn:{
  top:44,
  left:40,
  position: 'absolute',
  zIndex:99
 }
})