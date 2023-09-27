import React, { useState, useEffect } from 'react';
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";


function SavedRecepes() {
  const [savedRecipes, setSavedRecipes] = useState([]);  

  const userId = useGetUserID();

  useEffect(() => {

    const fetchSavedRecipe = async () => {
      try {
      const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userId}`);
      setSavedRecipes(response.data.savedRecipes);  
      //console.log("response.dataaaa", response.data)  
      } catch (err) {
        console.error(err);
      };
    };

    fetchSavedRecipe();
  }, []); 

  
  return (
    <div>
      <h1>Saved Recipes</h1>

      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            
            <div>
              <h2>
                {recipe.name}
              </h2>              
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

export default SavedRecepes;
