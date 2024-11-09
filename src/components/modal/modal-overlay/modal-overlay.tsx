import { FC } from 'react'

import { ModalOverlayProps } from './types/modal-overlay-props'
import styles from './modal-overlay.module.scss'

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => (
  <div className={styles.root} onClick={onClose}></div>
)

export default ModalOverlay
