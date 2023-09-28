import React, { useState, useEffect } from 'react';
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import { useCookies } from 'react-cookie';


function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, setCookies] = useCookies(["accessS_token"]);

  const userId = useGetUserID()

  useEffect(() => {

    const fetchRecipe = async () => {
      try {
      const response = await axios.get("http://localhost:3001/recipes/")
      setRecipes(response.data);    
      } catch (err) {
        console.error(err)
      }
    }
    fetchRecipe();

    if (cookies.accessS_token) {
      fetchSavedRecipe();
    }

  }, [])

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes/", {
        recipeId, 
        userId,
      }, {headers: {authorization: cookies.accessS_token}});      
      setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      };

  };

  const fetchSavedRecipe = async () => {
    try {
    const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userId}`);
    setSavedRecipes(response.data.savedRecipes);    
    } catch (err) {
      console.error(err);
    };
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1>Recipes</h1>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            
            <div>
              <h2>
                {recipe.name}
              </h2>
              <button 
                onClick={() => saveRecipe(recipe._id)} 
                disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button> {/*Any () is starting the function, 
              even though there is an argument inside it and despite the onClick event. It will call the function 
              right away after the render the page. To avoid it, we use callback function as call back doesn't mean 
              to call a function immediately, only after onClick in our case */}
            </div>

            <div className="instructions">
              <p>
                {recipe.instructions}
              </p>
            </div>

            <img src={recipe.imageUrl} alt={recipe.name}/>

            <p>
              Cooking Time: {recipe.cookingTime} (minutes)
            </p>

          </li>)
        )}
      </ul>
      
    </div>
  )
}

export default Home;
