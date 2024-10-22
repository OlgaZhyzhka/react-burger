import { FC } from 'react'

import styles from './modal-overlay.module.scss'

type ModalOverlayProps = {
  onClose: VoidFunction
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => (
  <div className={styles.root} onClick={onClose}></div>
)

export default ModalOverlay
