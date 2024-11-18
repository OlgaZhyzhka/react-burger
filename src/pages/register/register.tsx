import { AuthDTO } from '@/utils/interfaces'
import { MODE } from '@/utils/constants'
import { useAppDispatch } from '@/services/store'
import { register } from '@/services/user/actions'
import { Form } from '@/components/form'

const Register = () => {
  const dispatch = useAppDispatch()
  const handleSubmit = (authDTO: AuthDTO) => {
    console.log('Register', authDTO)
    dispatch(register(authDTO))
  }

  return (
    <section className="page page_center container">
      <div className="page__section">
        <h2 className="text text_type_main-medium text_color_inactive mb-6">Регистрация</h2>
        <Form mode={MODE.register} onSubmit={handleSubmit} />
      </div>
    </section>
  )
}

export default Register
