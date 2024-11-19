import { FC, useEffect } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useFormHandler } from '@/hooks'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { getError, setError } from '@/services/user/reducer'
import { PasswordInput } from '@/components/base-components/password-input'
import { FormUpdateProps } from './types/form-update-props'

const FormUpdate: FC<FormUpdateProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch()
  const formError = useAppSelector(getError)
  const { values, errors, validate, handleChange } = useFormHandler()

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
    <form onSubmit={handleSubmit}>
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
      <Input
        type={'email'}
        placeholder={'Логин'}
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
        Сохранить
      </Button>

      {formError && (
        <p className="text text_type_main-default text_color_error mt-4">{formError}</p>
      )}
    </form>
  )
}

export default FormUpdate
