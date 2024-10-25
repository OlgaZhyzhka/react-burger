import { FC, PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { modalRoot } from '@/utils/constants'
import { ModalOverlay } from '@/components/modal/modal-overlay'
import { ModalHeader } from './modal-header'
import styles from './modal.module.scss'

type ModalProps = {
  title?: string
  onClose: VoidFunction
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ title, children, onClose }) => {
  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [])

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
