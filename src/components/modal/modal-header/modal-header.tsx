import type { ModalHeaderProps } from './types/modal-header-props'
import styles from './modal-header.module.scss'

const ModalHeader = ({ title, onClose }: ModalHeaderProps): React.JSX.Element => (
  <div className={styles.header}>
    {title && <h2 className="text text_type_main-large m-0">{title}</h2>}
    <span className={styles.close} onClick={onClose}>
      <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.293.293a1 1 0 0 1 1.414 0L9 7.586 16.293.293a1 1 0 1 1 1.414 1.414L10.414 9l7.293 7.293a1 1 0 0 1-1.414 1.414L9 10.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L7.586 9 .293 1.707a1 1 0 0 1 0-1.414Z"
          fill="currentColor"
        />
      </svg>
    </span>
  </div>
)

export default ModalHeader
