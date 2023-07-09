import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { useUserStore } from '../user'
import { BoxComponent } from './ui/BoxComponent'

export const NameBlock = ({ navigation }) => {
  const { getFullName, getCurrentData } = useUserStore((state) => ({
    getFullName: state.getFullName,
    getCurrentData: state.getCurrentData,
  }))

  const [counterForOpenEasterEgg, setCounterForOpenEasterEgg] = useState(0)

  useEffect(() => {
    if (counterForOpenEasterEgg >= 5) {
      navigation.navigate('Пасхалка')
      setCounterForOpenEasterEgg(0)
    }
  }, [counterForOpenEasterEgg])

  return (
    <Pressable
      onPress={() => {
        setCounterForOpenEasterEgg(counterForOpenEasterEgg + 1)
      }}
    >
      <BoxComponent
        name={getFullName()}
        department={getCurrentData().department}
        speciality={getCurrentData().speciality}
      />
    </Pressable>
  )
}
