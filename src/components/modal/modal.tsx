import { FC, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { modalRoot } from '@/utils/constants'
import { PropsWithChildren } from '@/utils/types'
import { ModalOverlay } from '@/components/modal/modal-overlay'
import { ModalHeader } from './modal-header'
import { ModalProps } from './types/modal-props'
import styles from './modal.module.scss'

const Modal: FC<PropsWithChildren<ModalProps>> = ({ title, children, onClose }) => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [handleEscKey])

  return createPortal(
    <div className={styles.root}>
      <div className={styles.container}>
        <ModalHeader title={title} onClose={onClose} />
        <div className={styles.body}>{children}</div>
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    document.getElementById(modalRoot)!,
  )
}

export default Modal
