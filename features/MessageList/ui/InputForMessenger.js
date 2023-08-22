import { useEffect, useRef, useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import SendIcon from '../../../shared/ui/Icons/SendIcon'
const InputForMessenger = ({ placeholder, isFocus = false }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const [text, setText] = useState('')
  const inputRef = useRef()
  // //console.log('sdgsdg')

  // useEffect(() => {
  //   setText(text)
  // }, [text])

  // useEffect(() => {
  //   if (isFocus) {
  //     setTimeout(() => inputRef.current.focus(), 50)
  //   }
  // }, [])

  return (
    <Pressable
      style={{
        backgroundColor: SwitchTheme(isTheme).bgSearch,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        paddingVertical: 4,
        // borderBottomWidth: 0.3,
        //   elevation: 3, // works on android
      }}
      onPress={() => inputRef.current.focus()}
    >
      <TextInput
        ref={inputRef}
        style={{
          color: SwitchTheme(isTheme).textMain,
          borderRadius: 20,
          fontSize: 16,
          fontFamily: 'Roboto',
          textAlign: 'left',
          letterSpacing: -0.15,
          marginLeft: 16,
          lineHeight: 24,
          width: '100%',
          flexShrink: 1,
        }}
        spellCheck={false}
        autoComplete={'off'}
        // autoFocus={true}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={SwitchTheme(isTheme).placeholderSearch}
        selectionColor={SwitchTheme(isTheme).placeselectionSearch}
        multiline
        //  clearButtonMode="always"
        // onChangeText={(value) => {
        //   setText(value)
        // }}
        clearButtonMode="always"
      />

      <Pressable
        style={{
          paddingVertical: 8,
          marginLeft: 8,
          paddingLeft: 10,
          paddingRight: 6,
          backgroundColor: '#CAE6FF',
          borderRadius: 99,
          flexShrink: 0,
          height: 40,
        }}
      >
        <SendIcon />
      </Pressable>
    </Pressable>
  )
}

export default InputForMessenger
