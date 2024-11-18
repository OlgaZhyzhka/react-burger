import { Link } from 'react-router-dom'

import { AuthDTO } from '@/utils/interfaces'
import { MODE, ROUTES } from '@/utils/constants'
import { useAppDispatch } from '@/services/store'
import { register } from '@/services/user/actions'
import { AuthForm } from '@/components/auth-form'

const Register = () => {
  const dispatch = useAppDispatch()
  const handleRegister = (authDTO: AuthDTO) => {
    console.log('Register', authDTO)
    dispatch(register(authDTO))
  }

  return (
    <section className="page page_center container">
      <div className="page__section">
        <h2 className="text text_type_main-medium text_color_inactive mb-6">Регистрация</h2>
        <AuthForm mode={MODE.register} onSubmit={handleRegister} />
        <div className="mt-20 page__footer">
          <p className="text text_type_main-default text_color_inactive mb-4">
            Уже зарегистрированы? <Link to={ROUTES.login}>Войти</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register
