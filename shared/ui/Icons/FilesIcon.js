import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const FilesIcon = ({ props, color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M20 6.49994H12L10.59 5.08994C10.21 4.70994 9.7 4.49994 9.17 4.49994H4C2.9 4.49994 2.01 5.39994 2.01 6.49994L2 18.4999C2 19.5999 2.9 20.4999 4 20.4999H20C21.1 20.4999 22 19.5999 22 18.4999V8.49994C22 7.39994 21.1 6.49994 20 6.49994ZM19 18.4999H5C4.45 18.4999 4 18.0499 4 17.4999V9.49994C4 8.94994 4.45 8.49994 5 8.49994H19C19.55 8.49994 20 8.94994 20 9.49994V17.4999C20 18.0499 19.55 18.4999 19 18.4999Z"
        fill="#2DAEF0"
      />
    </Svg>
  )
}

export default FilesIcon
