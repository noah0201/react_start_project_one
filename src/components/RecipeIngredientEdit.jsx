import React from 'react'

export default function RecipeIngredientEdit(props) {
  const { ingredient, handleIngredientDelete, handleIngredientChange } = props;
  function handleChange(changes) {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
  }


  return (
    // 这里不能有div会挡住我们排序问题
    <>
      <input
        type="text"
        className="recipe-edit__input "
        value={ingredient.name}
        // readOnly
        onChange={(e) => handleChange({name:e.target.value})}
      />
      <input
        type="text"
        className="recipe-edit__input "
        value={ingredient.amount}
        // readOnly
        onChange={(e) => handleChange({amount:e.target.value})}
      />
      <button 
      className="btn btn--danger"
      onClick={()=>handleIngredientDelete(ingredient.id)}
      >&times;</button>
    </>
  );
}
