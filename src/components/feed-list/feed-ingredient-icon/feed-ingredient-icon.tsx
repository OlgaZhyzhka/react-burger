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
      {image && (
        <img className={classNames(styles.image, styles.end)} src={image} alt="ingredient icon" />
      )}
      <span className={classNames(styles.count, 'text text_type_main-default')}>
        +{hideItemCount}
      </span>
    </div>
  ) : (
    <div className={classNames(styles.root, className)}>
      {image && <img className={styles.image} src={image} alt="ingredient icon" />}
    </div>
  )
}

export default FeedIngredientIcon
