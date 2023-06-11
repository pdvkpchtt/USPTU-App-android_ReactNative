import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const FabIcons = () => {
  const isTheme = useThemeStore((state) => state.theme)

  return (
    <Svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M25.2929 22.7071C25.6834 23.0976 26.3166 23.0976 26.7071 22.7071C27.0976 22.3166 27.0976 21.6834 26.7071 21.2929L21.7071 16.2929C21.3166 15.9024 20.6834 15.9024 20.2929 16.2929L15.2929 21.2929C14.9024 21.6834 14.9024 22.3166 15.2929 22.7071C15.6834 23.0976 16.3166 23.0976 16.7071 22.7071L21 18.4142L25.2929 22.7071Z"
        style={{ fill: SwitchTheme(isTheme).FABIcon }}
      />
    </Svg>
  )
}

export default FabIcons
