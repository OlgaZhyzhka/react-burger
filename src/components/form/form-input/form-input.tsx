import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

import type { FormInputProps } from './types/form-input-props'

const FormInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  errorText,
}: FormInputProps): React.JSX.Element => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      error={error}
      errorText={errorText}
      size={'default'}
      extraClass="mb-6"
    />
  )
}

export default FormInput
