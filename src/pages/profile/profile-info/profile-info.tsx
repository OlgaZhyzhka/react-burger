import { UpdateUserDTO } from '@/utils/types'
import { FormUpdate } from '@/components/form/form-update'

const ProfileInfo = () => {
  const handleSubmit = async (userDTO: UpdateUserDTO) => {
    console.log(userDTO)
  }

  return <FormUpdate onSubmit={handleSubmit} />
}

export default ProfileInfo
