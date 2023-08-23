import apiClient from '../../../shared/apiClient/index'

export default async function addStudentWorkDescription(state) {
  ////console.log(JSON.stringify(state))
  const formData = encodeURI(
    JSON.stringify({
      ID: state.id.toString(),
      KONT_ID: '0000',
      WORKNOMER: state.worknomer.toString(),
      DISC_ID: Math.round(state.disciplineId.toString().substring(4, 10)).toString(),
      TYPE_CONTROL: state.typeId.toString(),
      SEMESTR: state.semester.toString(),
      NAIM_WORK: state.name,
      DATA_WORK: state.getDate(),
      WORK_REVIEW: state.review,
      DOP_INFO: state.extraInfo,
      // NAIM_WORK: work.name,
      // DATA_WORK: work.date,
      // WORK_REVIEW: work?.review || '',
      // DOP_INFO: work?.info || '',
    })
  )

  const data = await apiClient.post('', `d=sv&DATA=${formData}`, {
    params: {
      obj: 'StudWork',
    },
  })

  return data.data
}
