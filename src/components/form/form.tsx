import { FC, useEffect } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useFormHandler } from '@/hooks'
import { MODE } from '@/utils/constants'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { getError, setError } from '@/services/user/reducer'
import { PasswordInput } from '@/components/base-components/password-input'
import { FormFooter } from './form-footer'
import { FormProps } from './types/form-props'
import styles from './form.module.scss'

const Form: FC<FormProps> = ({ onSubmit, mode = MODE.login }) => {
  const dispatch = useAppDispatch()
  const formError = useAppSelector(getError)
  const { values, errors, validate, handleChange } = useFormHandler()
  let buttonText
  switch (mode) {
    case MODE.register:
      buttonText = 'Зарегистрироваться'
      break
    case MODE.forgotPassword:
      buttonText = 'Восстановить'
      break
    case MODE.resetPassword || MODE.profile:
      buttonText = 'Сохранить'
      break
    default:
      buttonText = 'Войти'
  }
  let placeholderEmail
  switch (mode) {
    case MODE.register || MODE.login:
      placeholderEmail = 'E-mail'
      break
    case MODE.forgotPassword:
      placeholderEmail = 'Укажите E-mail'
      break
    case MODE.profile:
      placeholderEmail = 'Логин'
      break
    default:
      placeholderEmail = 'E-mail'
  }
  // const isAuthForm = mode !== MODE.profile

  useEffect(() => {
    dispatch(setError(null))
  }, [dispatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ ...values })
    }
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      {(mode === MODE.register || mode === MODE.profile) && (
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => handleChange(e)}
          value={values.name || ''}
          name={'name'}
          error={!!errors.name}
          errorText={errors.name}
          size={'default'}
          extraClass="mb-6"
        />
      )}
      {mode !== MODE.resetPassword && (
        <Input
          type={'email'}
          placeholder={placeholderEmail}
          onChange={e => handleChange(e)}
          value={values.email || ''}
          name={'email'}
          error={!!errors.email}
          errorText={errors.email}
          size={'default'}
          extraClass="mb-6"
        />
      )}
      {(mode === MODE.login || mode === MODE.register || mode === MODE.resetPassword) && (
        <PasswordInput
          value={values.password || ''}
          onChange={e => handleChange(e)}
          error={!!errors.password}
          errorText={errors.password}
        />
      )}
      {mode === MODE.resetPassword && (
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => handleChange(e)}
          value={values.code || ''}
          name={'code'}
          error={!!errors.code}
          errorText={errors.code}
          size={'default'}
          extraClass="mb-6"
        />
      )}

      <Button htmlType="submit" type="primary" size="medium">
        {buttonText}
      </Button>

      <FormFooter mode={mode} />
      {formError && (
        <p className="text text_type_main-default text_color_error mt-4">{formError}</p>
      )}
    </form>
  )
}

export default Form
