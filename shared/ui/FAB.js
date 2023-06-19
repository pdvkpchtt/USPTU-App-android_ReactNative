import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import SwitchTheme from '../theme/SwitchTheme'
import useThemeStore from '../theme/store/store'
import FabIcons from './Icons/FabIcons'

const FAB = ({ bottom = 89, right = 27, arrowDirection, onPress }) => {
  const isTheme = useThemeStore((state) => state.theme)

  return (
    <Pressable
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        position: 'absolute',
        height: 40,
        width: 40,
        bottom: bottom,
        right: right,
        backgroundColor: SwitchTheme(isTheme).FAB,
        transform: [{ rotate: arrowDirection == 'chevron-down' ? '180deg' : '0deg' }],
        elevation: 3,
      }}
      onPress={onPress}
    >
      <FabIcons />
    </Pressable>
  )
}

export default FAB

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
})
