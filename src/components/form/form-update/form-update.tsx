import { useEffect, useState } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useFormHandler } from '@/hooks'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { getError, getUser, setError } from '@/services/user/reducer'
import EditableInput from '@/components/base-components/editable-input/editable-input'
import { FormButton } from '@/components/form/form-button'
import type { FormUpdateProps } from './types/form-update-props'
import styles from './form-update.module.scss'

const FormUpdate = ({ onSubmit }: FormUpdateProps): React.JSX.Element => {
  const [isDirty, setIsDirty] = useState(false)
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUser)
  const formError = useAppSelector(getError)
  const { values, errors, validate, handleChange, resetForm } = useFormHandler({}, { ...user })

  useEffect(() => {
    dispatch(setError(null))
  }, [dispatch])

  const handleSubmit = (): void => {
    if (validate()) {
      onSubmit({ ...values })
      setIsDirty(false)
      dispatch(setError(null))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange(e)
    setIsDirty(true)
  }

  const handleCancel = (): void => {
    setIsDirty(false)
    dispatch(setError(null))
    resetForm()
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <EditableInput
        type={'text'}
        placeholder={'Имя'}
        name={'name'}
        value={values.name || ''}
        error={!!errors.name}
        errorText={errors.name}
        autocomplete={'off'}
        onChange={handleInputChange}
        isDirty={isDirty}
      />
      <EditableInput
        type={'email'}
        placeholder={'Логин'}
        name={'email'}
        value={values.email || ''}
        error={!!errors.email}
        errorText={errors.email}
        autocomplete={'off'}
        onChange={handleInputChange}
        isDirty={isDirty}
      />
      <EditableInput
        type={'password'}
        placeholder={'Пароль'}
        name={'password'}
        value={values.password || ''}
        error={!!errors.password}
        errorText={errors.password}
        autocomplete={'off'}
        onChange={handleInputChange}
        isDirty={isDirty}
      />
      {isDirty && (
        <div className={styles.footer}>
          <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
            Отмена
          </Button>
          <FormButton onClick={handleSubmit} buttonText={'Сохранить'} />
        </div>
      )}

      {formError && (
        <p className="text text_type_main-default text_color_error mt-4">{formError}</p>
      )}
    </form>
  )
}

export default FormUpdate
