export type EditableInputProps = {
  type: 'text' | 'email' | 'password' | undefined
  placeholder: string
  name: string
  value: string
  error: boolean
  errorText: string | undefined
  autocomplete: string
  isDirty?: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}
