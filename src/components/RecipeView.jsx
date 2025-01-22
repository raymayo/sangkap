/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PiBowlFoodFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';

const RecipeView = () => {
	const { recipeId } = useParams(); // Access the recipe ID parameter from the URL
	const [recipeData, setRecipeData] = useState(null);
	const [count, setCount] = useState(0);
	const navigate = useNavigate();
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

	const goNextInstruction = () => {
		const lastIndex = recipeData.instruction.length - 1;
		console.log(lastIndex);

		if (count === lastIndex) {
			return;
		}
		setCount(count + 1);
	};

	const goPrevInstruction = () => {
		if (count === 0) {
			return;
		}
		setCount(count - 1);
	};

	const goHome = () => {
		navigate(`/sangkap`);
	};

	const style = {
		width: '100%',
		height: '100%',
		backgroundImage: `url(${recipeData.image})`,
		backgroundSize: 'cover', // Make sure the background covers the whole area
		backgroundPosition: 'center', // Center the background image
	};

	return (
		<div className="recipeViewContainer grid place-items-center h-screen p-8">
			<nav className="w-full grid justify-center">
				<h1 className="flex text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-semibold">
					<PiBowlFoodFill />
					Sangkap
				</h1>
			</nav>

			<div className="recipeContainer grid border border-zinc-200 rounded-lg shadow-sm gap-0 mt-8 grid-cols-1 w-full xl:w-4/6 md:grid-cols-1 lg:grid-cols-2">
				{/* md:bg-red-500 xl:bg-green-500 lg:bg-blue-500 */}
				<div className="imageContainer rounded-l-lg" style={style}>
					<FaArrowLeft onClick={goHome} className="goHome p-2 cursor-pointer" size={40} />
				</div>
				<div className="recipeInfo space-y-2 p-4 flex flex-col lg:space-y-4 xl:space-y-4">
					<h1 className="text-gray-900 text-4xl font-semibold md:text-7xl lg:text-5xl xl:text-5xl sm:w-5/6 lg:w-5/6 xl:w-5/6">
						{recipeData.title}
					</h1>
					<p className="text-gray-900 text-sm leading-normal font-normal poppin lg:text-base xl:text-lg">
						{recipeData.summary}
					</p>
					<h1 className="text-gray-900 font-semibold text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl">
						Ingredients
					</h1>
					<ul className="text-gray-900  text-sm leading-normal lg:text-base xl:text-lg">
						{recipeData.ingredientList.map((item, index) => (
							<li key={index} className="poppin">
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
			{/* <div className="my-8 bg-white shadow-md p-4 rounded-md space-y-2 w-3/6 lg:w-4/6 xl:w-7/12 md:w-5/6 w-5/6">
				<h1 className="font-semibold text-4xl uppercase">Instruction</h1>
				<ul className="text-lg space-y-2">
					{recipeData.instruction.map((item, index) => (
						<div key={index}>
							<span className="text-gray-900 font-semibold">
								Step {index + 1}:
							</span>
							<li className="poppin">{item}</li>
						</div>
					))}
				</ul>
			</div> */}
			<div className="instructionBox p-6 space-y-2 w-full my-8 border border-zinc-200 rounded-md shadow-sm xl:w-4/6">
				<h1 className="instructionTitle font-semibold text-4xl pb-2">
					Instruction
				</h1>
				<span className="text-gray-900 font-semibold">Step {count + 1}:</span>
				<h1 className="text-normal leading-normal">
					{recipeData.instruction[count]}
				</h1>
				<div className="flex justify-end gap-2">
					<button
						onClick={goPrevInstruction}
						className={`stepsButton px-1.5 py-1 rounded-md shadow-sm border border-zinc-200 ${count === 0 ? 'bg-black bg-opacity-10 text-black text-opacity-40' : ''}`}>
						Previous
					</button>
					<button
						onClick={goNextInstruction}
						className={`stepsButton px-1.5 py-1 rounded-md shadow-sm border border-zinc-200 ${
							count === recipeData.instruction.length - 1
								? 'bg-black bg-opacity-10 text-black text-opacity-40'
								: ''
						}`}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default RecipeView;
