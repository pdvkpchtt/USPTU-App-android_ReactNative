import ListItemWithBottomTitle from '../../../shared/ui/ListItemWithBottomTitle'
import TextMain from '../../../shared/ui/Text/TextMain'
import ListBox from './../../../shared/ui/ListBox'

const Card = ({ info }) => {
  return (
    <>
      {Object.keys(info).length ? (
        <>
          <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={12}>
            <ListItemWithBottomTitle title={info.name} bottomTitle="Номер общежития" isDividerNeed />
            <ListItemWithBottomTitle title={info.address} bottomTitle="Адрес общежития" />
          </ListBox>
          <ListBox marginTop={16} paddingHorizontal={0} paddingVertical={0}>
            <ListItemWithBottomTitle
              title={info.status}
              bottomTitle="Статус заявки (договора)"
              isDividerNeed={!!info.statusText.length}
            />
            {info.statusText.length ? (
              <ListItemWithBottomTitle title={info.statusText} bottomTitle="Информация о заявке" />
            ) : null}
          </ListBox>
        </>
      ) : (
        <ListBox marginTop={12}>
          <TextMain>Нет информации об общежитии</TextMain>
        </ListBox>
      )}
    </>
  )
}

export default Card
