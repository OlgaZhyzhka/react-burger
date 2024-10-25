import { useState } from 'react'
import { Button, MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { Link } from '@/components/base-components/link'
import { NavMobile } from '../nav-mobile'
import logoIcon from './logo.svg'

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Link href="/">
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
