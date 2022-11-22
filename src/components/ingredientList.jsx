import React from 'react'
import Ingredient from './ingredient'

export default function IngredientList({ingredients}) {
  // 提出来写法,使我们看代码时，HTML代码更加简洁
  const ingredientElement =ingredients.map((ingredient) => (
  <Ingredient key={ingredient.id} {...ingredient} />
));
  return (
    <div className='ingredient-grid'>
      {ingredientElement}

    </div>
  )
}
