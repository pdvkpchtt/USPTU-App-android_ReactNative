import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import SwitchTheme from '../theme/SwitchTheme'
import useThemeStore from '../theme/store/store'
import FabIcons from './Icons/FabIcons'

const FAB = (props) => {
  const isTheme = useThemeStore((state) => state.theme)

  return (
    <Pressable
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        position: 'absolute',
        height: 41,
        width: 41,
        bottom: 80,
        right: 20,
        backgroundColor: SwitchTheme(isTheme).FAB,
        opacity: 0.95,
        borderWidth: 1,
        borderColor: SwitchTheme(isTheme).FABStroke,
        transform: [{ rotate: props.arrowDirection == 'chevron-down' ? '180deg' : '0deg' }],
      }}
      onPress={props.onPress}
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
