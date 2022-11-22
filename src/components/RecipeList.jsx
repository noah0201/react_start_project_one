import React, { useContext } from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App';

export default function RecipeList(props) {
  const { handleRecipeAdd } = useContext(RecipeContext);
  const { recipes, 
    // handleRecipeAdd, 
    // handleRecipeDel 
  } = props;
  return (
    <div>
      <div className="recipe-list">
        {/*
         *  map :循环遍历recipes所接收list里的每一个对象遍历数
         * key区别每一个组件不一样 ,这里我们的key存储recipe里的id来区分（就是标识分开同名不同元素的组件）
         * {...recipe} :传入信息，我们采用这种方式，将recipe里的每点信息，标识名（属性名），就是list展开然后在Recipe组件里接收信息，用props进行拿值来利用
         */}
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.id}
            {...recipe}
            // handleRecipeDel={handleRecipeDel}
          />
        ))}

        {/* 加两个下划线告诉别人这是个什么功能的类型 */}
        <div className="recipe-list__add-recipe-btn-container">
          {/* 告诉别人这是什特性 */}
          <button
            className="btn btn--primary"
            onClick={handleRecipeAdd} //点击触发事件
          >
            Add Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
