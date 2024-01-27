/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeView = () => {
	const { recipeId } = useParams(); // Access the recipe ID parameter from the URL
	const [recipeData, setRecipeData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://raw.githubusercontent.com/raymayo/filipino-recipe-scrapping/main/prototype/prototype_recipes1.json'
				);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const recipes = await response.json();

				// Find the recipe with the specified title (using recipeId as the title)
				const foundRecipe = recipes.find((recipe) => recipe.title === recipeId);

				setRecipeData(foundRecipe);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [recipeId]);

	if (!recipeData) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h2>{recipeData.title}</h2>
			<p>{recipeData.summary}</p>
			{/* Add more details as needed */}
		</div>
	);
};

export default RecipeView;
