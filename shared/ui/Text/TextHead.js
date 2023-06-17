import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

const TextHead = ({ text }) => {
  const isTheme = useThemeStore((state) => state.theme)

  return <Text style={{ fontSize: 12, fontFamily: 'Roboto-Medium', color: SwitchTheme(isTheme).textSec }}>{text}</Text>
}

export default TextHead
