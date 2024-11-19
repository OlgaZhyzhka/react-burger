import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { MODE, ROUTES } from '@/utils/constants'
import { ResetPasswordDTO } from '@/utils/types'
import { fetchResetPassword } from '@/core/api/api-service'
import { useAppDispatch } from '@/services/store'
import { setError } from '@/services/user/reducer'
import { Form } from '@/components/form'

const ResetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = async ({ password, code }: ResetPasswordDTO) => {
    if (!password) {
      dispatch(setError('Password are required'))
      return
    }

    try {
      await fetchResetPassword({ password, code })
      navigate(ROUTES.login)
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(setError(err.message || 'Failed to reset password'))
      }
      console.error(err)
    } finally {
      localStorage.removeItem('resetPassword')
    }
  }

  useEffect(() => {
    const resetPasswordAllowed = localStorage.getItem('resetPassword')
    if (!resetPasswordAllowed) {
      navigate(ROUTES.forgotPassword)
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
