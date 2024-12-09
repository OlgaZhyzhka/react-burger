import { Link } from 'react-router-dom'

import { MODE, ROUTES } from '@/utils/constants'
import type { FormFooterProps } from './types/form-footer-props'

const FormFooter = ({ mode }: FormFooterProps): React.JSX.Element => {
  return (
    <div className="mt-20">
      {mode === MODE.login && (
        <>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Вы — новый пользователь? <Link to={ROUTES.register}>Зарегистрироваться</Link>
          </p>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Забыли пароль? <Link to={ROUTES.forgotPassword}>Восстановить пароль</Link>
          </p>
        </>
      )}
      {mode === MODE.register && (
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы? <Link to={ROUTES.login}>Войти</Link>
        </p>
      )}
      {(mode === MODE.forgotPassword || mode === MODE.resetPassword) && (
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль? <Link to={ROUTES.login}>Войти</Link>
        </p>
      )}
    </div>
  )
}

export default FormFooter
