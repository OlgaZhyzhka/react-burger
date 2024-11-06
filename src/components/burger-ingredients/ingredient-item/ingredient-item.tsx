import { FC } from 'react'
import classNames from 'classnames'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { Modal } from '@/components/modal'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { getIngredient, setIngredient } from '@/services/ingredient/reducer'
import { addBurgerIngredient } from '@/services/burger-constructor/reducer'
import { IngredientDetails } from '../ingredient-details'
import { IngredientItemProps } from './types/ingredient-item-props'
import styles from './ingredient-item.module.scss'

const IngredientItem: FC<IngredientItemProps> = ({ ingredient, count }) => {
  const dispatch = useAppDispatch()
  const selectedIngredient = useAppSelector(getIngredient)
  const handleClick = () => {
    dispatch(setIngredient(ingredient))
    dispatch(addBurgerIngredient(ingredient))
  }
  const handleClose = () => {
    dispatch(setIngredient(null))
  }

  return (
    <>
      <li className={styles.item} onClick={handleClick}>
        <span className={styles.counter}>
          {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        </span>
        <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
        <span className={classNames(styles.price, 'mt-1 mb-1')}>
          <span className="text text_type_digits-default mr-2"> {ingredient.price} </span>
          <CurrencyIcon type="primary" />
        </span>
        <h3 className="text text_type_main-default m-0">{ingredient.name}</h3>
      </li>

      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleClose}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  )
}
export default IngredientItem
