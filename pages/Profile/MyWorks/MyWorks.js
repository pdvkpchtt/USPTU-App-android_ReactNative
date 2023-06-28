import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import SearchBar from '../../../features/SearchBar'
import WorkList from './../../../features/WorkList/index'
import { useIsFocused } from '@react-navigation/native'
import HeaderButtonWithText from '../../../shared/ui/HeaderButtonWithText'
import Layout from '../../../shared/ui/Layout'
import { Pressable, Text, View, Animated } from 'react-native'
import PlusIcon from '../../../shared/ui/Icons/PlusIcon'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import useThemeStore from '../../../shared/theme/store/store'
import FABSearch from '../../../shared/ui/FABSearch'
import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons'
import { useUserStore } from '../../../entities/user'
import { useWorksStore } from '../../../entities/works'

const MyWorks = ({ navigation }) => {
  const [filter, setFilter] = useState('')
  const [visibleSearch, setVisibleSearch] = useState(false)

  const isTheme = useThemeStore((state) => state.theme)

  const { filterWorks } = useWorksStore((state) => ({
    filterWorks: state.filterWorks,
  }))
  const { getStudyGroup } = useUserStore((state) => ({
    getStudyGroup: state.getStudyGroup,
  }))

  useEffect(() => {
    if (filter.length === 1) {
      AnimIn2(1)
    } else if (filter.length === 0) {
      AnimIn2(0)
    }
  }, [filter.length])

  const Anim = useRef(new Animated.Value(0)).current
  const Anim2 = useRef(new Animated.Value(0)).current

  const AnimOut = (value) => {
    Animated.timing(Anim, {
      toValue: value,
      duration: 100,
      useNativeDriver: false,
    }).start()
  }

  const AnimIn2 = (value) => {
    Animated.timing(Anim2, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  // for search in header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Animated.View
          style={{
            transform: [
              {
                rotateZ: Anim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '-270deg'],
                }),
              },
            ],
          }}
        >
          {visibleSearch ? (
            <>
              {filter.length ? (
                <Pressable
                  onPress={() => {
                    setFilter('')
                    filterWorks('', getStudyGroup())
                  }}
                >
                  {({ isPressed }) => {
                    return (
                      <MaterialIcons
                        name="close"
                        size={24}
                        color={isTheme.includes('theme_usual') ? SwitchTheme(isTheme).tabBarInactiveTintColor : '#fff'}
                      />
                    )
                  }}
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    setTimeout(() => setVisibleSearch(false), 200)
                    AnimOut(0)
                  }}
                >
                  {({ isPressed }) => {
                    return (
                      <MaterialIcons
                        name="cancel"
                        size={24}
                        color={isTheme.includes('theme_usual') ? SwitchTheme(isTheme).tabBarInactiveTintColor : '#fff'}
                      />
                    )
                  }}
                </Pressable>
              )}
            </>
          ) : (
            <Pressable onPress={() => navigation.navigate('Добавление работы')}>
              <PlusIcon />
            </Pressable>
          )}
        </Animated.View>
      ),
      headerTitle: () =>
        visibleSearch ? (
          <SearchBar
            placeholder="Название работы и др."
            setSearchText={setFilter}
            search={filter}
            navigation={navigation}
          />
        ) : (
          <Text
            style={{
              fontSize: 20,
              lineHeight: 24,
              color: isTheme.includes('theme_usual') ? SwitchTheme(isTheme).textMain : '#fff',
              fontFamily: 'Roboto-Medium',
            }}
          >
            Мои работы
          </Text>
        ),
    })
  }, [visibleSearch, navigation, filter, isTheme])
  // for search in header

  return (
    <>
      <Layout forFlashList>
        <WorkList navigation={navigation} filter={filter} />
      </Layout>

      {!visibleSearch ? (
        <FABSearch
          onPress={() => {
            setVisibleSearch(true)
          }}
        />
      ) : null}
    </>
  )
}
export default MyWorks
