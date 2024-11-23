import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  BurgerIcon,
  Button,
  CloseIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { ROUTES } from '@/utils/constants'
import { getUser } from '@/services/user/reducer'
import { useAppSelector } from '@/services/store'
import { NavMobileProps } from './types/nav-mobile-props'
import styles from './nav-mobile.module.scss'

const NavMobile: FC<NavMobileProps> = ({ onClose }) => {
  const name = useAppSelector(getUser)?.name
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <nav className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.title}>Меню</h3>
        <Button htmlType="button" type="secondary" size="small" onClick={onClose}>
          <CloseIcon type="primary" />
        </Button>
      </div>
      <ul className={styles.menu}>
        <li>
          <NavLink
            to={ROUTES.profile}
            className={({ isActive }) =>
              classNames(isActive && styles.active, styles.link, 'pl-5 pr-5 pt-4 pb-4')
            }
            onClick={() => handleNavigation(ROUTES.profile)}>
            <ProfileIcon type="secondary" className="mr-2" />
            {name ? name : 'Личный кабинет'}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.home}
            className={({ isActive }) =>
              classNames(isActive && styles.active, styles.link, 'pl-5 pr-5 pt-4 pb-4')
            }
            onClick={() => handleNavigation(ROUTES.home)}>
            <BurgerIcon type="primary" className="mr-2" />
            Конструктор
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.orderFeed}
            className={({ isActive }) =>
              classNames(isActive && styles.active, styles.link, 'pl-5 pr-5 pt-4 pb-4')
            }
            onClick={() => handleNavigation('')}>
            <ListIcon type="secondary" className="mr-2" />
            Лента заказов
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavMobile
