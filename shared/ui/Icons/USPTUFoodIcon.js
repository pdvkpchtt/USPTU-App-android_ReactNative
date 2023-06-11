import React from 'react'
import Svg, { G, Path, Rect, Mask } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const USPTUFoodIcon = ({ props, color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Mask id="mask0_7503_31169" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_7503_31169)">
        <Path
          d="M7 22V12.85C6.15 12.6167 5.4375 12.15 4.8625 11.45C4.2875 10.75 4 9.93333 4 9V2H6V9H7V2H9V9H10V2H12V9C12 9.93333 11.7125 10.75 11.1375 11.45C10.5625 12.15 9.85 12.6167 9 12.85V22H7ZM17 22V14H14V7C14 5.61667 14.4875 4.4375 15.4625 3.4625C16.4375 2.4875 17.6167 2 19 2V22H17Z"
          fill="#FF9500"
        />
      </G>
    </Svg>
  )
}

export default USPTUFoodIcon
