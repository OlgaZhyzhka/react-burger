import { AuthDTO } from '@/utils/interfaces'
import { MODE_TYPE } from '@/utils/types'

export type FormProps = {
  mode?: MODE_TYPE
  onSubmit: (authDTO: AuthDTO) => void
}
