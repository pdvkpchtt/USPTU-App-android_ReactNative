import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, Text, View } from 'react-native'
import GradeCard from '../../entities/GradeCard'

const RankingGradesList = ({ items, navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 24 }}>
        <GradeCard
          item={item}
          onPress={() => {
            navigation.navigate('Информация о дисциплине', { ...item })
          }}
        />
      </View>
    )
  }

  const keyExtractor = (item) => {
    return item.key
  }

  return (
    <FlashList
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      onScrollBeginDrag={Keyboard.dismiss}
      estimatedItemSize={120}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default RankingGradesList
