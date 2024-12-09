import { useRef, useState } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

import type { PasswordInputProps } from './types/password-input-props'

const PasswordInput = ({
  value,
  onChange,
  error,
  errorText,
}: PasswordInputProps): React.JSX.Element => {
  const inputPasswordRef = useRef<HTMLInputElement>(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleIconClick = (): void => {
    setIsPasswordVisible(!isPasswordVisible)
    if (inputPasswordRef.current) {
      const input = inputPasswordRef.current
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
