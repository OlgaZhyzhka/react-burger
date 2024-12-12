import classNames from 'classnames'

import { orders } from '@/utils/constants'
import { OrderList } from '@/components/order-list'
import { FeedList } from '@/components/feed-list'
import styles from './feed.module.scss'

const Feed = (): React.JSX.Element => {
  return (
    <section className="page page_order container">
      <div className="row">
        <div className="col">
          <div className={styles.feed}>
            <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
            <div className={classNames(styles.feedList, 'custom-scroll')}>
              <FeedList orders={orders} />
            </div>
          </div>
        </div>
        <div className="col">
          <div className={styles.statistics}>
            <h2 className={classNames(styles.readyTitle, 'text text_type_main-medium')}>Готовы:</h2>
            <OrderList
              orders={orders}
              className={classNames(
                styles.readyList,
                'text text_type_digits-default list-no-style',
              )}
            />
            <h2 className={classNames(styles.inWorkTitle, 'text text_type_main-medium')}>
              В работе:
            </h2>
            <OrderList
              orders={orders}
              className={classNames(
                styles.inWorkList,
                'text text_type_digits-default list-no-style',
              )}
            />
            <h2 className={classNames(styles.totalTitle, 'text text_type_main-medium')}>
              Выполнено за все время:
            </h2>
            <span className={classNames(styles.totalValue, 'text text_type_digits-large')}>
              28 752
            </span>
            <h2 className={classNames(styles.totalCurrentTitle, 'text text_type_main-medium')}>
              Выполнено за сегодня:
            </h2>
            <span className={classNames(styles.totalCurrentValue, 'text text_type_digits-large')}>
              138
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feed
