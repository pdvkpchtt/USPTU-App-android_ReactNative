import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import RunIcon from './Icons/RunIcon'
import TextBody from './Text/TextBody'
import TextMain from './Text/TextMain'
import TextSmall from './Text/TextSmall'
import DatePicerIcon from '../../shared/ui/Icons/DatePicerIcon'

const ListItemWithDate = ({ title, buttonTitle, onPress = null, position = 'all', backgroundIsNeed = false }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderWidth: 2,
        borderColor: SwitchTheme(isTheme).placeselectionSearch,
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
          <Text
            style={{
              flex: 1,
              position: 'absolute',
              top: -10,
              left: 12,
              fontSize: 12,
              fontFamily: 'Roboto-Medium',
              lineHeight: 16,
              color: SwitchTheme(isTheme).bgMesStudent,
              backgroundColor: SwitchTheme(isTheme).bgFon,
              paddingHorizontal: 4,
            }}
          >
            {title}
          </Text>
          <View
            style={
              {
                // backgroundColor: pressed ? SwitchTheme(isTheme).bgbutton1pressed : SwitchTheme(isTheme).bgbutton1,
              }
            }
          >
            <TextBody
              marginRight={8}
              marginLeft={13}
              color={pressed ? SwitchTheme(isTheme).textbutton1pressed : SwitchTheme(isTheme).textbuttondate}
            >
              {buttonTitle}
            </TextBody>
          </View>
          <View style={{ backgroundColor: SwitchTheme(isTheme).bgSearch, padding: 8, borderRadius: 99 }}>
            <DatePicerIcon />
          </View>
        </>
      )}
    </Pressable>
  )
}

export default ListItemWithDate
