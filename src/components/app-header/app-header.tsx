import classNames from 'classnames'

import { useMediaQuery } from '@/hooks'
import { HeaderDesktop } from './header-desktop'
import { HeaderMobile } from './header-mobile'
import styles from './app-header.module.scss'

const AppHeader = (): React.JSX.Element => {
  const isDesktop: boolean = useMediaQuery('(min-width: 1200px)')

  return (
    <header className={classNames(styles.root, 'pt-4 pb-4')}>
      <div className={classNames(styles.inner, 'container')}>
        {isDesktop ? <HeaderDesktop /> : <HeaderMobile />}
      </div>
    </header>
  )
}

export default AppHeader
