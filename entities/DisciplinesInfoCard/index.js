import { View } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import ListBox from '../../shared/ui/ListBox'
import ListItem from '../../shared/ui/ListItem'
import TextCaption from '../../shared/ui/Text/TextCaption'
import TextMain from '../../shared/ui/Text/TextMain'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'

const DisciplinesInfoCard = ({ info }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <>
      {info.contacts_of_educator !== '' ? (
        <View>
          <TextCaption paddingHorizontal={16} marginBottom={8} marginTop={24} color={SwitchTheme(isTheme).textOuterSec}>
            {'Контакты преподавателя'.toUpperCase()}
          </TextCaption>
          <ListBox>
            <Hyperlink linkStyle={{ color: SwitchTheme(isTheme).textlink }} linkDefault={true}>
              <TextMain flexShrink={1} selectable={true} selectionColor={SwitchTheme(isTheme).textlink}>
                {info.contacts_of_educator
                  .replace(/<\/?[^>]+(>|$)/g, '')
                  .replace(/\n\s*\n\s*\n/g, '\n\n')
                  .replace(/\s{2,}/g, ' ')
                  .trim()}
              </TextMain>
            </Hyperlink>
          </ListBox>
        </View>
      ) : null}
      {info.information_of_implementation !== '' ? (
        <View>
          <TextCaption
            paddingHorizontal={16}
            marginTop={info.contacts_of_educator !== '' ? 24 : 0}
            marginBottom={8}
            color={SwitchTheme(isTheme).textOuterSec}
          >
            {'Информация к выполнению'.toUpperCase()}
          </TextCaption>
          <ListBox>
            <Hyperlink linkStyle={{ color: SwitchTheme(isTheme).textlink }} linkDefault={true}>
              <TextMain flexShrink={1} selectable={true} selectionColor={SwitchTheme(isTheme).textlink}>
                {info.information_of_implementation
                  .replace(/<\/?[^>]+(>|$)/g, '')
                  .replace(/\n\s*\n\s*\n/g, '\n\n')
                  .trim()}
              </TextMain>
            </Hyperlink>
          </ListBox>
        </View>
      ) : null}
    </>
  )
}

export default DisciplinesInfoCard
