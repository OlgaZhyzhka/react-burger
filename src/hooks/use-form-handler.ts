import { useState } from 'react'

type ValidationSchema = {
  [key: string]: (value: string) => string | null
}

type InitialValues = {
  [key: string]: string
}

const useFormHandler = (
  validationSchema: ValidationSchema = {},
  initialValues: InitialValues = {},
) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    for (const key in validationSchema) {
      const error = validationSchema[key](values[key as keyof InitialValues] || '')
      if (error) newErrors[key] = error
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setValues(initialValues)
  }

  return { values, errors, validate, handleChange, resetForm }
}

export default useFormHandler
