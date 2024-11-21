import { UpdateUserDTO } from '@/utils/types'
import { useAppDispatch } from '@/services/store'
import { update } from '@/services/user/actions'
import { FormUpdate } from '@/components/form/form-update'

const ProfileInfo = () => {
  const dispatch = useAppDispatch()
  const handleSubmit = (userDTO: UpdateUserDTO) => {
    dispatch(update(userDTO))
  }

  return <FormUpdate onSubmit={handleSubmit} />
}

export default ProfileInfo
