import { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'

const Search = ({ setSearchText, placeholder, search, isFocus = false }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const [text, setText] = useState('')
  const inputRef = useRef()
  // console.log('sdgsdg')

  useEffect(() => {
    setSearchText(text)
  }, [text])

  useEffect(() => {
    if (isFocus) {
      setTimeout(() => inputRef.current.focus(), 50)
    }
  }, [])

  return (
    <View
      style={{
        backgroundColor: SwitchTheme(isTheme).bgTopNav,
        paddingHorizontal: 16,
        paddingVertical: 8,
        // borderBottomWidth: 0.3,
        borderColor: SwitchTheme(isTheme).borderSearch,
        zIndex: 3, // works on ios
        //   elevation: 3, // works on android
      }}
    >
      <TextInput
        ref={inputRef}
        style={{
          backgroundColor: SwitchTheme(isTheme).bgSearch,
          color: SwitchTheme(isTheme).textMain,
          borderRadius: 13,
          fontSize: 17,
          fontFamily: 'Roboto-Regular',
          textAlign: 'left',
          fontStyle: 'normal',
          letterSpacing: -0.41,
          paddingHorizontal: 12,
          lineHeight: 22,
          paddingVertical: 7,
        }}
        spellCheck={false}
        autoComplete={'off'}
        //  autoFocus={true}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={SwitchTheme(isTheme).placeholderSearch}
        selectionColor={SwitchTheme(isTheme).placeselectionSearch}
        numberOfLines={1}
        //  clearButtonMode="always"
        onChangeText={(value) => {
          setText(value)
        }}
        clearButtonMode="always"
      />
    </View>
  )
}

export default Search
