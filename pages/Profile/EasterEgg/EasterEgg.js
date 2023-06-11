import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

const EasterEgg = () => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Image source={require('../../../assets/deleteLater.jpg')} style={{ width: 250, height: 200 }} />
    </View>
  )
}

const styles = StyleSheet.create({})

export default EasterEgg
