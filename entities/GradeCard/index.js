import Card from './ui/Card'

const GradeCard = ({ item, onPress, isNeedRanking }) => {
  return <Card item={item} onPress={onPress} isNeedRanking={isNeedRanking} />
}

export default GradeCard
