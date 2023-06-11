import { FlashList } from '@shopify/flash-list'
import { Text, View } from 'react-native'
import ListItemWithButton from '../../../shared/ui/ListItemWithButton'
import * as Linking from 'expo-linking'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import useThemeStore from '../../../shared/theme/store/store'

const List = ({ files, accessToken }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const renderItem = ({ item, index }) => {
    return (
      <ListItemWithButton
        title={item.name}
        buttonTitle="СКАЧАТЬ"
        position={index == files.length - 1 ? 'bottom' : 'middle'}
        onPress={() => {
          Linking.openURL(`https://ams.rusoil.net/pcs3/${item.link}&access_token=${accessToken}`)
        }}
      />
    )
  }

  return (
    <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13 }}>
      <FlashList
        data={files}
        renderItem={renderItem}
        estimatedItemSize={63}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default List
