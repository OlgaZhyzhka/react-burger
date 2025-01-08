import { useEffect } from 'react'

import { useFormHandler } from '@/hooks'
import type { ValidationSchema } from '@/hooks/use-form-handler'
import {
  forgotPasswordValidationSchema,
  loginValidationSchema,
  MODE,
  registerValidationSchema,
  resetPasswordValidationSchema,
} from '@/utils/constants'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { getError, setError } from '@/services/user/reducer'
import { PasswordInput } from '@/components/base-components/password-input'
import { FormInput } from '@/components/form/form-input'
import { FormButton } from './form-button'
import { FormFooter } from './form-footer'
import type { FormProps } from './types/form-props'

const Form = ({ onSubmit, mode = MODE.login }: FormProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const formError = useAppSelector(getError)
  const getValidationShema = (): ValidationSchema => {
    switch (mode) {
      case MODE.login:
        return loginValidationSchema
      case MODE.register:
        return registerValidationSchema
      case MODE.forgotPassword:
        return forgotPasswordValidationSchema
      case MODE.resetPassword:
        return resetPasswordValidationSchema
      default:
        return {}
    }
  }

  const { values, errors, validate, handleChange } = useFormHandler(getValidationShema())

  const getButtonText = (): string => {
    switch (mode) {
      case MODE.register:
        return 'Зарегистрироваться'
      case MODE.forgotPassword:
        return 'Восстановить'
      case MODE.resetPassword:
        return 'Сохранить'
      default:
        return 'Войти'
    }
  }

  const getEmailPlaceholder = (): string => {
    switch (mode) {
      case MODE.forgotPassword:
        return 'Укажите E-mail'
      default:
        return 'E-mail'
    }
  }

  const handleSubmit = (): void => {
    if (validate()) {
      onSubmit({ ...values })
    }
  }

  useEffect((): void => {
    dispatch(setError(null))
  }, [dispatch])

  return (
    <form onSubmit={handleSubmit}>
      {mode === MODE.register && (
        <FormInput
          type={'text'}
          placeholder={'Имя'}
          onChange={e => handleChange(e)}
          value={values.name || ''}
          name={'name'}
          error={!!errors.name}
          errorText={errors.name}
          autocomplete={'name'}
        />
      )}
      {mode !== MODE.resetPassword && (
        <FormInput
          type={'email'}
          placeholder={getEmailPlaceholder()}
          onChange={e => handleChange(e)}
          value={values.email || ''}
          name={'email'}
          error={!!errors.email}
          errorText={errors.email}
          autocomplete={'email'}
        />
      )}
      {mode !== MODE.forgotPassword && (
        <PasswordInput
          value={values.password || ''}
          onChange={e => handleChange(e)}
          error={!!errors.password}
          errorText={errors.password}
          autocomplete={'current-password'}
        />
      )}
      {mode === MODE.resetPassword && (
        <FormInput
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => handleChange(e)}
          value={values.code || ''}
          name={'code'}
          error={!!errors.code}
          errorText={errors.code}
          autocomplete={'one-time-code'}
        />
      )}

      <FormButton onClick={handleSubmit} buttonText={getButtonText()} />

      <FormFooter mode={mode} />
      {formError && (
        <p className="text text_type_main-default text_color_error mt-4">{formError}</p>
      )}
    </form>
  )
}

export default Form
