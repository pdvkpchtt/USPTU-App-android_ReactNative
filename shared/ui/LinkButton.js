import { Pressable, View } from 'react-native'
import TextBody from './Text/TextBody'
import TextSmall from './Text/TextSmall'
export default function LinkButton(props) {
  return (
    <Pressable onPress={props.onPress || null}>
      {({ pressed }) => {
        return (
          <View
            style={{
              backgroundColor: pressed ? props.bgpressed : props.bg,
              paddingVertical: 4,
              paddingHorizontal: 16,
              width: '100%',
              borderRadius: 24,
              marginTop: 11,
              ...props,
            }}
          >
            <TextSmall secondary color={props.color || 'white'} letterSpacing={-0.078} fontFamily={'Roboto-Regular'}>
              {props.children}
            </TextSmall>
          </View>
        )
      }}
    </Pressable>
  )
}

// font-family: 'SF Pro Text';
// font-style: normal;
// font-weight: 600;
// font-size: 13px;
// line-height: 18px;
// /* identical to box height, or 138% */

// display: flex;
// align-items: center;
// text-align: center;
// letter-spacing: -0.078px;
