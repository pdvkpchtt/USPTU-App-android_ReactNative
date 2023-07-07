import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import SearchBar from '../../../features/SearchBar'
import SubjectList from '../../../features/SubjectList'
import useThemeStore from '../../../shared/theme/store/store'
import Layout from '../../../shared/ui/Layout'
import { Pressable, Text, View, Animated } from 'react-native'
import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons'
import FABSearch from '../../../shared/ui/FABSearch'
import { useDisciplinesStore } from '../../../entities/disciplines'
import SwitchTheme from '../../../shared/theme/SwitchTheme'

const Files = ({ navigation }) => {
  const { filterDisciplines } = useDisciplinesStore((state) => ({
    filterDisciplines: state.filterDisciplines,
  }))

  const [filter, setFilter] = useState('')

  const isTheme = useThemeStore((state) => state.theme)

  const [visibleSearch, setVisibleSearch] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    })

    if (filter.length === 1) {
      AnimIn2(1)
    } else if (filter.length === 0) {
      AnimIn2(0)
    }
  }, [navigation, filter.length])

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
                    filterDisciplines('')
                  }}
                >
                  {({ pressed }) => {
                    return (
                      <MaterialIcons
                        name="close"
                        size={24}
                        color={
                          pressed
                            ? isTheme == 'theme_usual' || isTheme.includes('_dark') || isTheme == 'theme_ftt'
                              ? '#B0B0B0'
                              : '#e4e4e4'
                            : isTheme.includes('theme_usual')
                            ? isTheme.includes('_dark')
                              ? '#dddddd'
                              : '#5F5F5F'
                            : '#fff'
                        }
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
                  {({ pressed }) => {
                    return (
                      <MaterialIcons
                        name="cancel"
                        size={24}
                        color={
                          pressed
                            ? isTheme == 'theme_usual' || isTheme.includes('_dark') || isTheme == 'theme_ftt'
                              ? '#B0B0B0'
                              : '#e4e4e4'
                            : isTheme.includes('theme_usual')
                            ? isTheme.includes('_dark')
                              ? '#dddddd'
                              : '#5F5F5F'
                            : '#fff'
                        }
                      />
                    )
                  }}
                </Pressable>
              )}
            </>
          ) : null}
        </Animated.View>
      ),
      headerTitle: () =>
        visibleSearch ? (
          <SearchBar
            placeholder="Предметы, преподаватели и др."
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
            Файлы
          </Text>
        ),
    })
  }, [visibleSearch, navigation, filter, isTheme])
  // for search in header

  return (
    <>
      <Layout forFlashList>
        <SubjectList target={'files'} filter={filter} navigation={navigation} />
      </Layout>

      {!visibleSearch ? <FABSearch onPress={() => setVisibleSearch(true)} /> : null}
    </>
  )
}

export default Files
