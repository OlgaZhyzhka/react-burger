import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import type { Ingredient } from '@/utils/interfaces'
import { useAppSelector } from '@/services/store'
import { getIngredients } from '@/services/ingredients/selectors'
import styles from './ingredient-details.module.scss'

const IngredientDetails = (): React.JSX.Element | null => {
  const ingredients = useAppSelector(getIngredients)

  const { ingredientId } = useParams<{ ingredientId: string }>()
  const ingredient: Ingredient | undefined = useMemo<Ingredient | undefined>(():
    | Ingredient
    | undefined => {
    return ingredients?.find((item: Ingredient): boolean => item._id === ingredientId)
  }, [ingredients, ingredientId])

  if (!ingredient) return null

  return (
    <div className={styles.item}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h3 className="text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>
      <ul className={styles.list}>
        <li>
          <span>Калории,ккал</span>
          <span className={styles.value}>{ingredient.calories}</span>
        </li>
        <li>
          <span>Белки, г</span>
          <span className={styles.value}>{ingredient.proteins}</span>
        </li>
        <li>
          <span>Жиры, г</span>
          <span className={styles.value}>{ingredient.fat}</span>
        </li>
        <li>
          <span>Углеводы, г</span>
          <span className={styles.value}>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails
