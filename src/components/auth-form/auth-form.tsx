import { FC, useEffect } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useFormHandler } from '@/hooks'
import { MODE } from '@/utils/constants'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { getAuthError, setAuthError } from '@/services/user/reducer'
import { PasswordInput } from '@/components/base-components/password-input'
import { AuthFormProps } from './types/auth-form-props'

const AuthForm: FC<AuthFormProps> = ({ onSubmit, mode = MODE.login }) => {
  const dispatch = useAppDispatch()
  const authError = useAppSelector(getAuthError)
  const { values, errors, validate, handleChange } = useFormHandler()

  useEffect(() => {
    dispatch(setAuthError(null))
  }, [dispatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ ...values })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {mode === MODE.register && (
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
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={e => handleChange(e)}
        value={values.email || ''}
        name={'email'}
        error={!!errors.email}
        errorText={errors.email}
        size={'default'}
        extraClass="mb-6"
      />
      <PasswordInput
        value={values.password || ''}
        onChange={e => handleChange(e)}
        error={!!errors.password}
        errorText={errors.password}
      />
      <Button htmlType="submit" type="primary" size="medium">
        {mode === MODE.register ? 'Зарегистрироваться' : 'Войти'}
      </Button>
      {authError && (
        <p className="text text_type_main-default text_color_error mt-4">{authError}</p>
      )}
    </form>
  )
}

export default AuthForm
