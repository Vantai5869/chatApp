import { View, Text,Dimensions,StyleSheet, Animated, Image } from 'react-native'
import React from 'react'
import { colors } from '../../theme/colors'

export default function Card({dragHandlers, item, pan, rotate, index={}}) {
  return (
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y },  { rotate }],
          zIndex:1,
        }}
        {...dragHandlers}
      >
    <View style={styles.card}>

        <View style={styles.imgBox}>
          <Image resizeMode='cover' style={styles.img} source={item.img}/>
        </View>
    </View>

      </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.c_ffff,
    flex:1,
    position:'relative',
    flexDirection:'row',
    justifyContent: 'center'
  },
  card:{
    marginTop:150,
    zIndex:99,
    // position: 'absolute',
    borderRadius:15,
    backgroundColor:'#fff',
    padding:10
  },
  imgBox:{
    flexDirection: 'row',
    justifyContent:'center',
    borderRadius:15,
  },
  img:{
    width: Dimensions.get('window').width-80,
    borderRadius:15,
    maxHeight: Dimensions.get('window').height-300,
  },
  actions:{
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom:0
  },
  btns:{
    flexDirection: 'row',
    justifyContent:'space-between',
    width: Dimensions.get('window').width-80,
  },
  btn:{
  }
})