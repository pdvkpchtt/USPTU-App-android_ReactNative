import Card from './ui/Card'

const SubjectCard = ({ item, onPress, target_action }) => {
  return <Card item={item} onPress={onPress} isShowBadge={target_action === 'Сообщения дисциплины'} />
}

export default SubjectCard
