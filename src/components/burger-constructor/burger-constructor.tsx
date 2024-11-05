import { memo } from 'react'
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import useModal from '@/hooks/use-modal'
import { Modal } from '@/components/modal'
import { OrderDetails } from './order-details'
import styles from './burger-constructor.module.scss'
import BurgerTotal from './burger-total/burger-total.tsx'

// при закрытии модалки оформить заказ - очищать конструктор
// при создании заказа нужно формировать массив идентификаторов булок и ингредиентов в видк
// [bun_id, ing_id, bun_id]

// при добавлении ингредиента нужно учесть что они могут быть одинаковыи, поэтому им нужно добавить уникальный ключ в акшин креэйторе

const BurgerConstructor = () => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <section className={classNames(styles.root, 'pt-25 pr-4')}>
      <div className={classNames(styles.anchor, 'mb-4')}>
        <ConstructorElement type="top" isLocked text="" price={0} thumbnail="" />
      </div>
      <div className={classNames(styles.inner, 'custom-scroll')}>
        <div className={styles.element}>
          <ConstructorElement text="" price={0} thumbnail="" />
        </div>
      </div>
      <div className={classNames(styles.anchor, 'mt-4')}>
        <ConstructorElement
          type="bottom"
          isLocked
          text=""
          price={0}
          thumbnail=""
          extraClass="mt-4 flex-0 max-w-initial"
        />
      </div>
      <div className={styles.footer}>
        <BurgerTotal className={styles.price} currentPrice={0} />
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails id="0" />
        </Modal>
      )}
    </section>
  )
}

BurgerConstructor.displayName = 'BurgerConstructor'

export default memo(BurgerConstructor)
