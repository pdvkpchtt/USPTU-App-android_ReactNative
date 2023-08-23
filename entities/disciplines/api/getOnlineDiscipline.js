import gradesValidator from '../../../shared/utils/gradesValidator'
import apiClient from '../../../shared/apiClient'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export default async function getOnlineDiscipline(potok) {
  const data = await apiClient.post('', 'w=DiscDO&sem=0', {
    params: {
      obj: 'getsessi',
    },
  })
  let onlineDisciplines = []
  const groups = []
  const semesters = []
  let i = -1
  for (let discipline of data.data) {
    const itemOnline = {}
    itemOnline.key = uuidv4()
    itemOnline.id = discipline['ID']
    itemOnline.kont_id = discipline['KONT_ID']
    itemOnline.group = discipline['GRUPPA']
    itemOnline.ranking = discipline['PRIZN']
    itemOnline.department = discipline['NKAF']
    itemOnline.discipline_name = discipline['NDISC']
    itemOnline.method = discipline['STATE_DISC']
    itemOnline.educator_name = discipline['FIO']
      .replace(/\+/g, ', ')
      .replace(' ,', ',')
      .replace(', ,', ',')
      .replace('  ', ' ')
      .trim()
    if (itemOnline.educator_name[itemOnline.educator_name.length - 1] === ',') {
      itemOnline.educator_name = itemOnline.educator_name.slice(0, -1)
    }
    itemOnline.contacts_of_educator = discipline['PPS_CONTACT']
    itemOnline.information_of_implementation = discipline['INFO_FOR_PCS']
    itemOnline.hasFiles = discipline['FILES_LIST'].length !== 0
    itemOnline.link_to_course = discipline['URL_CURS']
    itemOnline.year = discipline['KURS']
    itemOnline.semester = discipline['SEMESTR']
    itemOnline.messagesCount = discipline['MCN']
    itemOnline.unreadMessagesCount = discipline['MCNN']
    if (itemOnline.group && !groups.includes(itemOnline.group)) {
      groups.push(itemOnline.group)
      semesters.push(0)
      i++
    }
    if (parseInt(itemOnline.semester) > semesters[i]) {
      semesters[i] = parseInt(itemOnline.semester)
    }
    onlineDisciplines.push(itemOnline)
  }
  // //console.log(onlineDisciplines)
  onlineDisciplines = onlineDisciplines.filter((item) => item.group === potok)
  // //console.log(onlineDisciplines)
  const disciplines = {}

  disciplines.messages = gradesValidator(
    onlineDisciplines.filter((disc) => disc.messagesCount > 0),
    groups,
    semesters
  )

  disciplines.files = gradesValidator(
    onlineDisciplines.filter((disc) => disc.hasFiles === true),
    groups,
    semesters
  )

  disciplines.info = gradesValidator(
    onlineDisciplines.filter(
      (disc) => disc.information_of_implementation.length > 0 || disc.contacts_of_educator.length > 0
    ),
    groups,
    semesters
  )

  return disciplines
}
