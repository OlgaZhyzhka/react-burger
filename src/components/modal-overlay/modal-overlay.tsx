import { FC } from 'react'

import styles from './modal-overlay.module.scss'

type ModalOverlayProps = {
  onOverlayClick: VoidFunction
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onOverlayClick }) => (
  <div className={styles.root} onClick={onOverlayClick}></div>
)

export default ModalOverlay
