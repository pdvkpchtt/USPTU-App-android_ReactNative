import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Layout from '../../shared/ui/Layout'
import ListItemWithBottomTitle from '../../shared/ui/ListItemWithBottomTitle'
import ListItemWithRightTitle from '../../shared/ui/ListItemWithRightTitle'
import SearchBar from '../SearchBar'
import List from './ui/List'
import filterPlan from './utils/filterPlan'
import { Pressable, Text, View, Animated } from 'react-native'
import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons'
import useThemeStore from '../../shared/theme/store/store'
import FABSearch from '../../shared/ui/FABSearch'
import SwitchTheme from '../../shared/theme/SwitchTheme'

const CurriculumSemestrList = ({ navigation, route }) => {
  const isTheme = useThemeStore((state) => state.theme)

  const [filter, setFilter] = useState('')
  const [filteredItems, setFilteredItems] = useState(route.params.data)
  const [visibleSearch, setVisibleSearch] = useState(false)

  useEffect(() => {
    setFilteredItems(filterPlan(route.params.data, filter))

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
                    setFilteredItems(filterPlan(route.params.data, ''))
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
            {`${route.params.data[0].year} курс, ${route.params.data[0].semester} семестр`}
          </Text>
        ),
    })
  }, [visibleSearch, navigation, filter, isTheme])
  // for search in header

  return (
    <>
      <Layout forFlashist>
        <List
          filter={filter}
          navigation={navigation}
          items={filteredItems}
          refreshing={() => setFilteredItems(filterPlan(route.params.data, filter))}
        ></List>
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

export default CurriculumSemestrList
