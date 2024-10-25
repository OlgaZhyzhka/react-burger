import { FC } from 'react'
import {
  BurgerIcon,
  Button,
  CloseIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { Link } from '@/components/base-components/link'
import styles from './nav-mobile.module.scss'

type NavMobileProps = {
  onClose: () => void
}

const NavMobile: FC<NavMobileProps> = ({ onClose }) => (
  <nav className={styles.root}>
    <div className={styles.header}>
      <h3 className={styles.title}>Меню</h3>
      <Button htmlType="button" type="secondary" size="small" onClick={onClose}>
        <CloseIcon type="primary" />
      </Button>
    </div>
    <ul className={styles.menu}>
      <li>
        <Link href="/" className={classNames(styles.link, styles.inactive)}>
          <ProfileIcon type="secondary" className="mr-2" />
          Личный кабинет
        </Link>
      </li>
      <li>
        <Link href="/" className={classNames(styles.link, 'pl-5 pr-5 pt-4 pb-4 mr-2')}>
          <BurgerIcon type="primary" className="mr-2" />
          Конструктор
        </Link>
      </li>
      <li>
        <Link href="/" className={classNames(styles.link, styles.inactive, 'pl-5 pr-5 pt-4 pb-4')}>
          <ListIcon type="secondary" className="mr-2" />
          Лента заказов
        </Link>
      </li>
    </ul>
  </nav>
)

export default NavMobile
