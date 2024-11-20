import { FC, useRef, useState, useEffect } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { EditableInputProps } from './types/editable-input-props'

const EditableInput: FC<EditableInputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  errorText,
  isDirty,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditable, setIsEditable] = useState(false)
  const handleIconClick = () => {
    setIsEditable(!isEditable)
    if (!isEditable && inputRef.current) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
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
