import { memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router'
import { useDrop } from 'react-dnd'
import { unwrapResult } from '@reduxjs/toolkit'
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import type { Ingredient } from '@/utils/interfaces'
import { DragType, ROUTES } from '@/utils/constants'
import type { TDragObject, TDropCollectedProps } from '@/utils/types'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { deleteBurgerOrder } from '@/services/burger-order/reducer'
import { createBurgerOrder } from '@/services/burger-order/actions'
import { addBurgerIngredient, clearBurger } from '@/services/burger-constructor/reducer'
import { deleteBurgerIngredient } from '@/services/burger-constructor/reducer'
import { getBurgerOrderState } from '@/services/burger-order/selectors'
import { getBurgerConstructor, getOrderIngredients } from '@/services/burger-constructor/selectors'
import { getUser } from '@/services/user/reducer'
import { Modal } from '@/components/modal'
import { BurgerConstructorItem } from '@/components/burger-constructor/burger-constructor-item'
import { OrderDetails } from './order-details'
import BurgerTotal from './burger-total/burger-total.tsx'
import styles from './burger-constructor.module.scss'

const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate: NavigateFunction = useNavigate()
  const { loading, data: currentOrder } = useAppSelector(getBurgerOrderState)
  const orderIngredients = useAppSelector(getOrderIngredients)
  const { bun, ingredients } = useAppSelector(getBurgerConstructor)
  const user = useAppSelector(getUser)
  const isOrderButtonDisabled = !bun || ingredients.length === 0
  const [{ isOver }, dropRef] = useDrop<TDragObject, unknown, TDropCollectedProps>({
    accept: DragType,
    drop: item => {
      dispatch(addBurgerIngredient(item as Ingredient))
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  })
  const price = useMemo<number>((): number => {
    const ingredientsPrice = ingredients.reduce(
      (acc: number, ingredient: Ingredient) => acc + ingredient.price,
      0,
    )
    const bunPrice = bun ? bun.price * 2 : 0
    return ingredientsPrice + bunPrice
  }, [bun, ingredients])

  const handleClick = async (): Promise<void> => {
    if (!user) {
      navigate(ROUTES.login)
      return
    }

    try {
      const resultAction = await dispatch(createBurgerOrder(orderIngredients))
      unwrapResult(resultAction)
      dispatch(clearBurger())
    } catch (error) {
      console.error('Failed to create order:', error)
    }
  }
  const handleClose = (): void => {
    dispatch(deleteBurgerOrder())
  }

  const onDelete = (key: string | undefined): void => {
    if (key != null) {
      dispatch(deleteBurgerIngredient(key))
    }
  }

  return (
    <section
      className={classNames(styles.root, isOver && styles.over, 'pt-25 pr-4')}
      ref={dropRef}
      data-testid="constructor">
      <div className={classNames(styles.anchor, 'mb-4')} data-testid="bun-constructor">
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        ) : (
          <div
            className={classNames(
              styles.empty,
              'constructor-element constructor-element_pos_top text-center',
            )}>
            <span>Выберите булку</span>
          </div>
        )}
      </div>
      <div className={classNames(styles.inner, 'custom-scroll')}>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient: Ingredient) => (
            <BurgerConstructorItem
              key={ingredient.key}
              ingredient={ingredient}
              index={ingredients.indexOf(ingredient)}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className={classNames(styles.empty, 'constructor-element text-center')}>
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
            extraClass={classNames(isOver && styles.over, 'mt-4 flex-0 max-w-initial')}
          />
        ) : (
          <div
            className={classNames(
              styles.empty,
              isOver && styles.over,
              'constructor-element constructor-element_pos_bottom text-center',
            )}>
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
      {(currentOrder || loading) && (
        <Modal onClose={handleClose}>
          <OrderDetails loading />
        </Modal>
      )}
    </section>
  )
}

BurgerConstructor.displayName = 'BurgerConstructor'

export default memo(BurgerConstructor)
