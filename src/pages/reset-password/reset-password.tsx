import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthDTO } from '@/utils/interfaces'
import { MODE, ROUTES } from '@/utils/constants'
import { Form } from '@/components/form'

const ResetPassword = () => {
  const navigate = useNavigate()

  const handleSubmit = (authDTO: AuthDTO) => {
    console.log(authDTO)
    localStorage.deleteItem('resetPassword')
  }

  useEffect(() => {
    const resetPasswordAllowed = localStorage.getItem('resetPassword')
    if (!resetPasswordAllowed) {
      navigate(ROUTES.forgotPassword)
    } else {
      localStorage.removeItem('resetPassword')
    }
  }, [navigate])

  return (
    <section className="page page_center container">
      <div className="page__section">
        <h2 className="text text_type_main-medium text_color_inactive mb-6">
          Восстановление пароля
        </h2>
        <Form mode={MODE.resetPassword} onSubmit={handleSubmit} />
      </div>
    </section>
  )
}

export default ResetPassword
