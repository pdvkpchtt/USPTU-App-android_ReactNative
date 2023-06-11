import { useUserStore } from '../../entities/user'
import deleteStudentWorkDraft from './api/deleteStudentWorkDraft'
import Form from './ui/Form'

const WorkManageForm = ({ id, navigation }) => {
  return (
    <Form
      draftSend={async () => {
        const res = await deleteStudentWorkDraft(id)
        navigation.goBack()
      }}
      workSend={async () => {
        // console.log('workSend')
      }}
      id={id}
    />
  )
}

export default WorkManageForm
