import { Pressable, StyleSheet, Text } from 'react-native'
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        position: 'absolute',
        height: 56,
        width: 56,
        bottom: 20,
        right: 20,
        elevation: 3,
        backgroundColor: SwitchTheme(isTheme).FAB,
      }}
      onPress={onPress}
    >
      <SearchIcon />
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
