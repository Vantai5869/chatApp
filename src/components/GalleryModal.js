// import { View, Text,TouchableOpacity,Image,StyleSheet } from 'react-native'
// import React from 'react'

// export default function GalleryModal({current, onClose}) {
//   console.log(current);
//   return (
//     <View>
//       <Text>GalleryModal</Text>
//       <TouchableOpacity 
//         onPress={onClose}
//       >
//         <Text>Close</Text>
//         <View>
//             <Image 
//               source={{uri:current}}
//               style={styles.img}  
//             />
//         </View>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   img:{
//     width:'100%',
//     height:200,
//   }
// })


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
const { width } = Dimensions.get('screen');
const height='auto'
const API_KEY = "YOUR_PEXELS.COM_API_KEY"
const API_URL = "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20"

export default GalleryModal= ({images}) => {
  const [imgs, setImgs] = useState(images)
  const topRef = useRef()
  const thumbRef = useRef()
  const [activeIndex, setActiveIndex] = useState(0)

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
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar hidden  />
            <View style={{ flex: 1, backgroundColor: '#000'}}>
              <FlatList
                ref={topRef}
                data={images}
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
                data={images}
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