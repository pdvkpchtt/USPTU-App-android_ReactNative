import React from 'react'
import Svg, { G, Path, Rect } from 'react-native-svg'
const EducatorIcon = ({ props, color }) => {
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M12 6.4C13.16 6.4 14.1 7.34 14.1 8.5C14.1 9.66 13.16 10.6 12 10.6C10.84 10.6 9.9 9.66 9.9 8.5C9.9 7.34 10.84 6.4 12 6.4ZM12 15.4C14.97 15.4 18.1 16.86 18.1 17.5V18.6H5.9V17.5C5.9 16.86 9.03 15.4 12 15.4ZM12 4.5C9.79 4.5 8 6.29 8 8.5C8 10.71 9.79 12.5 12 12.5C14.21 12.5 16 10.71 16 8.5C16 6.29 14.21 4.5 12 4.5ZM12 13.5C9.33 13.5 4 14.84 4 17.5V19.5C4 20.05 4.45 20.5 5 20.5H19C19.55 20.5 20 20.05 20 19.5V17.5C20 14.84 14.67 13.5 12 13.5Z"
        fill={color}
      />
    </Svg>
  )
}

export default EducatorIcon
