import type { ModalOverlayProps } from './types/modal-overlay-props'
import styles from './modal-overlay.module.scss'

const ModalOverlay = ({ onClose }: ModalOverlayProps): React.JSX.Element => (
  <div className={styles.root} onClick={onClose}></div>
)

export default ModalOverlay
