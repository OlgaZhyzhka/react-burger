import { Outlet, Link } from 'react-router-dom'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { ROUTES } from '@/utils/constants'
import { useAppDispatch } from '@/services/store'
import { logout } from '@/services/user/actions'

const Profile = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const handleLogout = (): void => {
    dispatch(logout())
  }

  return (
    <section className="page page_profile container">
      <div className="row">
        <div className="col-3">
          <ul className="menu">
            <li className="menu__item">
              <Link
                className={'button button_type_secondary button_size_large text_color_inactive'}
                to={ROUTES.profile}>
                Профиль
              </Link>
            </li>
            <li className="menu__item">
              <Link
                className={'button button_type_secondary button_size_large text_color_inactive'}
                to={ROUTES.profileOrders}>
                История заказов
              </Link>
            </li>
            <li className="menu__item">
              <Button
                htmlType="button"
                type="secondary"
                size="large"
                extraClass="text_color_inactive"
                onClick={handleLogout}>
                Выход
              </Button>
            </li>
          </ul>

          <p className="profile__text text text_type_main-default text_color_inactive">
            В этом разделе вы можете <br /> изменить свои персональные данные
          </p>
        </div>
        <div className="col-9">
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default Profile
