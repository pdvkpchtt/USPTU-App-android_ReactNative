import React, { useRef, useState } from 'react'
import { Path } from 'react-native-svg'

import Animated, { Easing, useAnimatedProps } from 'react-native-reanimated'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const AnimatedText = ({ d, stroke, strokeWidth, fill, progress, progressOpacity }) => {
  const [length, setLength] = useState(0)
  const ref = useRef(null)
  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.bezier(0.37, 0, 0.63, 1).factory()(progress.value),
    fillOpacity: progressOpacity.value,
  }))

  const animatedBGProps = useAnimatedProps(() => ({
    strokeDashoffset: length + 10 - length * Easing.bezier(0.85, 0.8, 0.15, 1).factory()(progress.value),
    fillOpacity: progress.value,
  }))

  return (
    <>
      <AnimatedPath
        animatedProps={animatedBGProps}
        ref={ref}
        d={d}
        stroke={'#007AFF'}
        strokeWidth={strokeWidth}
        strokeDasharray={length}
        strokeDashoffset={0}
      />
      <AnimatedPath
        animatedProps={strokeAnimation}
        onLayout={() => setLength(ref.current.getTotalLength())}
        ref={ref}
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        strokeDasharray={length}
        strokeDashoffset={0}
        fillOpacity={0}
      />
    </>
  )
}

export default AnimatedText
