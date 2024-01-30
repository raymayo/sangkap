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
			<h1 className="pt-8 text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-bold">
				plate<span className="text-green-500 italic">mate</span>
			</h1>
			<div className="recipeContainer grid gap-4 mt-8 rounded-md grid-cols-1 w-3/6 lg:w-4/6 md:grid-cols-1 lg:grid-cols-2 bg-white shadow-md">
				{/* md:bg-red-500 xl:bg-green-500 lg:bg-blue-500 */}
				<div className="bg-white shadow-md">
					<img
						src={recipeData.image}
						alt={recipeData.title}
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="space-y-2 p-4 flex flex-col">
					<h1 className="text-6xl font-medium uppercase lg:text-5xl xl:text-7xl">
						{recipeData.title}
					</h1>
					<p className="text-base font-normal poppin lg:text-base xl:text-xl">
						{recipeData.summary}
					</p>
					<h1 className="font-medium text-3xl uppercase lg:text-3xl xl:text-4xl">
						Ingredients
					</h1>
					<ul className="text-base lg:text-base xl:text-xl">
						{recipeData.ingredientList.map((item, index) => (
							<li key={index} className="poppin">
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="my-8 bg-white shadow-md p-4 rounded-md w-4/6 space-y-2">
				<h1 className="font-medium text-3xl uppercase">Instruction</h1>
				<ul className="text-lg">
					{recipeData.instruction.map((item, index) => (
						<li key={index} className="poppin">
							{index}. {item}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default RecipeView;
