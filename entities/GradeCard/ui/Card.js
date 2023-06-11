import { StyleSheet, View } from 'react-native'
import ListItem from '../../../shared/ui/ListItem'
import ListItemWithLink from '../../../shared/ui/ListItemWithLink'
import ListItemWithRightTitle from '../../../shared/ui/ListItemWithRightTitle'
import TextCaption from '../../../shared/ui/Text/TextCaption'
import capitalize from '../../../shared/utils/capitalize'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'

const Card = ({ item, onPress, isNeedRanking = false }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <>
      {isNeedRanking ? (
        <TextCaption paddingHorizontal={16} color={SwitchTheme(isTheme).textOuterSec}>
          {item.ranking.toUpperCase().toUpperCase()}
        </TextCaption>
      ) : null}
      <View
        style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13, marginTop: isNeedRanking ? 8 : 0 }}
      >
        <ListItemWithLink title={item.discipline_name} onPress={onPress} position="top" />
        {(item.ranking === 'Зачет' || item.grade.length !== 1) && !['', 'x', '-', 'X'].includes(item.grade) ? (
          <ListItem title={item.grade} position="bottom" />
        ) : (
          <ListItemWithRightTitle
            rightTitle={['', 'x', '-', 'X'].includes(item.grade) ? item.grade_date : capitalize(item.grade)}
            title={['', 'x', '-', 'X'].includes(item.grade) ? 'Дата' : 'Оценка'}
            isDividerNeed={false}
          />
        )}
        {/* <ListItemWithRightTitle title="Статус" rightTitle={item.status_of_work} /> */}
      </View>
    </>
  )
}

export default Card
