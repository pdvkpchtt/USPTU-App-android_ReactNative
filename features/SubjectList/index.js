import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useDisciplinesStore } from '../../entities/disciplines'
import { useUserStore } from '../../entities/user'
import ListSubject from './ui/ListSubject'

const SubjectList = ({ navigation, filter, target }) => {
  const { messages, info, files, getDisciplines, filterDisciplines, refreshing } = useDisciplinesStore((state) => ({
    messages: state.messagesForShow,
    info: state.infoForShow,
    files: state.filesForShow,
    getDisciplines: state.getDisciplines,
    filterDisciplines: state.filterDisciplines,
    refreshing: state.refreshing,
  }))
  const focused = useIsFocused()
  const getPotok = useUserStore((state) => state.getPotok)
  let target_action = ''

  if (target == 'info') {
    target_action = 'Указания от преподавателей дисциплины'
  } else if (target == 'files') {
    target_action = 'Файлы дисциплины'
  } else if (target == 'messages') {
    target_action = 'Сообщения дисциплины'
  }

  useEffect(() => {
    if (filter.length) {
      filterDisciplines(filter)
    }
  }, [filter])

  useEffect(() => {
    getDisciplines(filter, getPotok())
  }, [focused])

  return (
    <ListSubject
      items={target === 'info' ? info : target === 'files' ? files : messages}
      navigation={navigation}
      refreshing={refreshing}
      target_action={target_action}
      filter={filter}
    />
  )
}

export default SubjectList
