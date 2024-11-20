import { FC, useEffect } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

import { useFormHandler } from '@/hooks'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { getError, getUser, setError } from '@/services/user/reducer'
import { FormUpdateProps } from './types/form-update-props'
import { FormButton } from '@/components/form/form-button'

const FormUpdate: FC<FormUpdateProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUser)
  const formError = useAppSelector(getError)
  const { values, errors, validate, handleChange } = useFormHandler({}, { ...user })

  useEffect(() => {
    dispatch(setError(null))
  }, [dispatch])

  const handleIconClick = () => {}

  const handleSubmit = () => {
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
        icon={'EditIcon'}
        onIconClick={handleIconClick}
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
        icon={'EditIcon'}
        onIconClick={handleIconClick}
        error={!!errors.email}
        errorText={errors.email}
        size={'default'}
        extraClass="mb-6"
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={e => handleChange(e)}
        icon={'EditIcon'}
        onIconClick={handleIconClick}
        value={values.password || ''}
        name={'password'}
        error={!!errors.password}
        errorText={errors.password}
        size={'default'}
        extraClass="mb-6"
      />

      <FormButton onClick={handleSubmit} buttonText={'Сохранить'} />

      {formError && (
        <p className="text text_type_main-default text_color_error mt-4">{formError}</p>
      )}
    </form>
  )
}

export default FormUpdate
