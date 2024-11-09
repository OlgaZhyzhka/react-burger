import { IngredientType } from '@/utils/types'

export type TabsProps = {
  activeTab: IngredientType
  onTabChange: (value: IngredientType) => void
}
