import classNames from 'classnames'

import type { FeedIngredientIconProps } from './types/feed-ingredient-icon-props'
import styles from './feed-ingredient-icon.module.scss'

const FeedIngredientIcon = ({
  image,
  hideItemCount = 0,
  className = '',
}: FeedIngredientIconProps): React.JSX.Element => {
  return hideItemCount > 0 ? (
    <div className={classNames(styles.root, className)}>
      <img className={classNames(styles.image, styles.end)} src={image} alt="ingredient" />
      <span className={classNames(styles.count, 'text text_type_main-default')}>
        +{hideItemCount}
      </span>
    </div>
  ) : (
    <div className={classNames(styles.root, className)}>
      <img className={classNames(styles.image, className)} src={image} alt="ingredient" />
    </div>
  )
}

export default FeedIngredientIcon
