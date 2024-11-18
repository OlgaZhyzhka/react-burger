import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { ROUTES } from '@/utils/constants'
import styles from './header-desktop.module.scss'

const HeaderDesktop = () => (
  <>
    <div className={styles.col}>
      <NavLink
        to={ROUTES.home}
        className={({ isActive }) =>
          classNames(isActive && styles.active, styles.link, 'pl-5 pr-5 pt-4 pb-4')
        }>
        <BurgerIcon type="primary" className="mr-2" />
        Конструктор
      </NavLink>
      <NavLink
        to=""
        className={({ isActive }) =>
          classNames(isActive && styles.active, styles.link, 'pl-5 pr-5 pt-4 pb-4')
        }>
        <ListIcon type="secondary" className="mr-2" />
        Лента заказов
      </NavLink>
      <NavLink to={ROUTES.home}>
        <Logo className={styles.logo} />
      </NavLink>
    </div>
    <NavLink
      to={ROUTES.profile}
      className={({ isActive }) =>
        classNames(isActive && styles.active, styles.link, 'pl-5 pr-5 pt-4 pb-4')
      }>
      <ProfileIcon type="secondary" className="mr-2" />
      Личный кабинет
    </NavLink>
  </>
)

export default HeaderDesktop
