import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const FilesIcon = ({ props, color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg viewBox="0 0 28 28" width="28" height="28">
      <G {...props}>
        <Rect width="28" height="28" rx="6" fill="#5AC8FA" />
        <Path
          d="M4.4209 11.2095H23.5708V10.4043C23.5708 8.58643 22.5913 7.61523 20.7651 7.61523H13.228C12.6138 7.61523 12.2402 7.47412 11.7505 7.08398L11.3022 6.71875C10.6963 6.2373 10.2563 6.07129 9.35156 6.07129H7.01904C5.40039 6.07129 4.4209 7.03418 4.4209 8.83545V11.2095ZM4.4209 18.9541C4.4209 20.772 5.40039 21.7432 7.23486 21.7432H20.9395C22.5996 21.7432 23.5708 20.772 23.5708 18.9541V12.4795H4.4209V18.9541Z"
          fill="white"
        />
      </G>
    </Svg>
  )
}

export default FilesIcon
