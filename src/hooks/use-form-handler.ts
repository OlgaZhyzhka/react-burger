import { useState } from 'react'

type ValidationSchema<T> = {
  [K in keyof T]?: (value: T[K]) => string | null
}

type UseFormHandlerProps<T> = {
  validationSchema?: ValidationSchema<T>
  initialValues: T
}

export const useFormHandler = <T extends Record<string, string>>({
  validationSchema = {},
  initialValues,
}: UseFormHandlerProps<T>) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({
      ...prev,
      [name]: value as T[keyof T],
    }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {}

    for (const key in validationSchema) {
      const validator = validationSchema[key]
      if (validator) {
        const error = validator(values[key])
        if (error) {
          newErrors[key] = error
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
  }

  return { values, errors, handleChange, validate, resetForm }
}
