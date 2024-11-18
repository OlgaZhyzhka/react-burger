import { FC, useRef, useState } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { PasswordInputProps } from './types/password-input-props'

const PasswordInput: FC<PasswordInputProps> = ({ value, onChange, error, errorText }) => {
  const inputPasswordRef = useRef(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible)
    if (inputPasswordRef.current) {
      const input = inputPasswordRef.current as HTMLInputElement
      input.type = isPasswordVisible ? 'password' : 'text'
    }
  }

  return (
    <Input
      type={isPasswordVisible ? 'text' : 'password'}
      placeholder={'Пароль'}
      onChange={onChange}
      icon={isPasswordVisible ? 'ShowIcon' : 'HideIcon'}
      value={value}
      name={'password'}
      error={error}
      errorText={errorText}
      size={'default'}
      ref={inputPasswordRef}
      onIconClick={handleIconClick}
      extraClass="mb-6"
    />
  )
}

export default PasswordInput
