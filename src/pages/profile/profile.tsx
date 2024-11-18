import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useAppDispatch } from '@/services/store'
import { logout } from '@/services/user/actions'
import { MODE } from '@/utils/constants'
import { Form } from '@/components/form'

const Profile = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  const handleSubmit = () => {
    console.log('Profile')
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
      <div className="col">
        <Form mode={MODE.profile} onSubmit={handleSubmit} />
      </div>
    </section>
  )
}

export default Profile
