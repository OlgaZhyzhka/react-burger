import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from '@/components/base-components/link'
import classNames from 'classnames'

import styles from './header-desktop.module.scss'

const HeaderDesktop = () => (
  <>
    <div className={styles.col}>
      <Link href="/" className={classNames(styles.link, 'pl-5 pr-5 pt-4 pb-4 mr-2')}>
        <BurgerIcon type="primary" className="mr-2" />
        Конструктор
      </Link>
      <Link href="/" className={classNames(styles.link, styles.inactive, 'pl-5 pr-5 pt-4 pb-4')}>
        <ListIcon type="secondary" className="mr-2" />
        Лента заказов
      </Link>
      <Link href="/">
        <Logo className={styles.logo} />
      </Link>
    </div>
    <Link href="/" className={classNames(styles.link, styles.inactive, 'pl-5 pr-5 pt-4 pb-4')}>
      <ProfileIcon type="secondary" className="mr-2" />
      Личный кабинет
    </Link>
  </>
)

export default HeaderDesktop
