import { FC, useState } from 'react'

import { AuthDTO } from '@/utils/interfaces'
import { AuthFormProps } from '@/components/auth-form/types/auth-form-props'

const AuthForm: FC<AuthFormProps> = ({ onSubmit, isRegister = false }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const authDTO: AuthDTO = { email, password, ...(isRegister && { name }) }
    onSubmit(authDTO)
  }

  return (
    <form onSubmit={handleSubmit}>
      {isRegister && (
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
    </form>
  )
}

export default AuthForm
