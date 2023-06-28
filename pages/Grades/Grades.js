import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import GradesList from '../../features/GradesList'
import SearchBar from '../../features/SearchBar'
import Layout from '../../shared/ui/Layout'
import { Pressable, Text, View, Animated } from 'react-native'
import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons'
import useThemeStore from '../../shared/theme/store/store'
import FABSearch from '../../shared/ui/FABSearch'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import { useGradesStore } from '../../entities/grades'
import { useUserStore } from '../../entities/user'

const Grades = ({ navigation }) => {
  const { getStudyGroup } = useUserStore((state) => ({
    getStudyGroup: state.getStudyGroup,
  }))
  const { filterGrades } = useGradesStore((state) => ({
    filterGrades: state.filterGrades,
  }))

  const [filter, setFilter] = useState('')
  const [visibleSearch, setVisibleSearch] = useState(false)

  const isTheme = useThemeStore((state) => state.theme)

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
                    filterGrades('', getStudyGroup())
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
          ) : null}
        </Animated.View>
      ),
      headerTitle: () =>
        visibleSearch ? (
          <View style={{ marginLeft: 16 }}>
            <SearchBar
              placeholder="Предметы, преподаватели и др."
              setSearchText={setFilter}
              search={filter}
              navigation={navigation}
            />
          </View>
        ) : (
          <Text
            style={{
              fontSize: 20,
              lineHeight: 24,
              color: isTheme.includes('theme_usual') ? SwitchTheme(isTheme).textMain : '#fff',
              fontFamily: 'Roboto-Medium',
            }}
          >
            Успеваймость
          </Text>
        ),
    })
  }, [visibleSearch, navigation, filter, isTheme])
  // for search in header

  return (
    <>
      <Layout forFlashList>
        <GradesList navigation={navigation} filter={filter} />
      </Layout>
      {!visibleSearch ? <FABSearch onPress={() => setVisibleSearch(true)} /> : null}
    </>
  )
}

export default Grades
