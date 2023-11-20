/* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';

// const RecipeSearch = () => {
//   const [recipeData, setRecipeData] = useState(null);
//   const API_KEY = '292b954aa63c4b58a57241cffcb0b795';
//   let searchQuery = 'beef';

//   useEffect(() => {
//     // Fetching the first data
//     fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}`)
//       .then(response => response.json())
//       .then(data => {

//         const recipe_ids = data.results.map(recipes => recipes.id);
//         const recipe_string = recipe_ids.join(',');

//         // Using the extracted value to construct the URL for the second request
//         const getRecipeData = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipe_string}&apiKey=${API_KEY}&includeNutrition=true`;

//         fetch(getRecipeData)
//           .then(response => response.json())
//           .then(recipeData => {
//             // Setting the second data
//             setRecipeData(recipeData);
//             console.log(recipeData)
//           })
//           .catch(error => console.error('Error fetching second data:', error));
//       })
//       .catch(error => console.error('Error fetching first data:', error));
//   }, []); // Empty dependency array to ensure the effect runs only once on component mount

//   return (
//     <>
//     {/* {recipeData.map((recipe,index) => (
//                  <div className="recipeCard" key={index}>
//                       <h1>{recipeData.title}</h1>
//                  </div>
//           ))} */}

//     </>
//   );
// };

// export default RecipeSearch;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";


const RecipeSearch = (recipe) => {
  const [recipeData, setRecipeData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const API_KEY = "292b954aa63c4b58a57241cffcb0b795";
  let searchQuery = "beef";



  useEffect(() => {
    // Fetching the first data
    // fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}`)
    fetch(`http://localhost:3001/recipes`)
      .then((response) => response.json())
      .then((num) => {
        // const recipe_ids = data.results.map(recipes => recipes.id);
        // const recipe_string = recipe_ids.join(',');

        // Using the extracted value to construct the URL for the second request
        // const getRecipeData = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipe_string}&apiKey=${API_KEY}&includeNutrition=true`;
        const getRecipeData = `http://localhost:3001/recipes`;

        fetch(getRecipeData)
          .then((response) => response.json())
          .then((data) => {
            // Setting the second data
            setRecipeData(data);
            console.log(data[0].nutrition.nutrients[0].amount);
          })
          .catch((error) =>
            console.error("Error fetching second data:", error)
          );
      })
      .catch((error) => console.error("Error fetching first data:", error));
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  return (
    <div>
      {/* {recipeData.map((recipe, index) => (
        <div className="recipeCard" key={index}>
          <img className="recipeImage" src={recipe.image} alt={recipe.title} />
          <div className="recipeInfoBox">
            <h1>{recipe.title}</h1>
            <div className="tags">
              <p className="recipeInfo">
                {recipe.nutrition.nutrients[0].amount}{" "}
                <span>{recipe.nutrition.nutrients[0].unit}</span>
              </p>
            </div>
          </div>
        </div>
      ))} */}
    <p>{recipe.searchQuery}</p>
    </div>
  );
};

export default RecipeSearch;
