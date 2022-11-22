import React, { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import "../css/app.css";
import { v4 as uuidV4 } from "uuid";
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = React.createContext();
const LOCAL_STROACE_KEY = "cookingWithReact.recipes";

export default function App() {
  // 状态钩子recipes接收，初始list里的info变成状态存入，绘制成我们初始页面
  // setRecipes修改状态，每次变化都会进行重绘页面
  // const [recipes, setRecipes] = useState(sampleRecipes);
  // 十八版本做持久化，存储我们setState后的数据我们要通过更改状态初始化来进行修改
  const [recipes, setRecipes] = useState(()=>{
    // 获取数据
    const recipeJSON = localStorage.getItem(LOCAL_STROACE_KEY);
    if(recipeJSON!=null){
      // 返回解析值(将储存的字符型数据变成JSON形式)给初始状态
      return JSON.parse(recipeJSON)
    }else{
      // 如果为空返回我们写的初始值
      return sampleRecipes;
    }
  });

  const [selectedRecipeId,setSelectedRecipeId]=useState()
  // 找recipes中与id与钩子id相同id元素
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId );

    console.log(selectedRecipe);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDel,
    handleRecipeSelect,
    handleRecipeChange,
  };

  // 我们拿数据因为只执行一次，所以我们放在下面存储数据的上面，因为我们进行更新时会更新存储的我们所有拿到的数据
  // 18版本里的严格模式这么做是不行的，这种做法仅限于16，17版本
  // useEffect(() => {
  //   // console.log("我是副作用，我没有进行绑定，我出现一次哦！！！");
  //   // 通过密钥拿数据，并转换成JSON形态
  //   const recipeJSON = localStorage.getItem(LOCAL_STROACE_KEY);
  //   if (recipeJSON != null) {
  //     setRecipes(JSON.parse(recipeJSON));
  //   }
  // }, []);

  useEffect(() => {
    // console.log('我是副作用，我跟着你重新变化啦！！！');
    // 存储信息
    localStorage.setItem(LOCAL_STROACE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  // useEffect(() => {
  //   // console.log("我是副作用，我没有进行绑定，我出现一次哦！！！");
  //   // 通过密钥拿数据，并转换成JSON形态
  //   const recipeJSON = localStorage.getItem(LOCAL_STROACE_KEY)
  //   return recipeJSON!==null?setRecipes(JSON.parse(recipeJSON)):console.log('数据没有获取到');
  // }, []);

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      {/* recipes自定义名 sampleRecipes传的值，它是个list */}
      <RecipeList
        recipes={recipes}
        // handleRecipeAdd={handleRecipeAdd}
        // handleRecipeDel={handleRecipeDel}
      />
      {/*selectedRecipe存在与组件存在就传入  */}
      {/* 无点击确认id时，右边不显示，如果我们需要显示就可以加个组件先 */}
      {/* <RecipeEdit  /> */}
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );

  // 添加new recipe的按钮功能，我们用函数包裹
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidV4(),
      name: "New",
      servings: 1,
      cookTime: "1:00",
      instructions: "Instr.",
      ingredients: [
        {
          id: uuidV4(),
          name: "Name",
          amount: "1 Tbs",
        },
      ],
    };
    // 更改钩子的初始值，让他重新渲染页面，每生成一个新的recipe就重新渲染页面
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDel(id) {
    // 做筛选id相同的删除了，剩下都是id不相同的，然后进行重新渲染
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }

  function handleRecipeChange(id,recipe){
    const newRecipes= [...recipes]
    const index = newRecipes.findIndex(r=>r.id===id)
    newRecipes[index]=recipe
    setRecipes(newRecipes)
  }
}

// 书写我们的要展示的信息
const sampleRecipes = [
  {
    id: 1,
    name: "plain chicken",
    cookTime: "2:00",
    servings: 3,
    instructions: `1.chicken\n2.chicken\n3.chicken`,
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "plain Pork",
    cookTime: "4:00",
    servings: 2,
    instructions: `1.Pork\n2.Pork\n3.Pork`,
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 3,
    name: "Fish",
    cookTime: "5:00",
    servers: 4,
    instructions: `1.Fish\n2.Fish\n3.Fish`,
    ingredients: [
      {
        id: 1,
        name: "Fish",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
];
