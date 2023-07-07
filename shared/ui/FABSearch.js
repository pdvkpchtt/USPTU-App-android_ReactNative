import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SwitchTheme from '../theme/SwitchTheme'
import useThemeStore from '../theme/store/store'
import FabIcons from './Icons/FabIcons'
import SearchIcon from './Icons/SearchIcon'

const FABSearch = ({ arrowDirection, onPress }) => {
  const isTheme = useThemeStore((state) => state.theme)

  return (
    <Pressable
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
      onPress={onPress}
    >
      {({ pressed }) => {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
              height: 56,
              width: 56,
              elevation: pressed ? 1 : 3,
              backgroundColor: pressed
                ? SwitchTheme(isTheme).hoverEffect
                : isTheme.includes('theme_usual')
                ? SwitchTheme(isTheme).FAB
                : SwitchTheme(isTheme).checkIcon,
            }}
          >
            <SearchIcon />
          </View>
        )
      }}
    </Pressable>
  )
}

export default FABSearch

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
})
