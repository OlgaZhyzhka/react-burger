import { useState, useCallback } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback((): void => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback((): void => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    openModal,
    closeModal,
  }
}

export default useModal
