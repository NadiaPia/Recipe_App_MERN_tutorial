import React, { useState } from 'react';

function CreateRecipe() {

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOWwner: 0,
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setRecipe({ ...recipe, [name]: value})    //[name] might be any key from recipe object, 
                      //which was changed: name, ingredients, instructions, imageUrl, cookingTime or userOWwner
  }

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients: ingredients});
  }

  const addIngredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
  }

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange}/>

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input key={idx} type="text" name="ingredients" value={ingredient} onChange={(event) => handleIngredientChange(event, idx)}/>
        ))}
        <button onClick={addIngredient} type="button">Add Ingredient</button>

        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>

        <label htmlFor="imageUrl">ImageUrl</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>

        <label htmlFor="cookingTime">Cooking Time</label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipe
