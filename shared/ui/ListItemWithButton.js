import { Pressable, StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import RunIcon from './Icons/RunIcon'
import TextMain from './Text/TextMain'
import TextSmall from './Text/TextSmall'

const ListItemWithButton = ({ title, buttonTitle, onPress = null, position = 'all', backgroundIsNeed = false }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        paddingHorizontal: 16,
        borderTopRightRadius: position === 'top' || position === 'all' ? 20 : 0,
        borderTopLeftRadius: position === 'top' || position === 'all' ? 20 : 0,
        borderBottomRightRadius: position === 'bottom' || position === 'all' ? 20 : 0,
        borderBottomLeftRadius: position === 'bottom' || position === 'all' ? 20 : 0,
        backgroundColor: backgroundIsNeed ? SwitchTheme(isTheme).bgItem : 'transparent',
      }}
    >
      <View style={styles.rows1}>
        <TextMain flex={1}>{title}</TextMain>
        <Pressable onPress={onPress}>
          {({ pressed }) => (
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Roboto-Medium',
                lineHeight: 20,
                letterSpacing: 0.1,
                marginLeft: 8,
                color: pressed ? SwitchTheme(isTheme).textbutton1pressed : SwitchTheme(isTheme).textbutton1,
              }}
            >
              {buttonTitle}
            </Text>
          )}
        </Pressable>
      </View>
      {position === 'middle' || position === 'top' ? <Divider ml={-16} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  rows1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15.5,
  },

  rows2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 1,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    lineHeight: 20,
    letterSpacing: 0.1,
    paddingRight: 4,
  },
})

export default ListItemWithButton
