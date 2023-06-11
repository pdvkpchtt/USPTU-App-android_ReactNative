import Form from './ui/Form'
import { logIn } from './utils/logIn'

export const LoginForm = () => {
  return <Form logIn={logIn} />
}
