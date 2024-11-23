import { MODE_TYPE } from '@/utils/types'
import { AuthDTO } from '@/utils/interfaces'

export type FormProps = {
  mode?: MODE_TYPE
  onSubmit(data: AuthDTO | Record<string, string>): void
}
