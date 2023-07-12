import Checkbox from 'expo-checkbox'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useWorkAddStore } from '../../features/WorkAddManageForm'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import RunIcon from './Icons/RunIcon'
import TextHead from './Text/TextHead'
import TextMain from './Text/TextMain'
import TextSmall from './Text/TextSmall'

const ListItemWithBottomTitleAndCheck = ({
  title,
  header,
  bottomTitle,
  onPress = null,
  isDividerNeed,
  position = 'middle',
  bg = '',
  item,
}) => {
  const isTheme = useThemeStore((state) => state.theme)

  const { discipline, disciplineId, group, ranking, semester, worknomer } = useWorkAddStore((state) => ({
    discipline: state.discipline,
    disciplineId: state.disciplineId,
    group: state.group,
    ranking: state.ranking,
    semester: state.semester,
    worknomer: state.worknomer,
  }))
  const [first, setfirst] = useState(false)

  return (
    <Pressable
      onPress={() => {
        onPress()
      }}
    >
      {({ pressed }) => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            backgroundColor: pressed ? SwitchTheme(isTheme).pressedItem : bg ? bg : null,
            paddingHorizontal: 16,
            borderTopRightRadius: position === 'top' || position === 'all' ? 20 : 0,
            borderTopLeftRadius: position === 'top' || position === 'all' ? 20 : 0,
            borderBottomRightRadius: position === 'bottom' || position === 'all' ? 20 : 0,
            borderBottomLeftRadius: position === 'bottom' || position === 'all' ? 20 : 0,
          }}
        >
          <View style={styles.rows1}>
            <View style={styles.rows2}>
              {header ? <TextHead text={header} /> : null}
              <TextMain>{title}</TextMain>
              {bottomTitle ? <TextSmall color={SwitchTheme(isTheme).textSec}>{bottomTitle}</TextSmall> : null}
            </View>
            <Checkbox
              value={
                item.worknomer == worknomer &&
                item.id == disciplineId &&
                item.semestr == semester &&
                item.value.split('/')[item.value.split('/').length - 1].trim() == discipline
              }
              style={{ width: 18, height: 18 }}
              color={
                item.worknomer == worknomer &&
                item.id == disciplineId &&
                item.semestr == semester &&
                item.value.split('/')[item.value.split('/').length - 1].trim() == discipline
                  ? SwitchTheme(isTheme).checkIcon
                  : SwitchTheme(isTheme).checkBox
              }
            />
          </View>
          {isDividerNeed || position === 'middle' || position === 'top' ? <Divider ml={-16} /> : null}
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  rows1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    alignItems: 'center',
  },

  rows2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 1,
    marginRight: 8,
  },
})

export default ListItemWithBottomTitleAndCheck
