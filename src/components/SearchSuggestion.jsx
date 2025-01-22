/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { PiBowlFoodFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useAppState } from './AppStateContext';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { PiXBold } from 'react-icons/pi';
import { LuX } from "react-icons/lu";

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
			className="w-full h-full border cursor-pointer display-card rounded-lg"
			onClick={() => handleDivClick(recipeObj.title)}>
			<img
				src={recipeObj.image}
				alt=""
				className="w-full h-64 object-cover rounded-t-lg"
			/>
			<div className="p-4 flex gap-1 flex-col">
				<h1 className="text-2xl font-bold">{recipeObj.title}</h1>
				<p className="mealTag text-base border self-start px-1.5 py-1 rounded-md shadow-sm">
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
		navigate(`recipe/${encodedRecipeId}`);
	};
	return (
		<>
			<div className="box-section h-screen grid place-items-center px-8">
				<div className="container rounded flex flex-col items-center box-sectionh-full">
				<nav className="w-full grid py-4 justify-center">
					<h1 className="flex text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-semibold">
						<PiBowlFoodFill />
						Sangkap
					</h1>
				</nav>
					<div id="recipeSearchBox" className="rounded py-4 pb-8 w-full xl:w-2/4 lg:w-2/3">
						<div className="searchInput flex gap-1.5 w-full">
							<input
								id="recipeSearchInput"
								className="px-2 py-1 poppin border border-zinc-200 rounded-md shadow-sm w-full"
								type="text"
								value={userInput}
								onChange={onIngrType}
								placeholder="Search Ingredients"
							/>
							<button
								onClick={searchRecipe}
								className="search-btn px-3 font-medium poppin rounded-md bg-black text-white shadow-sm">
								<PiMagnifyingGlassBold size={18}/>
							</button>
						</div>
						<div className="selectedItems poppin text-black flex gap-1 mt-1">
							{ingredientArray.map((item, index) => (
								<span className="itemEntered py-1 px-1.5 border border-zinc-200 flex gap-1 w-fit rounded-md shadow-sm" key={index}>
									{item}
									<button onClick={deleteItemOnArray} className='text-black'><LuX size={16}/></button>
								</span>
							))}
						</div>
						{userInput && (
							<div className="suggestionBox poppin flex flex-col max-h-40 overflow-scroll rounded-md border border-zinc-200 mt-2">
								{filteredIngr.map((suggestion, index) => (
									<span
										key={index}
										onClick={getSelectedIngr}
										className="suggestion cursor-pointer px-2 hover:bg-black hover:text-white rounded-sm">
										{suggestion}
									</span>
								))}
							</div>
						)}
					</div>
					<div
						id="recipeBox"
						className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-8 md:gap-8 lg:gap-6 xl:gap-6 items-start justify-center">
						{displayProto}
					</div>
					{displayProto.length === 0 && (
						<div
							className="flex flex-col w-full items-center gap-6 lg:w-4/6"
							id="descBox">
							<div className="desc p-6 bg-white border border-zinc-200 shadow-sm rounded-lg">
								<h1 className="text-2xl font-semibold text-color-var">
									What is Sangkap?
								</h1>
								<p className="poppin">
									Sangkap is a free web application dedicated to bringing the
									rich and flavorful world of Filipino cuisine to your home
									kitchen. Designed to provide personalized recipe
									recommendations based on the ingredients you currently have,
									Sangkap simplifies meal planning and cooking. Discover
									creative and delicious Filipino recipes that match the
									ingredients in your kitchen, making every meal a delightful
									journey into the heart of Filipino culinary traditions.
								</p>
							</div>
							<div className="desc p-6 bg-white border border-zinc-200 shadow-sm rounded-lg">
								<h1 className="text-2xl font-semibold text-color-var">
									How to use Sangkap?
								</h1>
								<p className="poppin">
									Discover delightful Filipino recipes effortlessly by typing
									your available ingredients into Sangkap&apos;s search bar, and
									let the app generate personalized recommendations tailored to
									your kitchen inventory.
								</p>
							</div>
							<div className="desc p-6 bg-white border border-zinc-200 shadow-sm rounded-lg">
								<h1 className="text-2xl font-semibold text-color-var">
									Features
								</h1>
								<p className="poppin">
									Sangkap offers a seamless cooking experience through features
									such as user accounts, ingredient inventory management, search
									and filter options, detailed recipe information, save and
									share functionalities, shopping list integration, and a
									responsive design for user-friendly accessibility across
									devices.
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
