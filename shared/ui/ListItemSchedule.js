import { useEffect, useState } from 'react'
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DefaultButton from './defaultButton'
import capitalize from '../utils/capitalize'
import Divider from './Divider'
import * as Clipboard from 'expo-clipboard'
import LinkButton from './LinkButton'
import ListItem from './ListItem'
import TextMain from './Text/TextMain'
import TextMiddle from './Text/TextMiddle'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')
moment.weekdays(true)

const ListItemSchedule = ({ item, index }) => {
  const [timer, setTimer] = useState(null)

  const isTheme = useThemeStore((state) => state.theme)
  // console.log(item)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeStart = moment(item[0].start_time + ' ' + item[0].ddate, 'HH:mm DD.MM.YYYY')
      const timeEnd = moment(item[0].end_time + ' ' + item[0].ddate, 'HH:mm DD.MM.YYYY')
      const durationStart = moment.duration(timeStart.diff(moment()), 'seconds').asSeconds()

      // calculate total duration
      const diffStart = moment(item[0].start_time + ' ' + item[0].ddate, 'HH:mm DD.MM.YYYY').diff(
        moment(),
        'hours',
        'true'
      )
      const diffEnd = moment(item[0].end_time + ' ' + item[0].ddate, 'HH:mm DD.MM.YYYY').diff(
        moment(),
        'minutes',
        'true'
      )
      // console.log(diffEnd, diffStart)
      if (diffStart < 8 && diffStart > 1) {
        setTimer('до начала ' + moment.utc(durationStart).format('HH:mm:ss'))
      } else if (diffStart < 1 && diffStart > 0) {
        setTimer('до начала ' + moment.utc(durationStart).format('mm:ss'))
      }
      if (diffEnd > 50 && diffEnd < 95) {
        const duration = moment.duration(timeEnd.clone().subtract(50, 'minutes').diff(moment()), 'seconds').asSeconds()
        setTimer('до перерыва ' + moment.utc(duration).format('mm:ss'))
      }
      if (diffEnd > 45 && diffEnd < 50) {
        const duration = moment.duration(timeEnd.clone().subtract(45, 'minutes').diff(moment()), 'seconds').asSeconds()
        setTimer('перерыв ' + moment.utc(duration).format('mm:ss'))
      }
      if (diffEnd > 0 && diffEnd < 45) {
        const duration = moment.duration(timeEnd.clone().diff(moment()), 'seconds').asSeconds()
        setTimer('до конца ' + moment.utc(duration).format('mm:ss'))
      }
      if ((diffStart < 0 && diffEnd < 0) || diffStart > 8) {
        setTimer(null)
      }
    }, 1000)

    return () => clearInterval(intervalId) //This is important
  }, [])

  const lessonTypeValidator = (type) => {
    switch (type) {
      case 'ЛЕК':
        return {
          lessonType: 'лекция',
          typeColor: SwitchTheme(isTheme).typeColorlec,
          pressedColor: SwitchTheme(isTheme).typeColorlecpressed,
        }
      case 'ПР':
        return {
          lessonType: 'практика',
          typeColor: SwitchTheme(isTheme).typeColorprac,
          pressedColor: SwitchTheme(isTheme).typeColorpracpressed,
        }
      case 'ЛАБ':
        return {
          lessonType: 'лабораторная',
          typeColor: SwitchTheme(isTheme).typeColorlab,
          pressedColor: SwitchTheme(isTheme).typeColorlabpressed,
        }
      case 'ЗАЧ':
        return {
          lessonType: 'зачет',
          typeColor: SwitchTheme(isTheme).typeColorzach,
          pressedColor: SwitchTheme(isTheme).typeColorzachpressed,
        }
      case 'ЭКЗ':
        return {
          lessonType: 'экзамен',
          typeColor: SwitchTheme(isTheme).typeColorekz,
          pressedColor: SwitchTheme(isTheme).typeColorekzpressed,
        }
      case 'КОНС':
        return {
          lessonType: 'консультация',
          typeColor: SwitchTheme(isTheme).typeColorkons,
          pressedColor: SwitchTheme(isTheme).typeColorkonspressed,
        }
      default:
        return {
          lessonType: 'прочее',
          typeColor: SwitchTheme(isTheme).typeColorproch,
          pressedColor: SwitchTheme(isTheme).typeColorprochpressed,
        }
    }
  }

  const auditoriumTypeValidator = (auditorium, teacher_name, link) => {
    if (auditorium && teacher_name) {
      return {
        auditoriumType: auditorium.split(';')[0] + ' \u00B7 ' + teacher_name.split('.')[0],
      }
    }
    if (link && teacher_name && link.includes('http'))
      return {
        auditoriumType: 'Онлайн пара \u00B7 ' + teacher_name.split('.')[0],
      }
    return {
      auditoriumType: teacher_name.split('.')[0],
    }
  }

  const linkValidator = (link) => {
    if (link && link.includes('http')) {
      let domain = link.split('://')[1]
      domain = domain.split('/')[0]
      const parts = domain.split('.')
      let site = capitalize(parts[parts.length - 2])

      if (site === 'Rusoil') {
        site = 'do.rusoil'
      }
      return 'Перейти в ' + site
    }

    return link
  }

  const { lessonType, typeColor, pressedColor } = lessonTypeValidator(item.type)
  // //console.log(item.type)

  const lessonsValidator = (item) => {
    if (item.length === 1) {
      return (
        <>
          {/* Добавить время */}
          {timer ? (
            <View>
              <TextMain>{timer}</TextMain>
            </View>
          ) : null}
          {item[0].discipline_name.length > 2 ? <TextMain secondary>{item[0].discipline_name}</TextMain> : null}
          {item[0].podgruppa ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                  {item[0].podgruppa + ' подгруппа'}
                </TextMiddle>
              </View>
            </View>
          ) : null}
          <View style={styles.rows1_type_subject}>
            <View style={styles.rows2_type_subject}>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].paraclockid + ' ' + lessonTypeValidator(item[0].type).lessonType + ' \u00B7 '}
              </TextMiddle>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].start_time + ' – ' + item[0].end_time}
              </TextMiddle>
            </View>
          </View>
          <View style={styles.rows1_type_pair}>
            <View style={styles.rows2_type_pair}>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>
                {auditoriumTypeValidator(item[0].auditorium, item[0].teacher_name, item[0].link).auditoriumType}
              </TextMiddle>
            </View>
            <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
          </View>
          {item[0].link.length > 2 && item[0].auditorium === '' ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <LinkButton
                  onPress={() => {
                    Linking.openURL(item[0].link)
                  }}
                  bg={lessonTypeValidator(item[0].type).typeColor}
                  bgpressed={lessonTypeValidator(item[0].type).pressedColor}
                  color={'#fff'}
                >
                  {linkValidator(item[0].link)}
                </LinkButton>
              </View>
              <LinkButton
                onPress={() => {
                  Clipboard.setStringAsync(item[0].link)
                  Toast.show({
                    type: 'custom',
                    text1: 'Скопировано в буфер обмена',
                  })
                }}
                bg={SwitchTheme(isTheme).bgItem}
                bgpressed={SwitchTheme(isTheme).bgItem}
                color={lessonTypeValidator(item[0].type).typeColor}
                colorPressed={lessonTypeValidator(item[0].type).pressedColor}
                isCopy
              >
                {'Скопировать'}
              </LinkButton>
            </View>
          ) : null}
        </>
      )
    }

    if (item.length === 2 && item[0].discipline_name === item[1].discipline_name && item[0].type === item[1].type) {
      return (
        <>
          {/* Добавить время */}
          {timer ? (
            <View>
              <TextMain>{timer}</TextMain>
            </View>
          ) : null}
          {item[0].discipline_name.length > 2 ? <TextMain secondary>{item[0].discipline_name}</TextMain> : null}
          {item[0].podgruppa ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                  {item[0].podgruppa + ' подгруппа'}
                </TextMiddle>
              </View>
            </View>
          ) : null}

          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>
                {auditoriumTypeValidator(item[0].auditorium, item[0].teacher_name).auditoriumType}
              </TextMiddle>
            </View>
            <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
          </View>
          {item[0].link.length > 2 && item[0].auditorium === '' ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <LinkButton
                  onPress={() => {
                    Linking.openURL(item[0].link)
                  }}
                  bg={lessonTypeValidator(item[0].type).typeColor}
                  bgpressed={lessonTypeValidator(item[0].type).pressedColor}
                  color={'#fff'}
                >
                  {linkValidator(item[0].link)}
                </LinkButton>
              </View>
              <LinkButton
                onPress={() => {
                  Clipboard.setStringAsync(item[0].link)
                  Toast.show({
                    description: 'Скопировано в буфер обмена',
                    placement: 'top',
                    duration: 1000,
                  })
                }}
                bg={SwitchTheme(isTheme).bgItem}
                bgpressed={SwitchTheme(isTheme).bgItem}
                color={lessonTypeValidator(item[0].type).typeColor}
                colorPressed={lessonTypeValidator(item[0].type).pressedColor}
                isCopy
              >
                {'Скопировать'}
              </LinkButton>
            </View>
          ) : null}
          <View style={styles.dividertop}>
            <Divider />
          </View>
          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].paraclockid + ' ' + lessonTypeValidator(item[0].type).lessonType + ' \u00B7 '}
              </TextMiddle>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].start_time + ' – ' + item[0].end_time}
              </TextMiddle>
            </View>
          </View>

          {/* 2 подгруппа  */}
          <View style={styles.dividerbottom}>
            <Divider />
          </View>

          {/* 2 подгруппа  */}

          <>
            {item[1].podgruppa ? (
              <View style={styles.rows1}>
                <View style={styles.rows2}>
                  <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                    {item[1].podgruppa + ' подгруппа'}
                  </TextMiddle>
                </View>
              </View>
            ) : null}
            <View style={styles.rows1_type_pair}>
              <View style={styles.rows2_type_pair}>
                <TextMiddle color={SwitchTheme(isTheme).textSec}>
                  {auditoriumTypeValidator(item[1].auditorium, item[1].teacher_name).auditoriumType}
                </TextMiddle>
              </View>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
            </View>
            {item[1].link.length > 2 && item[1].auditorium === '' ? (
              <View style={styles.rows1}>
                <View style={styles.rows2}>
                  <LinkButton
                    onPress={() => {
                      Linking.openURL(item[1].link)
                    }}
                    bg={lessonTypeValidator(item[1].type).typeColor}
                    bgpressed={lessonTypeValidator(item[1].type).pressedColor}
                    color={'#fff'}
                  >
                    {linkValidator(item[1].link)}
                  </LinkButton>
                </View>
                <LinkButton
                  onPress={() => {
                    Clipboard.setStringAsync(item[1].link)
                    Toast.show({
                      description: 'Скопировано в буфер обмена',
                      placement: 'top',
                      duration: 1000,
                    })
                  }}
                  bg={SwitchTheme(isTheme).bgItem}
                  bgpressed={SwitchTheme(isTheme).bgItem}
                  color={lessonTypeValidator(item[1].type).typeColor}
                  colorPressed={lessonTypeValidator(item[1].type).pressedColor}
                  isCopy
                >
                  {'Скопировать'}
                </LinkButton>
              </View>
            ) : null}
          </>
        </>
      )
    }

    if (item.length === 2 && item[0].type === item[1].type) {
      return (
        <>
          {/* Добавить время */}
          {timer ? (
            <View>
              <TextMain>{timer}</TextMain>
            </View>
          ) : null}
          {item[0].discipline_name.length > 2 ? <TextMain secondary>{item[0].discipline_name}</TextMain> : null}
          {item[0].podgruppa ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                  {item[0].podgruppa + ' подгруппа'}
                </TextMiddle>
              </View>
            </View>
          ) : null}

          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>
                {auditoriumTypeValidator(item[0].auditorium, item[0].teacher_name).auditoriumType}
              </TextMiddle>
            </View>
            <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
          </View>
          {item[0].link.length > 2 && item[0].auditorium === '' ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <LinkButton
                  onPress={() => {
                    Linking.openURL(item[0].link)
                  }}
                  bg={lessonTypeValidator(item[0].type).typeColor}
                  bgpressed={lessonTypeValidator(item[0].type).pressedColor}
                  color={'#fff'}
                >
                  {linkValidator(item[0].link)}
                </LinkButton>
              </View>
              <LinkButton
                onPress={() => {
                  Clipboard.setStringAsync(item[0].link)
                  Toast.show({
                    description: 'Скопировано в буфер обмена',
                    placement: 'top',
                    duration: 1000,
                  })
                }}
                bg={SwitchTheme(isTheme).bgItem}
                bgpressed={SwitchTheme(isTheme).bgItem}
                color={lessonTypeValidator(item[0].type).typeColor}
                colorPressed={lessonTypeValidator(item[0].type).pressedColor}
                isCopy
              >
                {'Скопировать'}
              </LinkButton>
            </View>
          ) : null}
          <View style={styles.dividertop}>
            <Divider />
          </View>
          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].paraclockid + ' ' + lessonTypeValidator(item[0].type).lessonType + ' \u00B7 '}
              </TextMiddle>
              <TextMiddle secondary color={lessonTypeValidator(item[0].type).typeColor}>
                {item[0].start_time + ' – ' + item[0].end_time}
              </TextMiddle>
            </View>
          </View>

          {/* 2 подгруппа  */}

          <>
            <View style={styles.dividerbottom}>
              <Divider />
            </View>
            {item[1].discipline_name.length > 2 ? <TextMain secondary>{item[1].discipline_name}</TextMain> : null}
            {item[1].podgruppa ? (
              <View style={styles.rows1}>
                <View style={styles.rows2}>
                  <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                    {item[1].podgruppa + ' подгруппа'}
                  </TextMiddle>
                </View>
              </View>
            ) : null}
            <View style={styles.rows1_type_pair}>
              <View style={styles.rows2_type_pair}>
                <TextMiddle color={SwitchTheme(isTheme).textSec}>
                  {auditoriumTypeValidator(item[1].auditorium, item[1].teacher_name).auditoriumType}
                </TextMiddle>
              </View>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
            </View>
            {item[1].link.length > 2 && item[1].auditorium === '' ? (
              <View style={styles.rows1}>
                <View style={styles.rows2}>
                  <LinkButton
                    onPress={() => {
                      Linking.openURL(item[1].link)
                    }}
                    bg={lessonTypeValidator(item[1].type).typeColor}
                    bgpressed={lessonTypeValidator(item[1].type).pressedColor}
                    color={'#fff'}
                  >
                    {linkValidator(item[1].link)}
                  </LinkButton>
                </View>
                <LinkButton
                  onPress={() => {
                    Clipboard.setStringAsync(item[1].link)
                    Toast.show({
                      description: 'Скопировано в буфер обмена',
                      placement: 'top',
                      duration: 1000,
                    })
                  }}
                  bg={SwitchTheme(isTheme).bgItem}
                  bgpressed={SwitchTheme(isTheme).bgItem}
                  color={lessonTypeValidator(item[1].type).typeColor}
                  colorPressed={lessonTypeValidator(item[1].type).pressedColor}
                  isCopy
                >
                  {'Скопировать'}
                </LinkButton>
              </View>
            ) : null}
          </>
        </>
      )
    }

    if (item.length > 2 || (item.length === 2 && item[0].type !== item[1].type)) {
      return item.map((lesson, index) => (
        <>
          {timer ? (
            <View>
              <TextMain>{timer}</TextMain>
            </View>
          ) : null}
          {lesson.discipline_name.length > 2 ? <TextMain secondary>{lesson.discipline_name}</TextMain> : null}
          {lesson.podgruppa ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <TextMiddle color={SwitchTheme(isTheme).textSec} secondary>
                  {lesson.podgruppa + ' подгруппа'}
                </TextMiddle>
              </View>
            </View>
          ) : null}
          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle secondary color={lessonTypeValidator(lesson.type).typeColor}>
                {lesson.paraclockid + ' ' + lessonTypeValidator(lesson.type).lessonType + ' \u00B7 '}
              </TextMiddle>
              <TextMiddle secondary color={lessonTypeValidator(lesson.type).typeColor}>
                {lesson.start_time + ' – ' + lesson.end_time}
              </TextMiddle>
            </View>
          </View>
          <View style={styles.rows1}>
            <View style={styles.rows2}>
              <TextMiddle color={SwitchTheme(isTheme).textSec}>
                {auditoriumTypeValidator(lesson.auditorium, lesson.teacher_name).auditoriumType}
              </TextMiddle>
            </View>
            <TextMiddle color={SwitchTheme(isTheme).textSec}>{}</TextMiddle>
          </View>
          {lesson.link.length && lesson.auditorium === '' ? (
            <View style={styles.rows1}>
              <View style={styles.rows2}>
                <LinkButton
                  onPress={() => {
                    Linking.openURL(lesson.link)
                  }}
                  bg={lessonTypeValidator(lesson.type).typeColor}
                  bgpressed={lessonTypeValidator(lesson.type).pressedColor}
                  color={'#fff'}
                >
                  {linkValidator(lesson.link)}
                </LinkButton>
              </View>
              <LinkButton
                onPress={() => {
                  Clipboard.setStringAsync(lesson.link)
                  Toast.show({
                    description: 'Скопировано в буфер обмена',
                    placement: 'top',
                    duration: 1000,
                  })
                }}
                bg={SwitchTheme(isTheme).bgItem}
                bgpressed={SwitchTheme(isTheme).bgItem}
                color={lessonTypeValidator(item[0].type).typeColor}
                colorPressed={lessonTypeValidator(item[0].type).pressedColor}
                isCopy
              >
                {'Скопировать'}
              </LinkButton>
            </View>
          ) : null}
          {index !== item.length - 1 ? (
            <View style={styles.dividertop}>
              <Divider />
            </View>
          ) : null}
        </>
      ))
    }
  }

  return (
    <View
      style={{
        backgroundColor: SwitchTheme(isTheme).bgItem,
        borderRadius: 20,
        paddingHorizontal: 12,
        marginTop: 0,
        paddingVertical: 12,
      }}
    >
      {lessonsValidator(item)}
    </View>
  )
}

const styles = StyleSheet.create({
  rows1: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rows2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rows1_type_subject: {
    marginTop: 4,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rows2_type_subject: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rows1_type_pair: {
    marginTop: 2,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rows2_type_pair: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  dividertop: {
    paddingVertical: 11,
  },

  dividerbottom: {
    // paddingVertical: 11,
    paddingTop: 11,
    paddingBottom: 7,
  },
})

export default ListItemSchedule
