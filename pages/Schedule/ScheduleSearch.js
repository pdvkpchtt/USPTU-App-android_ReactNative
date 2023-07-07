import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import SearchBar from '../../features/SearchBar'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import TextBody from '../../shared/ui/Text/TextBody'
import Layout from '../../shared/ui/Layout'
import SearchList from '../../features/SearchList'
import { Pressable, Text, View, Animated } from 'react-native'
import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons'

const ScheduleSearch = ({ navigation }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const [filter, setFilter] = useState('')

  useEffect(() => {
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
          <>
            {filter.length ? (
              <Pressable
                onPress={() => {
                  setFilter('')
                  // getDisciplines('', getPotok())
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
            ) : null}
          </>
        </Animated.View>
      ),
      headerTitle: () => (
        <SearchBar
          placeholder="Поиск"
          isFocus={true}
          setSearchText={setFilter}
          search={filter}
          navigation={navigation}
        />
      ),
    })
  }, [navigation, filter, isTheme])
  // for search in header

  return (
    <Layout forFlashList>
      <SearchList navigation={navigation} filter={filter} />
    </Layout>
  )
}
export default ScheduleSearch
