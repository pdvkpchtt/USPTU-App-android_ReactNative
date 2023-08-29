import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import { BoxComponent } from '../../entities/NameBlock/ui/BoxComponent'

export const DemoNameBlock = ({ navigation }) => {
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
      <BoxComponent name={'Иван Иванов'} department={'ГНФ'} speciality={'Теплоэнергетика в нефтегазовой отрасли'} />
    </Pressable>
  )
}
