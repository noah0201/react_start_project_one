import React,{useContext} from "react";
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { v4 as uuidV4 } from "uuid";
import { RecipeContext } from "./App";

export default function RecipeEdit({recipe}) {

  const {handleRecipeChange} = useContext(RecipeContext)

  function handleChange(changes){
    handleRecipeChange(recipe.id,{...recipe,...changes})
  }

  function handleIngredientDelete(id){
    handleChange({
      ingredients:recipe.ingredients.filter(el=>el.id!==id)
    })
  }

  function handleIngredientChange(id,ingredients){
    const newIngredients=[...recipe.ingredients]
    const index = newIngredients.findIndex(el=>el.id===id)
    newIngredients[index]=ingredients
    handleChange({
      ingredients:newIngredients
    })
  }

    function handleIngredientAdd() {
      const newIngredient = {
        id: uuidV4(),
        name: "",
        amount:""
      }

      handleChange({ingredients:[...recipe.ingredients,newIngredient]})
    }

  return (
    <div className="recipe-edit">
      {/* 关闭按钮容器 */}
      <div className="recipe-edit__remove-button-container">
        {/* 关闭按钮 */}
        <button className="recipe-edit__remove-button" >&times;</button>
      </div>
      {/* 内容 */}
      <div className="recipe-edit__details-grid">
        {/* name  htmlFor="name" 对应input id*/}
        <label className="recipe-edit__label" htmlFor="name">
          Name
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          name="name"
          id="name"
          value={recipe.name}
          // 先让它是只读后面再修改
          // readOnly
          onChange={(e) => handleChange({ name: e.target.value })}
        />
        {/* Cook Time */}
        <label className="recipe-edit__label" htmlFor="cookTime">
          Cook Time
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          name="cookTime"
          id="cookTime"
          value={recipe.cookTime}
          // readOnly
          onChange={(e) => handleChange({ cookTime: e.target.value })}
        />
        {/* Servings */}
        <label className="recipe-edit__label" htmlFor="servings">
          Servings
        </label>
        <input
          className="recipe-edit__input"
          type="number"
          name="servings"
          id="servings"
          value={recipe.servings}
          mi="1"
          // readOnly
          onChange={(e) => handleChange({ servings: parseInt(e.target.value) })}
        />
        {/* Instructions */}
        <label className="recipe-edit__label" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="recipe-edit__input"
          type="text"
          name="instructions"
          id="instructions"
          value={recipe.instructions}
          // readOnly
          onChange={(e) => handleChange({ instructions: e.target.value })}
        />
      </div>
      <br />
      {/* 原料 */}
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        {/* Ingredient Components */}
        <div></div>
        {/* <RecipeIngredientEdit />
        <RecipeIngredientEdit /> */}
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
            key={ingredient.id}
            ingredient={ingredient}
            handleIngredientDelete={handleIngredientDelete}
            handleIngredientChange={handleIngredientChange}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          className="btn btn--primary"
          onClick={()=>handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
