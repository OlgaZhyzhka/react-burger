import { useState } from 'react'

type InitialValues = {
  email: string
  password: string
  name?: string
}

const initialFormValues: InitialValues = {
  email: '',
  password: '',
  name: '',
}

const useFormHandler = (initialValues = initialFormValues) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!values.email) newErrors.email = 'Email is required'
    if (values.password && values.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setValues(initialValues)
  }

  return { values, errors, validate, handleChange, resetForm }
}

export default useFormHandler
