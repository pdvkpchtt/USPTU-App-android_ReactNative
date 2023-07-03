import React from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'

export const LoadingBox = (props) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <ScrollView
      style={{ backgroundColor: 'transparent' }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24, alignContent: 'center' }}
      refreshControl={
        <RefreshControl
          colors={[SwitchTheme(isTheme).checkIcon]}
          progressBackgroundColor={SwitchTheme(isTheme).bgItem}
          refreshing={true}
        />
      }
    >
      <View style={{ height: 40 }}></View>
    </ScrollView>
  )
}
