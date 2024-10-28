import { FC } from 'react'

import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'
import { MainPageProps } from './types/main-page'

const MainPage: FC<MainPageProps> = ({ data }) => {
  return (
    <section className="page container">
      <div className="row">
        <div className="col">
          <BurgerIngredients ingredients={data} />
        </div>
        <div className="col">
          <BurgerConstructor />
        </div>
      </div>
    </section>
  )
}

export default MainPage
