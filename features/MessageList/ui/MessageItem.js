import { Pressable, StyleSheet, Text, View } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import useTokenStore from '../../../shared/apiClient/store/store'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'

import TextMain from '../../../shared/ui/Text/TextMain'
import TextTime from '../../../shared/ui/Text/TextTime'

const MessageItem = ({ message }) => {
  const accessToken = useTokenStore((state) => state.token)
  const isTheme = useThemeStore((state) => state.theme)

  const validateLinkToFiles = (text) => {
    let result = text
    const urls = result.match(/disc_do_f(.*)(?=" target)/g) || []

    for (let url of urls) {
      result += `\nhttps://ams.rusoil.net/pcs3/${encodeURI(url)}&access_token=${accessToken}`
    }

    console.log(result.replace(/<a href=".\/disc_do_f(.*)<\/a>/g, ''))
    return result.replace(/<a href=".\/disc_do_f(.*)<\/a>/g, '')
  }
  // console.log(message.text)
  if (message.role == 'educator') {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: SwitchTheme(isTheme).bgItem,
          borderRadius: 20,
          padding: 12,
          // marginLeft: 16,
          marginRight: '15%',
        }}
      >
        <Hyperlink
          linkStyle={{ color: SwitchTheme(isTheme).textlink }}
          linkDefault={true}
          linkText={(url) => {
            if (url.includes('https://ams.rusoil.net/pcs3')) {
              let name = url.split('&access_token')
              name = name[0].split('/')
              return decodeURI(name[name.length - 1])
            } else {
              return url
            }
          }}
        >
          <TextMain flexShrink={1} color={SwitchTheme(isTheme).textMain}>
            {validateLinkToFiles(message.text)}
          </TextMain>
        </Hyperlink>
        <TextTime alignSelf="flex-end" color={SwitchTheme(isTheme).textTimeMesEducator}>
          {message.createdAt}
        </TextTime>
      </View>
    )
  } else {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: SwitchTheme(isTheme).bgMesStudent,
          borderRadius: 13,
          padding: 12,
          marginLeft: 24,
          marginRight: 16,
          marginTop: 4,
        }}
      >
        <Hyperlink
          linkStyle={{ color: '#fff' }}
          linkDefault={true}
          linkText={(url) => {
            if (url.includes('https://ams.rusoil.net/pcs3')) {
              let name = url.split('&access_token')
              name = name[0].split('/')
              return decodeURI(name[name.length - 1])
            } else {
              return url
            }
          }}
        >
          <TextMain color={'#fff'} flexShrink={1}>
            {validateLinkToFiles(message.text)}
          </TextMain>
        </Hyperlink>

        <View style={styles.time_style}>
          <TextTime color={'#fff'}>{message.createdAt}</TextTime>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  time_style: {
    alignSelf: 'flex-end',
    flex: 1,
  },
})

export default MessageItem
