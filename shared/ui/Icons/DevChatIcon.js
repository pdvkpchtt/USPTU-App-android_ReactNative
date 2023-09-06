import React from 'react'
import Svg, { G, Path, Rect, Pattern, Use, Image, Defs, ClipPath } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const DevChatIcon = ({ props, color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <G clip-path="url(#clip0_8241_22129)">
        <Rect width="24" height="24" fill="url(#pattern0)" />
      </G>
      <Defs>
        <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <Use xlinkHref="#image0_8241_22129" transform="translate(-0.126223 -0.125) scale(0.000305773)" />
        </Pattern>
        <ClipPath id="clip0_8241_22129">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
        <Image
          id="image0_8241_22129"
          width="4096"
          height="4088"
        />
      </Defs>
    </Svg>
  )
}

export default DevChatIcon