import { useRef, useState, useEffect } from 'react'

import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import type { EditableInputProps } from './types/editable-input-props'

const EditableInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  errorText,
  isDirty,
}: EditableInputProps): React.JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditable, setIsEditable] = useState(false)
  const handleIconClick = (): void => {
    setIsEditable(!isEditable)
    if (!isEditable && inputRef.current) {
      inputRef.current.focus()
    }
  }

  useEffect((): void => {
    if (!isDirty) {
      setIsEditable(false)
    }
  }, [isDirty])

  return (
    <Input
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      icon={isEditable ? 'CloseIcon' : 'EditIcon'}
      onIconClick={handleIconClick}
      value={value}
      name={name}
      error={error}
      errorText={errorText}
      size={'default'}
      extraClass="mb-6"
      disabled={!isEditable}
    />
  )
}

export default EditableInput
