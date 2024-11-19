import { MODE_TYPE } from '@/utils/types'

export type FormProps = {
  mode?: MODE_TYPE
  onSubmit(data: Record<string, string>): Promise<void>
}
