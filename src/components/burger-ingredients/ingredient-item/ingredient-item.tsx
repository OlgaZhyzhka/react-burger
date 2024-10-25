import { FC } from 'react'
import classNames from 'classnames'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import useModal from '@/hooks/use-modal'
import { Ingredient } from '@/utils/interfaces'
import { Modal } from '@/components/modal'
import { IngredientDetails } from '../ingredient-details'
import styles from './ingredient-item.module.scss'

type IngredientItemProps = {
  ingredient: Ingredient
}

const IngredientItem: FC<IngredientItemProps> = ({ ingredient }) => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <li className={styles.item} onClick={openModal}>
        <span className={styles.counter}>
          <Counter count={1} size="default" extraClass="m-1" />
        </span>
        <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
        <span className={classNames(styles.price, 'mt-1 mb-1')}>
          <span className="text text_type_digits-default mr-2"> {ingredient.price} </span>
          <CurrencyIcon type="primary" />
        </span>
        <h3 className="text text_type_main-default m-0">{ingredient.name}</h3>
      </li>
      {isOpen && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  )
}
export default IngredientItem
