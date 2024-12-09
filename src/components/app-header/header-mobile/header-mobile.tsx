import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { ROUTES } from '@/utils/constants'
import { NavMobile } from '../nav-mobile'
import logoIcon from './logo.svg'

const HeaderMobile = (): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Link to={ROUTES.home}>
        <img src={logoIcon} alt="check" />
      </Link>
      <Button
        htmlType="button"
        type="secondary"
        size="small"
        onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <MenuIcon type="primary" />
      </Button>
      {isMenuOpen && <NavMobile onClose={() => setIsMenuOpen(!isMenuOpen)} />}
    </>
  )
}

export default HeaderMobile
