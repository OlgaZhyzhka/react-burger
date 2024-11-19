import { useNavigate } from 'react-router-dom'

import { MODE, ROUTES } from '@/utils/constants'
import { AuthDTO } from '@/utils/interfaces'
import { Form } from '@/components/form'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const handleSubmit = (authData: AuthDTO) => {
    console.log('ForgotPassword', authData)
    localStorage.setItem('resetPassword', 'true')
    navigate(ROUTES.resetPassword)
  }

  return (
    <section className="page page_center container">
      <div className="page__section">
        <h2 className="text text_type_main-medium text_color_inactive mb-6">
          Восстановление пароля
        </h2>
        <Form mode={MODE.forgotPassword} onSubmit={handleSubmit} />
      </div>
    </section>
  )
}

export default ForgotPassword
