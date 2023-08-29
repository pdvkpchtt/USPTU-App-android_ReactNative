import AboutIcon from '../shared/ui/Icons/AboutIcon'
import DecorationIcon from '../shared/ui/Icons/DecorationIcon'
import MovementDataIcon from '../shared/ui/Icons/MovementDataIcon'
import PersonalDataIcon from '../shared/ui/Icons/PersonalDataIcon'
import ResourcesIcon from '../shared/ui/Icons/ResourcesIcon'

const navListConfigDemo = (navigation) => {
  return [
    [
      {
        name: 'Персональная информация',
        icon: <PersonalDataIcon />,
        onPress: () => {
          navigation.navigate('Персональная информация')
        },
      },
      {
        name: 'Сведения о движении',
        icon: <MovementDataIcon />,
        onPress: () => {
          navigation.navigate('Сведения о движении')
        },
      },
    ],

    [
      {
        name: 'Ресурсы',
        icon: <ResourcesIcon />,
        onPress: () => {
          navigation.navigate('Ресурсы')
        },
      },
      {
        name: 'О приложении',
        icon: <AboutIcon />,
        onPress: () => {
          navigation.navigate('О приложении')
        },
      },
    ],
    [
      {
        name: 'Оформление',
        icon: <DecorationIcon />,
        onPress: () => {
          navigation.navigate('Оформление')
        },
      },
    ],
  ]
}

export default navListConfigDemo
