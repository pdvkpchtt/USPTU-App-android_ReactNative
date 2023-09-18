import { useEffect, useState } from 'react'
import { View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import TextMain from './Text/TextMain'

const NothinFound = ({ bg }) => {
  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}
    >
      <TextMain textAlign="left">Нет занятий</TextMain>
    </View>
  )
}

export default NothinFound
