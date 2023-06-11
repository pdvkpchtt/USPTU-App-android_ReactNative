import apiClient from '../../../shared/apiClient'
import getYearAndSemesterFromStudyGroup from '../../../shared/utils/getYearAndSemesterFromStudyGroup'
import getLevelOfEducation from '../utils/getLevelOfEducation'
import getQualification from '../utils/getQualification'

export default async function getProfileInformation(id) {
  const studentData = await apiClient.post(null, `kont_id=0${id}`, {
    params: {
      obj: 'get_stud_info',
    },
  })
  const profile = {}

  const validatedStudentData = studentData.data['data'].sort((a, b) => b.worknomer > a.worknomer)

  profile['surname'] = validatedStudentData[0]['family']
  profile['name'] = validatedStudentData[0]['name']
  profile['middlename'] = validatedStudentData[0]['father'] || null
  profile['email'] = validatedStudentData[0]['email'] || null
  profile['phone'] = validatedStudentData[0]['mobilephone'] || null

  const groupData = []
  for (let item of validatedStudentData) {
    const chunk = {
      study_group: item['gruppa'],
      record_book_number: item['nomzachet'],
      level_of_education: getLevelOfEducation(item['level_obraz']),
      qualification: getQualification(item['kvalif']),
    }
    groupData.push(chunk)
  }

  profile.data = groupData

  const studentSpecInfo = await apiClient.post(null, `kont_id=0${id}`, {
    params: {
      obj: 'get_kont_dvig',
    },
  })

  for (let item of profile.data) {
    const { year, semester } = getYearAndSemesterFromStudyGroup(item['study_group'])
    item.year = year
    item.semester = semester
  }

  profile['movements'] = []

  for (let item of studentSpecInfo.data['data']) {
    const movement = {}
    movement['end_date'] = item['datak'] || ''
    movement['start_date'] = item['datan'] || ''
    movement['order_date'] = item['dataprikaz'] || ''
    movement['group'] = item['gruppa'] || ''
    movement['speciality_code'] = item['kod_okco'] || ''
    movement['year'] = item['kurs'] || ''
    movement['department'] = item['nfaka'] || ''
    movement['mode_of_study'] = item['nfob'] || ''
    movement['action'] = item['nkaprikaz'] || ''
    movement['education_type'] = item['nnapr'] || ''
    movement['order_number'] = item['nomerprikaz'] || ''
    movement['record_book_number'] = item['nomzachet'] || ''
    movement['speciality'] = item['nspc'] || ''
    movement['study_group_code'] = item['nspecya'] || ''
    movement['cause'] = item['nvidprikaz'] || ''
    movement['grade_point_average'] = item['rait'] || ''
    profile['movements'].push(movement)
  }
  const data = []
  const dopGroups = []

  for (let item of profile.data) {
    const needMovements = profile.movements.filter(
      (movement) => movement.record_book_number == item.record_book_number && movement.group == item.study_group
    )
    const needMovementsWithGPA = needMovements.filter((movement) => movement.grade_point_average !== '/д')
    const itemWithExtraData = item
    if (needMovementsWithGPA.length) {
      itemWithExtraData.mode_of_study = needMovementsWithGPA[needMovementsWithGPA.length - 1].mode_of_study
      itemWithExtraData.department = needMovementsWithGPA[needMovementsWithGPA.length - 1].department
      itemWithExtraData.speciality_code = needMovementsWithGPA[needMovementsWithGPA.length - 1].speciality_code
      itemWithExtraData.speciality = needMovementsWithGPA[needMovementsWithGPA.length - 1].speciality
      itemWithExtraData.study_group_code = needMovementsWithGPA[needMovementsWithGPA.length - 1].study_group_code
      itemWithExtraData.education_type = needMovementsWithGPA[needMovementsWithGPA.length - 1].education_type
      itemWithExtraData.grade_point_average = needMovementsWithGPA[needMovementsWithGPA.length - 1].grade_point_average
    } else {
      itemWithExtraData.mode_of_study = needMovements[needMovements.length - 1].mode_of_study
      itemWithExtraData.department = needMovements[needMovements.length - 1].department
      itemWithExtraData.speciality_code = needMovements[needMovements.length - 1].speciality_code
      itemWithExtraData.speciality = needMovements[needMovements.length - 1].speciality
      itemWithExtraData.study_group_code = needMovements[needMovements.length - 1].study_group_code
      itemWithExtraData.education_type = needMovements[needMovements.length - 1].education_type
      itemWithExtraData.grade_point_average = needMovements[needMovements.length - 1].grade_point_average
    }
    if (item.record_book_number) {
      data.push(itemWithExtraData)
    } else {
      dopGroups.push(itemWithExtraData)
    }
  }
  data.push(...dopGroups)
  profile.data = data

  return profile
}
