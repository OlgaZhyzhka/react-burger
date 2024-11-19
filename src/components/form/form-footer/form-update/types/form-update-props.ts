import { AuthDTO } from '@/utils/interfaces'

export type FormUpdateProps = {
  onSubmit(authDTO: AuthDTO): Promise<void>
}
