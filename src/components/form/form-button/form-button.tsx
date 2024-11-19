import { FC, useState } from 'react'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FormButtonProps } from './types/form-button-props'

const LoadingButton: FC<FormButtonProps> = ({ onClick, buttonText }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onClick()
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

export default LoadingButton
