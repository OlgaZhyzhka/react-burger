import { MODE } from '@/utils/constants'
import { Form } from '@/components/form'
import { AuthDTO } from '@/utils/interfaces'

const ForgotPassword = () => {
  const handleSubmit = (authData: AuthDTO) => {
    console.log('ForgotPassword', authData)
    localStorage.setItem('resetPassword', JSON.stringify(true))
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
