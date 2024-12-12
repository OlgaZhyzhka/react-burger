import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import BurgerTotal from '@/components/burger-constructor/burger-total/burger-total'
import type { FeedCardProps } from './types/feed-card-props'
import { FeedIngredients } from '../feed-ingredients'
import styles from './feed-card.module.scss'

const FeedCard = ({ order }: FeedCardProps): React.JSX.Element => {
  const { name, number, createdAt, ingredients } = order
  const date = new Date(createdAt)

  return (
    <article className={styles.root}>
      <span className={classNames(styles.number, 'text text_type_digits-default')}>#{number}</span>
      <FormattedDate
        date={
          new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            0,
          )
        }
        className={classNames(styles.date, 'text text_type_main-default text_color_inactive')}
      />
      <h2 className={classNames(styles.title, 'text text_type_main-medium')}>{name}</h2>
      <FeedIngredients
        maxVisibleItemCount={6}
        className={styles.ingredients}
        ingredients={ingredients}
      />
      <BurgerTotal className={styles.price} currentPrice={480} />
    </article>
  )
}

export default FeedCard
