import { useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router'

import { MODE, ROUTES } from '@/utils/constants'
import type { ForgotPasswordDTO } from '@/utils/types'
import { fetchForgotPassword } from '@/core/api/api-service'
import { setError } from '@/services/user/reducer'
import { useAppDispatch } from '@/services/store'
import { Form } from '@/components/form'

const ForgotPassword = (): React.JSX.Element => {
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = async ({ email }: ForgotPasswordDTO): Promise<void> => {
    if (!email) {
      dispatch(setError('Email is required'))
      return
    }

    try {
      await fetchForgotPassword({ email })
      localStorage.setItem('resetPassword', 'true')
      navigate(ROUTES.resetPassword)
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(setError(err.message || 'Failed to send password reset email'))
      }
      console.error(err)
    }
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
