import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import Layout from '../../shared/ui/Layout'
import ListItemWithDate from '../../shared/ui/ListItemWithDate'
import ListItemWithSwitch from '../../shared/ui/ListItemWithSwitch'
import TextBody from '../../shared/ui/Text/TextBody'
import TextSmall from '../../shared/ui/Text/TextSmall'

const CreateNote = ({ navigation }) => {
  const isTheme = useThemeStore((state) => state.theme)
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable>
          <TextBody color={SwitchTheme(isTheme).textHeaderButton} textAlign="left">
            Добавить
          </TextBody>
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable
          onPress={() => {
            navigation.goBack()
          }}
        >
          <TextBody color={SwitchTheme(isTheme).textHeaderButton} textAlign="left">
            Отменить
          </TextBody>
        </Pressable>
      ),
    })
  }, [navigation])

  return (
    <>
      <Layout>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            marginTop: 12,
            // marginHorizontal: 16,
          }}
        >
          <TextInput
            style={{
              // marginTop: 8,
              borderRadius: 20,
              fontSize: 17,
              fontFamily: 'Roboto-Regular',
              lineHeight: 22,
              textAlign: 'left',
              letterSpacing: -0.41,
              backgroundColor: SwitchTheme(isTheme).bgItem,
              color: SwitchTheme(isTheme).textMain,
              paddingHorizontal: 16,
              paddingVertical: 10,
              placeholder: 'Enter password',
            }}
            placeholderTextColor={SwitchTheme(isTheme).placeholderSearch}
            cursorColor={SwitchTheme(isTheme).placeholderSearch}
            selectionColor={SwitchTheme(isTheme).placeholderSearch}
            editable
            multiline
            placeholder="Содержимое заметки"
            // onChangeText={(value) => {
            //   setText(value)
            //   setValue(value.trim().replace(/\n/g, ' '))
            // }}
          />

          <View style={{ paddingHorizontal: 12 }}>
            <TextSmall color={SwitchTheme(isTheme).textOuterSec}>Не более 140 символов.</TextSmall>
          </View>
          <View style={{ borderRadius: 20, marginTop: 12 }}>
            <ListItemWithSwitch title="Весь день" />
            <ListItemWithDate
              title="Дата"
              buttonTitle={'11 март. 2023'}
              onPress={() => {
                state.setIsShowCalendar(true)
              }}
            />
          </View>
        </View>
      </Layout>
    </>
  )
}

export default CreateNote
