import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { BurgerConstructor } from '@/components/burger-constructor'
import { BurgerIngredients } from '@/components/burger-ingredients'

const Home = () => {
  return (
    <section className="page container">
      <div className="row">
        <DndProvider backend={HTML5Backend}>
          <div className="col">
            <BurgerIngredients />
          </div>
          <div className="col">
            <BurgerConstructor />
          </div>
        </DndProvider>
      </div>
    </section>
  )
}

export default Home
