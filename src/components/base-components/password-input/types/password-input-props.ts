export type PasswordInputProps = {
  value: string
  error: boolean
  errorText: string | undefined
  autocomplete: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}
