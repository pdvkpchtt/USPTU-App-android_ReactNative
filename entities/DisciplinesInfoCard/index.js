import { View } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import ListBox from '../../shared/ui/ListBox'
import ListItem from '../../shared/ui/ListItem'
import TextCaption from '../../shared/ui/Text/TextCaption'
import TextMain from '../../shared/ui/Text/TextMain'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import TextHead from '../../shared/ui/Text/TextHead'
import TextSmall from '../../shared/ui/Text/TextSmall'

const DisciplinesInfoCard = ({ info }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <>
      {info.contacts_of_educator !== '' ? (
        <ListBox marginTop={12}>
          <Hyperlink linkStyle={{ color: SwitchTheme(isTheme).textlink }} linkDefault={true}>
            <TextMain flexShrink={1} selectable={true} selectionColor={SwitchTheme(isTheme).textlink}>
              {info.contacts_of_educator
                .replace(/<\/?[^>]+(>|$)/g, '')
                .replace(/\n\s*\n\s*\n/g, '\n\n')
                .replace(/\s{2,}/g, ' ')
                .trim()}
            </TextMain>
          </Hyperlink>
          <TextSmall color={SwitchTheme(isTheme).textSec}>Контактные данные</TextSmall>
        </ListBox>
      ) : null}
      {info.information_of_implementation !== '' ? (
        <ListBox marginTop={16}>
          <Hyperlink linkStyle={{ color: SwitchTheme(isTheme).textlink }} linkDefault={true}>
            <TextMain flexShrink={1} selectable={true} selectionColor={SwitchTheme(isTheme).textlink}>
              {info.information_of_implementation
                .replace(/<\/?[^>]+(>|$)/g, '')
                .replace(/\n\s*\n\s*\n/g, '\n\n')
                .trim()}
            </TextMain>
          </Hyperlink>
          <TextSmall color={SwitchTheme(isTheme).textSec}>Информация к выполнению</TextSmall>
        </ListBox>
      ) : null}
    </>
  )
}

export default DisciplinesInfoCard
