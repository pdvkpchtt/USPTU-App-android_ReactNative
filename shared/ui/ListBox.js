import { View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'

const ListBox = (props) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        backgroundColor: SwitchTheme(isTheme).bgItem,
        borderRadius: 13,
        paddingHorizontal: 16,
        paddingVertical: 9,
        ...props,
      }}
    >
      {props.children}
    </View>
  )
}

export default ListBox
