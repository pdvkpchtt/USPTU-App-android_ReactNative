import { Animated, View, Pressable } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import TextMain from './Text/TextMain'
import { useRef } from 'react'

const NoteCard = ({ onPress = () => {}, text = '' }) => {
  const Anim = useRef(new Animated.Value(1)).current
  const isTheme = useThemeStore((state) => state.theme)

  const AnimIn = () => {
    Animated.timing(Anim, {
      toValue: 0.96,
      duration: 300,
      useNativeDriver: true,
    }).start()
    setTimeout(() => {
      Animated.timing(Anim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start()
    }, 400)
  }
  const AnimOut = () => {
    Animated.timing(Anim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View style={{ marginTop: 4, paddingHorizontal: 12, transform: [{ scale: Anim }] }}>
      <Pressable
        onLongPress={onPress}
        onPressIn={() => AnimIn()}
        onPressOut={() => AnimOut()}
        delayLongPress={400}
        unstable_pressDelay={100}
      >
        <View
          style={{
            backgroundColor: SwitchTheme(isTheme).bgItem,
            borderRadius: 20,
            paddingHorizontal: 16,
            // marginTop: -12,
            paddingVertical: 12,
          }}
        >
          <TextMain textAlign="left">{text}</TextMain>
        </View>
      </Pressable>
    </Animated.View>
  )
}

export default NoteCard
