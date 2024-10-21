import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import { burgerData } from '@/utils/constants'
import styles from './burger-constructor.module.scss'

const BurgerConstructor = () => (
  <section className={classNames(styles.root, 'pt-25 pr-4')}>
    <ConstructorElement
      type="top"
      isLocked={true}
      text={`${burgerData[0].name} (верх)`}
      price={burgerData[0].price}
      thumbnail={burgerData[0].image}
      extraClass="mb-4 flex-0 max-w-initial"
    />
    <div className={classNames(styles.inner, 'custom-scroll')}>
      <ConstructorElement
        text={burgerData[3].name}
        price={burgerData[3].price}
        thumbnail={burgerData[3].image}
        extraClass="max-w-initial"
      />
      <ConstructorElement
        text={burgerData[2].name}
        price={burgerData[2].price}
        thumbnail={burgerData[2].image}
        extraClass="max-w-initial"
      />
      <ConstructorElement
        text={burgerData[7].name}
        price={burgerData[7].price}
        thumbnail={burgerData[7].image}
        extraClass="max-w-initial"
      />
      <ConstructorElement
        text={burgerData[8].name}
        price={burgerData[8].price}
        thumbnail={burgerData[8].image}
        extraClass="max-w-initial"
      />
      <ConstructorElement
        text={burgerData[10].name}
        price={burgerData[10].price}
        thumbnail={burgerData[10].image}
        extraClass="max-w-initial"
      />
      <ConstructorElement
        text={burgerData[12].name}
        price={burgerData[12].price}
        thumbnail={burgerData[12].image}
        extraClass="max-w-initial"
      />
    </div>
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={`${burgerData[0].name} (низ)`}
      price={burgerData[0].price}
      thumbnail={burgerData[0].image}
      extraClass="mt-4 flex-0 max-w-initial"
    />
    <div className={styles.footer}>
      <span className={classNames(styles.price, 'mt-1 mb-1')}>
        <span className="text text_type_digits-default mr-2"> 610 </span>
        <CurrencyIcon type="primary" />
      </span>
      <Button htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  </section>
)

export default BurgerConstructor
