import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const MessagesIcon = ({ props, color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg viewBox="0 0 28 28" width="28" height="28">
      <G {...props}>
        <Rect width="28" height="28" rx="6" fill="#34C759" />
        <Path
          d="M7.6084 23.0215C8.62939 23.0215 11.02 21.9839 12.5806 20.8799C12.7466 20.7637 12.8877 20.7222 13.0288 20.7222C13.1367 20.7305 13.228 20.7388 13.3027 20.7388C19.3042 20.7305 23.7617 17.543 23.7617 12.8613C23.7617 8.50342 19.4204 4.99219 14 4.99219C8.57959 4.99219 4.23828 8.50342 4.23828 12.8613C4.23828 15.5425 5.82373 17.9663 8.58789 19.4688C8.76221 19.5601 8.80371 19.6846 8.7207 19.8506C8.22266 20.6807 7.42578 21.5771 7.09375 22.0088C6.69531 22.5068 6.91943 23.0215 7.6084 23.0215Z"
          fill="white"
        />
      </G>
    </Svg>
  )
}

export default MessagesIcon
