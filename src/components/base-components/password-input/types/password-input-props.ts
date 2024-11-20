export type PasswordInputProps = {
  value: string
  error: boolean
  errorText: string | undefined
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}
