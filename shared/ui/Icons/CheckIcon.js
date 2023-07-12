import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const CheckIcon = ({ props, pressed }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.80001 15.905L5.30001 12.405C4.91001 12.015 4.29001 12.015 3.90001 12.405C3.51001 12.795 3.51001 13.415 3.90001 13.805L8.09001 17.995C8.48001 18.385 9.11001 18.385 9.50001 17.995L20.1 7.40502C20.49 7.01502 20.49 6.39502 20.1 6.00502C19.71 5.61502 19.09 5.61502 18.7 6.00502L8.80001 15.905Z"
        fill={
          pressed
            ? isTheme.includes('theme_usual')
              ? SwitchTheme(isTheme).hoverBlue
              : SwitchTheme(isTheme).hoverEffect
            : SwitchTheme(isTheme).textbutton1
        }
      />
    </Svg>
  )
}

export default CheckIcon
