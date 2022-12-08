import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { IconFilter } from '../theme/icons'

export default function Filter({onPress, ...res}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <IconFilter/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
   
  }
})