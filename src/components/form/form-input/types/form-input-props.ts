export type FormInputProps = {
  type: 'text' | 'email' | 'password' | undefined
  placeholder: string
  name: string
  value: string
  error: boolean
  errorText: string | undefined
  autocomplete: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}
