export type PasswordInputProps = {
  value: string
  error: boolean
  errorText: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}
