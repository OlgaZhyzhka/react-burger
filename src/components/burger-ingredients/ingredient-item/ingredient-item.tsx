import { FC, useState } from 'react'
import classNames from 'classnames'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { Ingredient } from '@/utils/interfaces'
import { Modal } from '@/components/modal'
import { IngredientDetails } from '../ingredient-details'
import styles from './ingredient-item.module.scss'

type IngredientItemProps = {
  ingredient: Ingredient
}

const IngredientItem: FC<IngredientItemProps> = ({ ingredient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <li className={styles.item} onClick={handleOpenModal}>
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
      {isModalOpen && (
        <>
          <Modal title="Детали ингредиента" isOpen={isModalOpen} onClose={handleCloseModal}>
            <IngredientDetails ingredient={ingredient} />
          </Modal>
        </>
      )}
    </>
  )
}
export default IngredientItem
