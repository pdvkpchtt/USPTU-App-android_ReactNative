import { useEffect, useState } from 'react'
import { useWorksStore } from '../../entities/works'
import List from './ui/List'
import { useIsFocused } from '@react-navigation/native'
import { useUserStore } from '../../entities/user'
import { LoadingBox } from '../../shared/ui/LoadingBox'

const WorkList = ({ navigation, filter }) => {
  const { works, getWorks, filterWorks, refreshing, isEmpty } = useWorksStore((state) => ({
    works: state.worksForShow,
    getWorks: state.getWorks,
    filterWorks: state.filterWorks,
    refreshing: state.refreshing,
    isEmpty: state.isEmpty,
  }))
  const focused = useIsFocused()
  const { getStudyGroup, dataIdSelected } = useUserStore((state) => ({
    getStudyGroup: state.getStudyGroup,
    dataIdSelected: state.dataIdSelected,
  }))

  useEffect(() => {
    getWorks(filter, getStudyGroup())
  }, [focused, dataIdSelected])

  useEffect(() => {
    // //console.log(filter)
    if (filter) {
      filterWorks(filter, getStudyGroup())
    }
  }, [filter])

  return (
    <>
      <List items={works} navigation={navigation} refreshing={refreshing} isEmpty={isEmpty} />
    </>
  )
}

export default WorkList
