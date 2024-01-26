/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import RecipeSearch from './RecipeSearch.jsx';

const API_INGREDIENTS_URL =
	'https://raw.githubusercontent.com/raymayo/filipino-recipe-scrapping/main/prototype/prototype_ingredients.json';
const API_RECIPES_URL =
	'https://raw.githubusercontent.com/raymayo/filipino-recipe-scrapping/main/prototype/prototype_recipes1.json';

const SearchSuggestion = () => {
	const [userInput, setUserInput] = useState('');
	const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
	const [filteredIngr, setFilteredIngr] = useState([]);
	const [ingredientArray, setIngredientArray] = useState([]);

	let recipe;

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const res = await fetch(API_INGREDIENTS_URL);
				if (!res.ok) {
					throw new Error('Network response was not ok');
				}
				const suggestions = await res.json();
				setIngredientSuggestions(suggestions);
			} catch (error) {
				console.error('Error fetching suggestions:', error);
			}
		};

		fetchIngredients();
	}, []);

	const onIngrType = (e) => {
		const input = e.target.value;
		setUserInput(input);

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

		setFilteredIngr(filterSuggestions);
	};

	const getSelectedIngr = (e) => {
		const selectedIngredient = e.target.textContent;
		if (!ingredientArray.includes(selectedIngredient)) {
			setIngredientArray([...ingredientArray, selectedIngredient]);
		}
	};

	const searchRecipe = async () => {
		const ingredientQuery = ingredientArray;

		try {
			const response = await fetch(API_RECIPES_URL);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const result = await response.json();
			recipe = result;
			// console.log(result);
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		// console.log(ingredientQuery);
		// console.log(recipe);
		const foundRecipes = recipe.filter((e) =>
			e.ingredients.some((ingredient) => ingredient.includes(ingredientQuery))
		);

		if (foundRecipes.length > 0) {
			foundRecipes.forEach((foundRecipe) => {
				console.log(foundRecipe);
			});
		} else {
			console.log('No recipes found with the specified ingredient.');
		}
	};

	const deleteItemOnArray = (e) => {
		let removedItem = e.target.parentElement.textContent.slice(0, -1);
		const modifiedArray = ingredientArray.filter(
			(item) => item !== removedItem
		);
		setIngredientArray(modifiedArray);
	};

	return (
		<>
			<div className="container">
				<div id="recipeSearchBox">
					<div className="searchInput">
						<input
							id="recipeSearchInput"
							type="text"
							value={userInput}
							onChange={onIngrType}
							placeholder="Add An Ingredient"
						/>
						<button onClick={searchRecipe}>Search</button>
					</div>
					<div className="suggestionBox">
						<div className="selectedItems">
							{ingredientArray.map((item, index) => (
								<span className="itemEntered" key={index}>
									{item}
									<button onClick={deleteItemOnArray}>x</button>
								</span>
							))}
						</div>
						{filteredIngr.map((suggestion, index) => (
							<span
								key={index}
								onClick={getSelectedIngr}
								className="suggestion">
								{suggestion}
							</span>
						))}
					</div>
				</div>

				<p>ingredient array: {ingredientArray}</p>
				<p>ingredient query: {ingredientArray.join(',')}</p>
				<RecipeSearch searchQuery={ingredientArray.join(',')} />
			</div>
			<div id="recipeBox">
				{foundRecipe.map(([key, value]) => (
					<div key={key}>
						{key}: {value}
					</div>
				))}
			</div>
		</>
	);
};

export default SearchSuggestion;
