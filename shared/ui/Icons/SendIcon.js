import Svg, { G, Path, Rect } from 'react-native-svg'

const SendIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.9482 3.23906C5.3284 2.90532 4.57878 2.92199 3.97443 3.28297C3.37008 3.64394 3 4.29605 3 5V19C3 19.7039 3.37008 20.3561 3.97443 20.717C4.57878 21.078 5.3284 21.0947 5.9482 20.7609L18.9482 13.7609C19.596 13.4121 20 12.7358 20 12C20 11.2642 19.596 10.5879 18.9482 10.2391L5.9482 3.23906ZM5 19V14L12 12L5 10V5L18 12L5 19Z"
        fill="#001E2F"
      />
    </Svg>
  )
}

export default SendIcon
