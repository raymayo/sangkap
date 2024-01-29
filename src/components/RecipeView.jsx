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
		// <div>
		// 	<h2>{recipeData.title}</h2>
		// 	<p>{recipeData.summary}</p>
		// 	{/* Add more details as needed */}
		// </div>
		<>
			<h1 className="pt-10 text-5xl sm:text-6xl md:text-7xl lg:text-7xl">
				Plate<span className="font-bold text-yellow-500">Mate</span>
			</h1>
			<div className="recipeContainer flex flex-col items-center mt-8 gap-y-8 lg:mx-32 lg:my-8 lg:pt-8">
				<div className="flex flex-col items-center gap-y-4">
					<h1 className="text-4xl font-bold text-center">{recipeData.title}</h1>
					<p className="text-center text-xl w-2/3">{recipeData.summary}</p>
				</div>
				<div className="grid gap-2 w-full bg-white rounded-md shadow-md sm:grid-cols-1 lg:grid-cols-3 p-4 lg:p-0">
					<div>
						<img
							src={recipeData.image}
							alt={recipeData.title}
							className="rounded-l-md"
						/>
					</div>
					<div>
						<div className="p-4">
							<h1 className="font-bold text-3xl">Ingredients</h1>
							<ul className="text-lg py-4">
								{recipeData.ingredientList.map((item, index) => (
									<li key={index}>•{item}</li>
								))}
							</ul>
						</div>
					</div>
					<div className="p-4">
						<h1 className="font-bold text-3xl">Instruction</h1>
						<ul className="text-lg py-4">
							{recipeData.instruction.map((item, index) => (
								<li key={index}>
									{index}. {item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default RecipeView;
