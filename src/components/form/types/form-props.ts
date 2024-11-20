import { MODE_TYPE } from '@/utils/types'

export type FormProps<T = Record<string, string>> = {
  mode?: MODE_TYPE
  onSubmit(data: T): void
}
