import React, { useContext } from "react";
import IngredientList from "./ingredientList";
import { RecipeContext } from "./App";


export default function Recipe(props) {
  const { handleRecipeDel, handleRecipeSelect } = useContext(RecipeContext);
  // 解构赋值
  const {
    id, //放置 id
    name,
    cookTime,
    servings,
    instructions,
    ingredients,
    // handleRecipeDel, //放置del handle
  } = props;
  return (
    <div className="recipe">
      {/* 头部命名 */}
      <div className="recipe__header">
        <h2 className="recipe__title">{name}</h2>
        <div>
          <button
            className="btn btn--primary mr-1"
            onClick={()=>handleRecipeSelect(id)}
          >
            Edit
          </button>
          <button
            className="btn btn--danger mr-1"
            onClick={() => handleRecipeDel(id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Cook Time:</span>
        <span>{cookTime}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Servings:</span>
        <span>{servings}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">InStructions:</span>
        <div className="recipe__value recipe__instructions recipe__value--indented">
          {instructions}
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Ingredients:</span>
        <div className="recipe__value recipe__value--indented">
          <IngredientList ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}
