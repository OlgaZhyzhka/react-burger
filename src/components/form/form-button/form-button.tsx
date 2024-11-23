import { FC, useState } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { FormButtonProps } from './types/form-button-props'

const FormButton: FC<FormButtonProps> = ({ onClick, buttonText }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      onClick()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      htmlType="button"
      type="primary"
      size="medium"
      disabled={isLoading}
      onClick={handleClick}>
      {buttonText}
    </Button>
  )
}

export default FormButton
