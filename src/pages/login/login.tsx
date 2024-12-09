import type { LoginDTO } from '@/utils/types'
import { login } from '@/services/user/actions'
import { useAppDispatch } from '@/services/store'
import { Form } from '@/components/form'

const Login = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const handleSubmit = (authDTO: LoginDTO): void => {
    dispatch(login(authDTO))
  }

  return (
    <section className="page page_center container">
      <div className="page__section">
        <h2 className="text text_type_main-medium text_color_inactive mb-6">Вход</h2>
        <Form onSubmit={handleSubmit} />
      </div>
    </section>
  )
}

export default Login
