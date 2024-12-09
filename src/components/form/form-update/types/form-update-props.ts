import type { UpdateUserDTO } from '@/utils/types'

export type FormUpdateProps = {
  onSubmit(data: UpdateUserDTO): void
}
