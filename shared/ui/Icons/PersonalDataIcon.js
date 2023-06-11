import React from 'react'
import Svg, { G, Path, Rect, Defs, ClipPath } from 'react-native-svg'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
const PersonalDataIcon = ({ props, color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_7501_9366)">
        <Path
          d="M10.25 13.5C10.25 14.19 9.69 14.75 9 14.75C8.31 14.75 7.75 14.19 7.75 13.5C7.75 12.81 8.31 12.25 9 12.25C9.69 12.25 10.25 12.81 10.25 13.5ZM15 12.25C14.31 12.25 13.75 12.81 13.75 13.5C13.75 14.19 14.31 14.75 15 14.75C15.69 14.75 16.25 14.19 16.25 13.5C16.25 12.81 15.69 12.25 15 12.25ZM22 12.5C22 18.02 17.52 22.5 12 22.5C6.48 22.5 2 18.02 2 12.5C2 6.97997 6.48 2.49997 12 2.49997C17.52 2.49997 22 6.97997 22 12.5ZM10.66 4.61997C12.06 6.93997 14.6 8.49997 17.5 8.49997C17.96 8.49997 18.41 8.44997 18.84 8.37997C17.44 6.05997 14.9 4.49997 12 4.49997C11.54 4.49997 11.09 4.54997 10.66 4.61997ZM4.42 9.96997C6.13 8.99997 7.45 7.41997 8.08 5.52997C6.37 6.49997 5.05 8.07997 4.42 9.96997ZM20 12.5C20 11.72 19.88 10.97 19.67 10.26C18.97 10.41 18.25 10.5 17.5 10.5C14.37 10.5 11.58 9.05997 9.74 6.80997C8.69 9.36997 6.6 11.38 4 12.36C4.01 12.4 4 12.45 4 12.5C4 16.91 7.59 20.5 12 20.5C16.41 20.5 20 16.91 20 12.5Z"
          fill="#2259C9"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_7501_9366">
          <Rect width="24" height="24" fill="white" transform="translate(0 0.499969)" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default PersonalDataIcon
