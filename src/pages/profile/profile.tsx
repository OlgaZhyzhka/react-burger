import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useAppDispatch } from '@/services/store'
import { logout } from '@/services/user/actions'

const Profile = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <section className="page page_profile container">
      <div className="col">
        <Button
          htmlType="button"
          type="secondary"
          size="large"
          extraClass="text_color_inactive"
          onClick={handleLogout}>
          Выход
        </Button>
      </div>
      <div className="col"></div>
    </section>
  )
}

export default Profile
