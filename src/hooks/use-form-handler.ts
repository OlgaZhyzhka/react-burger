import { useState } from 'react'

export type ValidationSchema = {
  [key: string]: (value: string) => string | null
}

type InitialValues = {
  [key: string]: string
}

interface UseFormHandlerReturn {
  values: InitialValues
  errors: { [key: string]: string }
  validate: () => boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetForm: () => void
}

const useFormHandler = (
  validationSchema: ValidationSchema = {},
  initialValues: InitialValues = {},
): UseFormHandlerReturn => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setValues((prev: InitialValues) => ({ ...prev, [name]: value }))
  }

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {}
    for (const key in validationSchema) {
      const error = validationSchema[key](values[key as keyof InitialValues] || '')
      if (error) newErrors[key] = error
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = (): void => {
    setValues(initialValues)
  }

  return { values, errors, validate, handleChange, resetForm }
}

export default useFormHandler
