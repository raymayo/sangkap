/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { PiBowlFoodFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useAppState } from './AppStateContext';

const API_INGREDIENTS_URL =
	'https://raw.githubusercontent.com/raymayo/filipino-recipe-scrapping/main/prototype/prototype_ingredients.json';
const API_RECIPES_URL =
	'https://raw.githubusercontent.com/raymayo/filipino-recipe-scrapping/main/prototype/prototype_recipes1.json';

const SearchSuggestion = () => {
	const { searchSuggestionState, setSearchSuggestionState } = useAppState();
	const {
		userInput,
		ingredientSuggestions,
		filteredIngr,
		ingredientArray,
		displayRecipe,
	} = searchSuggestionState;

	let recipe;

	const navigate = useNavigate();

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const res = await fetch(API_INGREDIENTS_URL);
				if (!res.ok) {
					throw new Error('Network response was not ok');
				}
				const suggestions = await res.json();
				setSearchSuggestionState((prev) => ({
					...prev,
					ingredientSuggestions: suggestions,
				}));
			} catch (error) {
				console.error('Error fetching suggestions:', error);
			}
		};

		fetchIngredients();
	}, [setSearchSuggestionState]);

	const onIngrType = (e) => {
		const input = e.target.value;
		setSearchSuggestionState((prev) => ({ ...prev, userInput: input }));

		const filterSuggestions =
			input.toLowerCase() !== ''
				? ingredientSuggestions
						.filter((suggestion) =>
							suggestion.toLowerCase().includes(input.toLowerCase())
						)
						.sort(
							(a, b) =>
								a.toLowerCase().indexOf(input.toLowerCase()) -
								b.toLowerCase().indexOf(input.toLowerCase())
						)
				: [];

		setSearchSuggestionState((prev) => ({
			...prev,
			filteredIngr: filterSuggestions,
		}));
	};

	const getSelectedIngr = (e) => {
		const selectedIngredient = e.target.textContent;
		if (!ingredientArray.includes(selectedIngredient)) {
			setSearchSuggestionState((prev) => ({
				...prev,
				ingredientArray: [...prev.ingredientArray, selectedIngredient],
				userInput: '',
			}));
		}
	};

	const searchRecipe = async () => {
		const ingredientQuery = ingredientArray; // Assuming ingredientArray is defined somewhere

		try {
			const response = await fetch(API_RECIPES_URL);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const result = await response.json();
			recipe = result;
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		const foundRecipes = recipe.filter((e) =>
			ingredientQuery.every((query) =>
				e.ingredients.some((ingredient) => ingredient.includes(query))
			)
		);

		if (foundRecipes.length > 0) {
			setSearchSuggestionState((prev) => ({
				...prev,
				displayRecipe: foundRecipes,
			}));
			console.log(ingredientQuery);
		} else {
			console.log('No recipes found with the specified ingredients.');
			console.log(ingredientQuery);
		}
	};

	useEffect(() => {
		console.log(displayRecipe);
	}, [displayRecipe]);

	const deleteItemOnArray = (e) => {
		let removedItem = e.target.parentElement.textContent.slice(0, -1);
		const modifiedArray = ingredientArray.filter(
			(item) => item !== removedItem
		);
		setSearchSuggestionState((prev) => ({
			...prev,
			ingredientArray: modifiedArray,
		}));
	};

	const displayProto = displayRecipe.map((recipeObj, index) => (
		<div
			key={index}
			className="w-full h-full border border-solid border-gray-300 rounded-xl shadow-sm bg-white cursor-pointer"
			onClick={() => handleDivClick(recipeObj.title)}>
			<img
				src={recipeObj.image}
				alt=""
				className="w-full h-64 object-cover rounded-t-md"
			/>
			<div className="p-4 flex gap-1 flex-col">
				<h1 className="text-2xl font-bold">{recipeObj.title}</h1>
				<p className="mealTag text-base border self-start px-1.5 py-.5 rounded-xl">
					{recipeObj.meal}
				</p>
				<p>{recipeObj.summary}</p>
			</div>
		</div>
	));

	const handleDivClick = (recipeId) => {
		// Encode the recipe ID parameter
		const encodedRecipeId = encodeURIComponent(recipeId);

		// Navigate to the new page using the encoded recipeId
		navigate(`/recipe-app/recipe/${encodedRecipeId}`);
	};
	return (
		<>
			<div className="bg-gray-200">
				<nav className="w-full grid p-6 justify-center">
					<h1 className="flex text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-base text-green-600">
						<PiBowlFoodFill />
						plate<span className="">mate</span>
					</h1>
				</nav>
				<div className="container mb-8 rounded flex flex-col items-center bg-gray-200">
					<div id="recipeSearchBox" className="rounded p-8">
						<div className="searchInput rounded">
							<input
								id="recipeSearchInput"
								className="p-2 shadow-sm rounded-l border-b poppin"
								type="text"
								value={userInput}
								onChange={onIngrType}
								placeholder="Add Ingredients"
							/>
							<button
								onClick={searchRecipe}
								className="bg-green-500 text-green-900 text-black border-l-0 p-2 rounded-r shadow font-medium poppin">
								Search
							</button>
						</div>
						<div className="selectedItems rounded shadow bg-white poppin">
							{ingredientArray.map((item, index) => (
								<span className="itemEntered" key={index}>
									{item}
									<button onClick={deleteItemOnArray}>x</button>
								</span>
							))}
						</div>
						{userInput && (
							<div className="suggestionBox rounded shadow bg-white poppin">
								{filteredIngr.map((suggestion, index) => (
									<span
										key={index}
										onClick={getSelectedIngr}
										className="suggestion">
										{suggestion}
									</span>
								))}
							</div>
						)}
					</div>
					<div
						id="recipeBox"
						className="grid grid-cols-1 px-4 pt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-8 md:gap-8 lg:gap-6 xl:gap-6 items-start justify-center">
						{displayProto}
					</div>
					{displayProto.length === 0 && (
						<div
							className="flex flex-col w-5/6 items-center gap-6 lg:w-4/6"
							id="descBox">
							<div className="desc p-4 rounded-md bg-white shadow">
								<h1 className="text-2xl font-semibold text-green-500">
									What is PlateMate?
								</h1>
								<p className="poppin">
									PlateMate is a free web application dedicated to bringing the
									rich and flavorful world of Filipino cuisine to your home
									kitchen. Designed to provide personalized recipe
									recommendations based on the ingredients you currently have,
									PlateMate simplifies meal planning and cooking. Discover
									creative and delicious Filipino recipes that match the
									ingredients in your kitchen, making every meal a delightful
									journey into the heart of Filipino culinary traditions.
								</p>
							</div>
							<div className="desc p-4 rounded-md bg-white shadow">
								<h1 className="text-2xl font-semibold text-green-500">
									How to use PlateMate?
								</h1>
								<p className="poppin">
									Discover delightful Filipino recipes effortlessly by typing
									your available ingredients into PlateMate&apos;s search bar,
									and let the app generate personalized recommendations tailored
									to your kitchen inventory.
								</p>
							</div>
							<div className="desc p-4 rounded-md bg-white shadow">
								<h1 className="text-2xl font-semibold text-green-500">
									Features
								</h1>
								<p className="poppin">
									PlateMate offers a seamless cooking experience through
									features such as user accounts, ingredient inventory
									management, search and filter options, detailed recipe
									information, save and share functionalities, shopping list
									integration, and a responsive design for user-friendly
									accessibility across devices.
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default SearchSuggestion;
