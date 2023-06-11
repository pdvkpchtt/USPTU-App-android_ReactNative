import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import SearchBar from '../../features/SearchBar'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import TextBody from '../../shared/ui/Text/TextBody'
import Layout from '../../shared/ui/Layout'
import SearchList from '../../features/SearchList'

const ScheduleSearch = ({ navigation }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.goBack()
          }}
        >
          <TextBody color={SwitchTheme(isTheme).textHeaderButton} textAlign="left">
            Отмена
          </TextBody>
        </Pressable>
      ),
    })
  }, [navigation])

  return (
    <>
      <SearchBar
        placeholder="группа, преподаватель или аудитория"
        setSearchText={setFilter}
        navigation={navigation}
        isFocus={true}
      />
      <Layout>
        <SearchList navigation={navigation} filter={filter} />
      </Layout>
    </>
  )
}
export default ScheduleSearch
