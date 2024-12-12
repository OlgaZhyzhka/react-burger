import { useState } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

import type { FormButtonProps } from './types/form-button-props'

const FormButton = ({ onClick, buttonText }: FormButtonProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e: React.FormEvent): void => {
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
      htmlType="submit"
      type="primary"
      size="medium"
      disabled={isLoading}
      onClick={handleClick}>
      {buttonText}
    </Button>
  )
}

export default FormButton
