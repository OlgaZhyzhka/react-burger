import { memo, useState } from 'react'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { ingredients } from '@/utils/constants'
import { Modal } from '@/components/modal'
import { OrderDetails } from './order-details'
import styles from './burger-constructor.module.scss'

const BurgerConstructor = () => {
  const [currentOrder, setCurrentOrder] = useState<Record<string, string> | null>(null)

  const handleOrderClick = () => {
    setCurrentOrder({ id: '034536' })
  }

  return (
    <section className={classNames(styles.root, 'pt-25 pr-4')}>
      <div className={classNames(styles.anchor, 'mb-4')}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${ingredients[0].name} (верх)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
        />
      </div>

      <div className={classNames(styles.inner, 'custom-scroll')}>
        <div className={styles.element}>
          <ConstructorElement
            text={ingredients[3].name}
            price={ingredients[3].price}
            thumbnail={ingredients[3].image}
          />
        </div>
        <div className={styles.element}>
          <ConstructorElement
            text={ingredients[2].name}
            price={ingredients[2].price}
            thumbnail={ingredients[2].image}
          />
        </div>
        <div className={styles.element}>
          <ConstructorElement
            text={ingredients[7].name}
            price={ingredients[7].price}
            thumbnail={ingredients[7].image}
          />
        </div>
        <div className={styles.element}>
          <ConstructorElement
            text={ingredients[8].name}
            price={ingredients[8].price}
            thumbnail={ingredients[8].image}
          />
        </div>
        <div className={styles.element}>
          <ConstructorElement
            text={ingredients[10].name}
            price={ingredients[10].price}
            thumbnail={ingredients[10].image}
          />
        </div>
        <div className={styles.element}>
          <ConstructorElement
            text={ingredients[12].name}
            price={ingredients[12].price}
            thumbnail={ingredients[12].image}
          />
        </div>
      </div>
      <div className={classNames(styles.anchor, 'mt-4')}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${ingredients[0].name} (низ)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
          extraClass="mt-4 flex-0 max-w-initial"
        />
      </div>
      <div className={styles.footer}>
        <span className={classNames(styles.price, 'mt-1 mb-1')}>
          <span className="text text_type_digits-default mr-2"> 610 </span>
          <CurrencyIcon type="primary" />
        </span>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>
      {currentOrder && (
        <Modal onClose={() => setCurrentOrder(null)}>
          <OrderDetails id={currentOrder.id} />
        </Modal>
      )}
    </section>
  )
}

export default memo(BurgerConstructor)
