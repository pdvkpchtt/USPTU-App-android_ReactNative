import MessagesIcon from '../../../shared/ui/Icons/MessagesIcon'
import MovementDataIcon from '../../../shared/ui/Icons/MovementDataIcon'
import MyWorksIcon from '../../../shared/ui/Icons/MyWorksIcon'
import PersonalDataIcon from '../../../shared/ui/Icons/PersonalDataIcon'
import InstructionEducatorIcon from '../../../shared/ui/Icons/InstructionEducatorIcon'
import FilesIcon from '../../../shared/ui/Icons/FilesIcon'
import StudyPlanIcon from '../../../shared/ui/Icons/StudyPlanIcon'
import USPTUFoodIcon from '../../../shared/ui/Icons/USPTUFoodIcon'
import StudyHostelIcon from '../../../shared/ui/Icons/StudyHostelIcon'
import PaymentsIcon from '../../../shared/ui/Icons/PaymentsIcon'
import ResourcesIcon from '../../../shared/ui/Icons/ResourcesIcon'
import AboutIcon from '../../../shared/ui/Icons/AboutIcon'
import DevIcon from '../../../shared/ui/Icons/DevIcon'
import DevChatIcon from '../../../shared/ui/Icons/DevChatIcon'
import * as Linking from 'expo-linking'
import DecorationIcon from '../../../shared/ui/Icons/DecorationIcon'
import MailIcon from '../../../shared/ui/Icons/MailIcon'

const navListConfig = (navigation) => {
  return [
    [
      {
        name: 'Персональные данные',
        icon: <PersonalDataIcon />,
        onPress: () => {
          navigation.navigate('Персональные данные')
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
        name: 'Мои работы',
        icon: <MyWorksIcon />,
        onPress: () => {
          navigation.navigate('Мои работы')
        },
      },

      {
        name: 'Сообщения',
        icon: <MessagesIcon />,
        onPress: () => {
          navigation.navigate('Сообщения')
        },
      },
      {
        name: 'Файлы',
        icon: <FilesIcon />,
        onPress: () => {
          navigation.navigate('Файлы')
        },
      },
      {
        name: 'Указания от преподавателей',
        icon: <InstructionEducatorIcon />,
        onPress: () => {
          navigation.navigate('Указания от преподавателей')
        },
      },
      {
        name: 'Учебный план',
        icon: <StudyPlanIcon />,
        onPress: () => {
          navigation.navigate('Учебный план')
        },
      },
    ],
    // [
    //   {
    //     name: 'USPTU Food',
    //     icon: <USPTUFoodIcon />,
    //     onPress: () => {
    //       navigation.navigate('USPTU Food')
    //     },
    //   },
    // ],
    [
      {
        name: 'Общежитие',
        icon: <StudyHostelIcon />,
        onPress: () => {
          navigation.navigate('Общежитие')
        },
      },
      {
        name: 'Выплаты',
        icon: <PaymentsIcon />,
        onPress: () => {
          navigation.navigate('Выплаты')
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

export const aboutConfig = [
  {
    name: 'USPTU Dev Telegram',
    icon: <DevIcon />,
    onPress: () => {
      Linking.openURL('https://t.me/usptudev')
    },
  },
  {
    name: 'USPTU Dev Chat Telegram',
    icon: <DevChatIcon />,
    onPress: () => {
      Linking.openURL('https://t.me/usptudevchat')
    },
  },
  {
    name: 'Почта rusoil',
    icon: <MailIcon />,
    onPress: () => {
      Linking.openURL('mailto:oau@rusoil.net?subject=Личный кабинет студента. Мобильное приложение&body=')
    },
  },
]

export default navListConfig
