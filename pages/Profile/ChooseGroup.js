import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useUserStore } from '../../entities/user'
import CheckIcon from '../../shared/ui/Icons/CheckIcon'
import Layout from '../../shared/ui/Layout'
import ListItemWithLink from '../../shared/ui/ListItemWithLink'
import ListItemWithRightIcon from '../../shared/ui/ListItemWithRightIcon'
import TextCaption from '../../shared/ui/Text/TextCaption'

const ChooseGroup = ({ navigation, route }) => {
  const isTheme = useThemeStore((state) => state.theme)
  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    })
  }, [navigation])
  return (
    <Layout>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13 }}>
        {route.params.data.map((item, index, arr) => (
          <ListItemWithLink
            title={item.interval}
            position={index === 0 ? 'top' : index === arr.length - 1 ? 'bottom' : 'middle'}
            key={index}
            onPress={() => {
              navigation.navigate('Учебный план')
            }}
          />
        ))}
      </View>
    </Layout>
  )
}

export default ChooseGroup
