import { AuthDTO } from '@/utils/interfaces'

export type AuthFormProps = {
  onSubmit: (authDTO: AuthDTO) => void
  isRegister?: boolean
}
