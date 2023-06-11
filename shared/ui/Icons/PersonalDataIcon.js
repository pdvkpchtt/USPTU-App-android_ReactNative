import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const PersonalDataIcon = ({ props, color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg viewBox="0 0 28 28" width="28" height="28">
      <G {...props}>
        <Rect width="28" height="28" rx="6" fill="#007AFF" />
        <Path
          d="M14 22.6812C18.748 22.6812 22.6577 18.7632 22.6577 14.0234C22.6577 9.27539 18.7397 5.35742 13.9917 5.35742C9.25195 5.35742 5.34229 9.27539 5.34229 14.0234C5.34229 18.7632 9.25195 22.6812 14 22.6812ZM14 13.708C12.7964 13.6997 11.8169 12.687 11.8169 11.3257C11.8169 10.0557 12.7964 9.00146 14 9.00146C15.2036 9.00146 16.1831 10.0557 16.1831 11.3257C16.1831 12.687 15.2036 13.7163 14 13.708ZM10.2646 18.3232C9.85791 18.3232 9.65869 18.041 9.65869 17.6841C9.65869 16.7544 11.0117 14.3721 14 14.3721C16.9883 14.3721 18.3413 16.7544 18.3413 17.6841C18.3413 18.041 18.1504 18.3232 17.7437 18.3232H10.2646Z"
          fill="white"
        />
      </G>
    </Svg>
  )
}

export default PersonalDataIcon
