import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDrag } from 'react-dnd'
import classNames from 'classnames'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { DragType, ROUTES } from '@/utils/constants'
import { IngredientItemProps } from './types/ingredient-item-props'
import styles from './ingredient-item.module.scss'

const IngredientItem: FC<IngredientItemProps> = ({ ingredient, count }) => {
  const location = useLocation()
  const ingredientId = ingredient['_id']
  const [, dragRef] = useDrag({
    type: DragType,
    item: ingredient,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <>
      <li className={styles.item} ref={dragRef}>
        <Link
          key={ingredientId}
          to={ROUTES.ingredient}
          state={{ background: location }}
          className={styles.link}>
          <span className={styles.counter}>
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
          </span>
          <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
          <span className={classNames(styles.price, 'mt-1 mb-1')}>
            <span className="text text_type_digits-default mr-2"> {ingredient.price} </span>
            <CurrencyIcon type="primary" />
          </span>
          <h3 className="text text_type_main-default m-0">{ingredient.name}</h3>
        </Link>
      </li>
    </>
  )
}
export default IngredientItem
