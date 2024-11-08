import { FC, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { XYCoord } from 'dnd-core'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { DragConstructorItemType } from '@/utils/constants'
import { useAppDispatch } from '@/hooks/store-hooks'
import { sortBurgerIngredients } from '@/services/burger-constructor/reducer'
import { BurgerConstructorItemProps } from './types/burger-constructor-item-props'
import styles from './burger-constructor-item.module.scss'

const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({ ingredient, index, onDelete }) => {
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLDivElement>(null)
  const [, dropRef] = useDrop({
    accept: DragConstructorItemType,
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) {
        return
      }

      const fromIndex = item.index
      const toIndex = index

      if (fromIndex === toIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (fromIndex < toIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (fromIndex > toIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(sortBurgerIngredients({ fromIndex, toIndex }))
      item.index = toIndex
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  })
  const [{ isDragging }, dragRef] = useDrag({
    type: DragConstructorItemType,
    item: { ...ingredient, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  dropRef(dragRef(ref))

  return (
    <div className={styles.element} ref={ref} style={{ opacity }}>
      <span className={styles.icon}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => onDelete(ingredient.key)}
      />
    </div>
  )
}

export default BurgerConstructorItem
