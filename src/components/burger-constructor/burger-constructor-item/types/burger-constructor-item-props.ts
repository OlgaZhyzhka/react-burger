import type { Ingredient } from '@/utils/interfaces'

export type BurgerConstructorItemProps = {
  ingredient: Ingredient
  index: number
  onDelete: (key: string | undefined) => void
  className?: string
}
