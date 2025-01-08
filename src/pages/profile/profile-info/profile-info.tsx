import type { UpdateUserDTO } from '@/utils/types'
import { useAppDispatch } from '@/services/store'
import { update } from '@/services/user/actions'
import { FormUpdate } from '@/components/form/form-update'

const ProfileInfo = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const handleSubmit = (userDTO: UpdateUserDTO): void => {
    dispatch(update(userDTO))
  }

  return <FormUpdate onSubmit={handleSubmit} />
}

export default ProfileInfo
