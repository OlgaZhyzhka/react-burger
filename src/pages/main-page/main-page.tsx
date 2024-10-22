import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'

const MainPage = () => (
  <section className="page container">
    <div className="row">
      <div className="col">
        <BurgerIngredients />
      </div>
      <div className="col">
        <BurgerConstructor />
      </div>
    </div>
  </section>
)

export default MainPage