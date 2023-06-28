import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import RunIcon from './Icons/RunIcon'
import TextBody from './Text/TextBody'
import TextMain from './Text/TextMain'
import TextSmall from './Text/TextSmall'
import DatePickerForComponent from '../../shared/ui/Icons/DatePickerForComponent'

const ListItemWithDate = ({ title, buttonTitle, onPress = null, position = 'all', backgroundIsNeed = false }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderWidth: 2,
        borderColor: SwitchTheme(isTheme).placeselectionSearch,
        backgroundColor: isTheme.includes('theme_usual')
          ? 'transparent'
          : isTheme.includes('_dark')
          ? 'rgba(0, 0, 0, 0.4)'
          : 'rgba(255, 255, 255, 0.4)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
        paddingVertical: 6,
        paddingHorizontal: 2,
        borderTopRightRadius: position === 'top' || position === 'all' ? 20 : 0,
        borderTopLeftRadius: position === 'top' || position === 'all' ? 20 : 0,
        borderBottomRightRadius: position === 'bottom' || position === 'all' ? 20 : 0,
        borderBottomLeftRadius: position === 'bottom' || position === 'all' ? 20 : 0,
      }}
    >
      {({ pressed }) => (
        <>
          <View
            style={
              {
                // backgroundColor: pressed ? SwitchTheme(isTheme).bgbutton1pressed : SwitchTheme(isTheme).bgbutton1,
              }
            }
          >
            <TextMain marginRight={8} marginLeft={13}>
              {buttonTitle}
            </TextMain>
          </View>
          <View style={{ backgroundColor: SwitchTheme(isTheme).bgSearch, padding: 8, borderRadius: 99 }}>
            <DatePickerForComponent />
          </View>
        </>
      )}
    </Pressable>
  )
}

export default ListItemWithDate
