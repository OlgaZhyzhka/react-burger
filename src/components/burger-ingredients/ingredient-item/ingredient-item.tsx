import { Link, useLocation } from 'react-router-dom'
import type { Location as RouterLocation } from 'react-router'
import { useDrag } from 'react-dnd'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { DragType } from '@/utils/constants'
import type { TDragCollectedProps, TDragObject } from '@/utils/types'
import type { IngredientItemProps } from './types/ingredient-item-props'
import styles from './ingredient-item.module.scss'

const IngredientItem = ({ ingredient, count }: IngredientItemProps): React.JSX.Element => {
  const location: RouterLocation = useLocation()
  const ingredientId = ingredient['_id']
  const [, dragRef] = useDrag<TDragObject, unknown, TDragCollectedProps>({
    type: DragType,
    item: ingredient,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <>
      <li className={styles.item} ref={dragRef} data-testid={ingredient._id}>
        <Link
          to={`/ingredients/${ingredientId}`}
          state={{ background: location }}
          className={styles.link}>
          <span className={styles.counter}>
            {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
          </span>
          <img
            className={classNames(styles.image, 'ml-4 mr-4')}
            src={ingredient.image}
            alt={ingredient.name}
          />
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
