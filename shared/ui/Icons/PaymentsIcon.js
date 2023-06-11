import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const PaymentsIcon = ({ props, color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.00146 21C8.55146 21 9.00146 20.55 9.00146 20V18H12.0015C12.5515 18 13.0015 17.55 13.0015 17C13.0015 16.45 12.5515 16 12.0015 16H9.00146V14H13.5015C16.7215 14 19.2915 11.24 18.9715 7.96C18.7015 5.1 16.1415 3 13.2615 3H8.00146C7.45146 3 7.00146 3.45 7.00146 4V12H6.00146C5.45146 12 5.00146 12.45 5.00146 13C5.00146 13.55 5.45146 14 6.00146 14H7.00146V16H6.00146C5.45146 16 5.00146 16.45 5.00146 17C5.00146 17.55 5.45146 18 6.00146 18H7.00146V20C7.00146 20.55 7.45146 21 8.00146 21ZM13.5015 12H9.00146V5H13.5015C15.4315 5 17.0015 6.57 17.0015 8.5C17.0015 10.43 15.4315 12 13.5015 12Z"
        fill="#4CCA37"
      />
    </Svg>
  )
}

export default PaymentsIcon
