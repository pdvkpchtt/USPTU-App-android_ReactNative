import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import RunIcon from './Icons/RunIcon'
import TextBody from './Text/TextBody'
import TextMain from './Text/TextMain'
import TextSmall from './Text/TextSmall'

const ListItemWithDate = ({ title, buttonTitle, onPress = null, position = 'all', backgroundIsNeed = false }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        paddingHorizontal: 16,
        borderTopRightRadius: position === 'top' || position === 'all' ? 13 : 0,
        borderTopLeftRadius: position === 'top' || position === 'all' ? 13 : 0,
        borderBottomRightRadius: position === 'bottom' || position === 'all' ? 13 : 0,
        borderBottomLeftRadius: position === 'bottom' || position === 'all' ? 13 : 0,
        backgroundColor: backgroundIsNeed ? SwitchTheme(isTheme).bgItem : 'transparent',
      }}
    >
      <View style={styles.rows1}>
        <TextMain flex={1}>{title}</TextMain>
        <Pressable onPress={onPress}>
          {({ pressed }) => (
            <View
              style={{
                flex: 0,
                marginLeft: 8,
                backgroundColor: pressed ? SwitchTheme(isTheme).bgbutton1pressed : SwitchTheme(isTheme).bgbutton1,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <TextBody color={pressed ? SwitchTheme(isTheme).textbutton1pressed : SwitchTheme(isTheme).textbuttondate}>
                {buttonTitle}
              </TextBody>
            </View>
          )}
        </Pressable>
      </View>
      {position === 'middle' || position === 'top' ? <Divider ml={0} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  rows1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  rows2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 1,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 12.5,
    fontFamily: 'SF-Pro-Text-Bold',
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: -0.6,
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
})

export default ListItemWithDate
