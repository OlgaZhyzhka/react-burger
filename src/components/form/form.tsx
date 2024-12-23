import { FC, useEffect } from 'react'

import { useFormHandler } from '@/hooks'
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
import { FormProps } from './types/form-props'

const Form: FC<FormProps> = ({ onSubmit, mode = MODE.login }) => {
  const dispatch = useAppDispatch()
  const formError = useAppSelector(getError)
  const getValidationShema = () => {
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

  const getButtonText = () => {
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

  const getEmailPlaceholder = () => {
    switch (mode) {
      case MODE.forgotPassword:
        return 'Укажите E-mail'
      default:
        return 'E-mail'
    }
  }

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ ...values })
    }
  }

  useEffect(() => {
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
