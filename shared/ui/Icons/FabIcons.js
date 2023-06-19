import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const FabIcons = () => {
  const isTheme = useThemeStore((state) => state.theme)

  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.01 11.3346C14.3367 11.0079 14.3367 10.4813 14.01 10.1546L8.46999 4.6146C8.20999 4.3546 7.78999 4.3546 7.52999 4.6146L1.99 10.1546C1.66333 10.4813 1.66333 11.0079 1.99 11.3346C2.31666 11.6613 2.84333 11.6613 3.17 11.3346L8.00333 6.50794L12.8367 11.3413C13.1567 11.6613 13.69 11.6613 14.01 11.3346Z"
        style={{ fill: SwitchTheme(isTheme).textMain }}
      />
    </Svg>
  )
}

export default FabIcons
