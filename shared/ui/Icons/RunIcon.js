import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

const RunIcon = ({ props }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M10 17L15 12L10 7V17Z" fill={SwitchTheme(isTheme).tabBarInactiveTintColor} {...props} />
    </Svg>
  )
}

export default RunIcon
