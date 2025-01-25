import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { modalRoot } from '@/utils/constants'
import { ModalOverlay } from '@/components/modal/modal-overlay'
import { ModalHeader } from './modal-header'
import type { ModalProps } from './types/modal-props'
import styles from './modal.module.scss'

const Modal = ({ title, children, onClose }: ModalProps): React.JSX.Element => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent): void => {
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
    <div className={styles.root} data-cy="modal">
      <div className={styles.container} aria-modal="true" role="dialog">
        <ModalHeader title={title} onClose={onClose} />
        <div className={styles.body}>{children}</div>
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    document.getElementById(modalRoot)!,
  )
}

export default Modal
