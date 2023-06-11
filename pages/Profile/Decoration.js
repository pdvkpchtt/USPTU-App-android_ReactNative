import { ImageBackground, Pressable, ScrollView, StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native'
import useThemeStore from '../../shared/theme/store/store'
import Layout from '../../shared/ui/Layout'
import ListItemWithSwitch from '../../shared/ui/ListItemWithSwitch'
import TextMain from '../../shared/ui/Text/TextMain'
import TextDisplay from '../../shared/ui/Text/TextDisplay'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import DecorationItem from '../../shared/ui/DecorationItem'
import { useState } from 'react'
import MiniThemes from '../../shared/theme/MiniThemes'
import { useEffect } from 'react'

const Decoration = ({ navigation, route }) => {
  const isTheme = useThemeStore((state) => state.theme)
  // console.log(MiniThemes(isTheme))
  const themes = MiniThemes(isTheme)
  // console.log(themes)
  const IdSelected = useThemeStore((state) => state.dataIdSelected)

  const { setTheme, setSelected } = useThemeStore((state) => ({
    setTheme: state.setTheme,
    setSelected: state.setSelected,
  }))

  // const [isEnabled, setIsEnabled] = useState(false)
  // const toggleSwitch = () => {
  //   setIsEnabled((previousState) => !previousState)
  //   if (isTheme.includes('_dark')) {
  //     setTheme(isTheme.replace('_dark', ''))
  //   } else {
  //     setTheme(isTheme + '_dark')
  //   }
  // }
  // const scheme = useColorScheme()
  // const themeAutoHandler = () => {
  //   if (scheme === 'dark' && !isTheme.includes('_dark')) setTheme(isTheme + '_dark')
  //   else if (scheme === 'light' && isTheme.includes('_dark')) setTheme(isTheme.replace('_dark', ''))
  // }
  // useEffect(() => {
  //   setTheme('theme_usual')
  //   if (isTheme.includes('_dark')) {
  //     setIsEnabled(true)
  //   } else {
  //     setIsEnabled(false)
  //   }

  //   console.log(isTheme)
  // }, [isTheme])

  return (
    <>
      <Layout>
        <View
          style={{
            marginTop: 24,
            backgroundColor: SwitchTheme(isTheme).bgItem,
            paddingVertical: 11,
            borderRadius: 13,
          }}
        >
          <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
            {themes.map((theme, index, arr) => (
              <DecorationItem
                onPress={() => {
                  // if (isTheme.includes('_dark')) {
                  setTheme(theme[0])
                  // } else {
                  //   setTheme(theme[0] + '_dark')
                  // }

                  setSelected(index)
                }}
                isNeedMargin={index === 0 ? 'left' : index === arr.length - 1 ? 'right' : 'middle'}
              >
                {index == IdSelected ? theme[2] : theme[1]}
              </DecorationItem>
            ))}
          </ScrollView>
          <TextMain marginTop={16} paddingHorizontal={16}>
            {SwitchTheme(isTheme).textdecoration}
          </TextMain>
          <TextDisplay color={SwitchTheme(isTheme).textSec} marginTop={3} paddingHorizontal={16}>
            {SwitchTheme(isTheme).textlozungdecoration}
          </TextDisplay>
        </View>
        {/* <View style={{ marginTop: 24, marginBottom: 24 }}>
          <ListItemWithSwitch title="Ночной режим" onValueChange={toggleSwitch} value={isEnabled} />
        </View> */}
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: 53,
    height: 98,
  },
})

export default Decoration
