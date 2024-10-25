import { FC } from 'react'

import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'
import { SortIngredients } from '@/utils/interfaces'

type MainPageProps = {
  data: SortIngredients
}

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
