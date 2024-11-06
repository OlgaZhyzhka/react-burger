import { memo } from 'react'
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { Modal } from '@/components/modal'
import { OrderDetails } from './order-details'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { deleteOrder, getOrderState } from '@/services/order/reducer'
import { createOrder } from '@/services/order/actions'
import {
  clearBurger,
  getBurgerConstructor,
  getOrderIngredients,
  totalPrice,
} from '@/services/burger-constructor/reducer'
import { deleteBurgerIngredient } from '@/services/burger-constructor/reducer'
import styles from './burger-constructor.module.scss'
import BurgerTotal from './burger-total/burger-total.tsx'

const BurgerConstructor = () => {
  const dispatch = useAppDispatch()
  const { loading, data: currentOrder } = useAppSelector(getOrderState)
  const price = useAppSelector(totalPrice)
  const orderIngredients = useAppSelector(getOrderIngredients)
  const { bun, ingredients } = useAppSelector(getBurgerConstructor)
  const isOrderButtonDisabled = !bun || ingredients.length === 0
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
    <section className={classNames(styles.root, 'pt-25 pr-4')}>
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
      <div className={classNames(styles.inner, 'custom-scroll')}>
        {ingredients.length > 0 ? (
          ingredients.map(ingredient => (
            <div className={styles.element} key={ingredient.key}>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={() => onDelete(ingredient.key)}
              />
            </div>
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
