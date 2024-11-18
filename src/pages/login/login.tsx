import { Link } from 'react-router-dom'

import { ROUTES } from '@/utils/constants'
import { AuthDTO } from '@/utils/interfaces'
import { login } from '@/services/user/actions'
import { useAppDispatch } from '@/services/store'
import { AuthForm } from '@/components/auth-form'

const Login = () => {
  const dispatch = useAppDispatch()
  const handleLogin = (authDTO: AuthDTO) => {
    dispatch(login(authDTO))
  }

  return (
    <section className="page page_center container">
      <div className="page__section">
        <h2 className="text text_type_main-medium text_color_inactive mb-6">Вход</h2>
        <AuthForm onSubmit={handleLogin} />
        <div className="mt-20 page__footer">
          <p className="text text_type_main-default text_color_inactive mb-4">
            Вы — новый пользователь? <Link to={ROUTES.register}>Зарегистрироваться</Link>
          </p>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Забыли пароль? <Link to={ROUTES.forgotPassword}>Восстановить пароль</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
