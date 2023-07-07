import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SwitchTheme from '../theme/SwitchTheme'
import useThemeStore from '../theme/store/store'
import FabIcons from './Icons/FabIcons'

const FAB = ({ bottom = 89, right = 27, arrowDirection, onPress }) => {
  const isTheme = useThemeStore((state) => state.theme)

  return (
    <Pressable
      style={{
        position: 'absolute',
        bottom: bottom,
        right: right,
      }}
      onPress={onPress}
    >
      {({ pressed }) => {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              height: 40,
              width: 40,
              backgroundColor: pressed
                ? SwitchTheme(isTheme).hoverEffect
                : isTheme.includes('theme_usual')
                ? SwitchTheme(isTheme).FAB
                : SwitchTheme(isTheme).checkIcon,
              transform: [{ rotate: arrowDirection == 'chevron-down' ? '180deg' : '0deg' }],
              elevation: pressed ? 1 : 3,
            }}
          >
            <FabIcons />
          </View>
        )
      }}
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
