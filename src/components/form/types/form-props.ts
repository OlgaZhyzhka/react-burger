import type { MODE_TYPE } from '@/utils/types'
import type { AuthDTO } from '@/utils/interfaces'

export type FormProps = {
  mode?: MODE_TYPE
  onSubmit(data: AuthDTO | Record<string, string>): void
}
