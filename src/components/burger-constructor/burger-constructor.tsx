import { memo } from 'react'
import { useDrop } from 'react-dnd'
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { Ingredient } from '@/utils/interfaces'
import { DragType } from '@/utils/constants'
import { deleteOrder, getOrderState } from '@/services/order/reducer'
import { createOrder } from '@/services/order/actions'
import {
  addBurgerIngredient,
  clearBurger,
  getBurgerConstructor,
  getOrderIngredients,
  totalPrice,
} from '@/services/burger-constructor/reducer'
import { deleteBurgerIngredient } from '@/services/burger-constructor/reducer'
import { Modal } from '@/components/modal'
import { BurgerConstructorItem } from '@/components/burger-constructor/burger-constructor-item'
import { OrderDetails } from './order-details'
import styles from './burger-constructor.module.scss'
import BurgerTotal from './burger-total/burger-total.tsx'

const BurgerConstructor = () => {
  const dispatch = useAppDispatch()
  const { loading, data: currentOrder } = useAppSelector(getOrderState)
  const price = useAppSelector(totalPrice)
  const orderIngredients = useAppSelector(getOrderIngredients)
  const { bun, ingredients } = useAppSelector(getBurgerConstructor)
  const isOrderButtonDisabled = !bun || ingredients.length === 0
  const [{ isOver }, dropRef] = useDrop({
    accept: DragType,
    drop: item => {
      dispatch(addBurgerIngredient(item as Ingredient))
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  })

  const handleClick = () => {
    dispatch(createOrder(orderIngredients))
    dispatch(clearBurger())
  }
  const handleClose = () => {
    dispatch(deleteOrder())
  }
  const onDelete = (key: string | undefined) => {
    if (key != null) {
      dispatch(deleteBurgerIngredient(key))
    }
  }

  return (
    <section className={classNames(styles.root, 'pt-25 pr-4', isOver && styles.over)}>
      <div className={classNames(styles.anchor, 'mb-4')}>
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        ) : (
          <div className="constructor-element constructor-element_pos_top text-center">
            <span>Выберите булку</span>
          </div>
        )}
      </div>
      <div className={classNames(styles.inner, 'custom-scroll')} ref={dropRef}>
        {ingredients.length > 0 ? (
          ingredients.map(ingredient => (
            <BurgerConstructorItem
              key={ingredient.key}
              ingredient={ingredient}
              index={ingredients.indexOf(ingredient)}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="constructor-element text-center">
            <span>Выберите начинку</span>
          </div>
        )}
      </div>
      <div className={classNames(styles.anchor, 'mt-4')}>
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
            extraClass="mt-4 flex-0 max-w-initial"
          />
        ) : (
          <div className="constructor-element constructor-element_pos_bottom text-center">
            <span>Выберите булку</span>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <BurgerTotal className={styles.price} currentPrice={price} />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={isOrderButtonDisabled}
          onClick={handleClick}>
          Оформить заказ
        </Button>
      </div>
      {currentOrder && !loading && (
        <Modal onClose={handleClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}

BurgerConstructor.displayName = 'BurgerConstructor'

export default memo(BurgerConstructor)
