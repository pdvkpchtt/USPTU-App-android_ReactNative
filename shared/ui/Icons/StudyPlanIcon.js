import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const StudyPlanIcon = ({ props, color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg viewBox="0 0 28 28" width="28" height="28">
      <G {...props}>
        <Rect width="28" height="28" rx="6" fill="#FF9500" />
        <Path
          d="M14 22.6646C18.748 22.6646 22.6577 18.7549 22.6577 14.0068C22.6577 9.26709 18.7397 5.34912 13.9917 5.34912C9.25195 5.34912 5.34229 9.26709 5.34229 14.0068C5.34229 18.7549 9.25195 22.6646 14 22.6646ZM9.91602 15.144C9.50928 15.144 9.19385 14.8203 9.19385 14.4219C9.19385 14.0151 9.50928 13.6997 9.91602 13.6997H13.2778V9.10107C13.2778 8.69434 13.5933 8.37891 13.9917 8.37891C14.3984 8.37891 14.7139 8.69434 14.7139 9.10107V14.4219C14.7139 14.8203 14.3984 15.144 13.9917 15.144H9.91602Z"
          fill="white"
        />
      </G>
    </Svg>
  )
}

export default StudyPlanIcon
