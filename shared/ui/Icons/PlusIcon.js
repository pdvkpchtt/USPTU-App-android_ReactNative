import React from 'react'
import Svg, { G, Path, Rect, Defs, ClipPath } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

const PlusIcon = ({ fill }) => {
  const isTheme = useThemeStore((state) => state.theme)

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_6604_22389)">
        <Path
          d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
          fill={fill ? fill : SwitchTheme(isTheme).tabBarInactiveTintColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_6604_22389">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default PlusIcon
