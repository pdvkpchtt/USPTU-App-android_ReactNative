import React, { useRef, useState } from 'react'
import { View } from 'native-base'
import { Path } from 'react-native-svg'

import Animated, { Easing, useAnimatedProps } from 'react-native-reanimated'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const AnimatedLogo = ({ d, strokeWidth, progress, progressOpacity, progressOpacityStroke, style }) => {
  const [length, setLength] = useState(0)
  const ref = useRef(null)
  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.bezier(0.37, 0, 0.63, 1).factory()(progress.value),
    fillOpacity: progressOpacity.value,
    strokeWidth: strokeWidth.value,
    strokeOpacity: progressOpacityStroke.value,
  }))

  const animatedBGProps = useAnimatedProps(() => ({
    strokeDashoffset: length + 10 - length * Easing.bezier(0.85, 1, 0.15, 1).factory()(progress.value),
    fillOpacity: progress.value,
    strokeWidth: strokeWidth.value - 2,
    strokeOpacity: progressOpacityStroke.value,
  }))

  return (
    <>
      <AnimatedPath
        animatedProps={animatedBGProps}
        ref={ref}
        d={d}
        stroke={'#007AFF'}
        strokeWidth={0}
        strokeDashoffset={0}
        fillOpacity={0}
        strokeDasharray={length}
        strokeOpacity={0}
      />
      <AnimatedPath
        style={style}
        animatedProps={strokeAnimation}
        onLayout={() => setLength(ref.current.getTotalLength())}
        ref={ref}
        d={d}
        strokeWidth={0}
        strokeDasharray={length}
        strokeDashoffset={0}
        fillOpacity={0}
        strokeOpacity={0}
      />
    </>
  )
}

export default AnimatedLogo
