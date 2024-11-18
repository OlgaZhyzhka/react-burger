import { AuthDTO } from '@/utils/interfaces'
import { MODE_TYPE } from '@/utils/types'

export type AuthFormProps = {
  mode?: MODE_TYPE
  onSubmit: (authDTO: AuthDTO) => void
}
