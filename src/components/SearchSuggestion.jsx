/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import RecipeSearch from './RecipeSearch.jsx';

const SearchSuggestion = () => {
	const [userInput, setUserInput] = useState('');
	const [ingrSuggestion, setIngrSuggestion] = useState([]);
	const [filteredIngr, setFilterIngr] = useState([]);

	const [ingredientArray, setIngredientArray] = useState([]);
	const [ingredientQuery, setIngredientQuery] = useState(null);

	useEffect(() => {
		fetch('/ingredients.txt')
			.then((res) => res.text())
			.then((text) => {
				const suggestionArray = text.split('\n').filter(Boolean);
				setIngrSuggestion(suggestionArray);
			})
			.catch((err) => console.error('Error fetching suggestions:', err));
	}, []);

	console.log(filteredIngr);

	const onIngrType = (e) => {
		const input = e.target.value;
		setUserInput(input);

		const filterSuggestions = ingrSuggestion
			.filter((suggestion) =>
				suggestion.toLowerCase().includes(input.toLowerCase())
			)
			.sort(
				(a, b) =>
					a.toLowerCase().indexOf(input.toLowerCase()) -
					b.toLowerCase().indexOf(input.toLowerCase())
			);

		setFilterIngr(filterSuggestions);
	};

	const getSelectedIngr = (e) => {
		if (ingredientArray.includes(e.target.textContent)) {
			return;
		}
		setIngredientArray([...ingredientArray, e.target.textContent]);
		setUserInput('');
	};

	const searchRecipe = () => {
		setIngredientQuery(ingredientArray.join(','));
		// console.log(ingredientQuery);
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
			<div>
				<div id="recipeSearchBox">
					{ingredientArray.map((item, index) => (
						<span className="itemEntered" key={index}>
							{item}
							<button onClick={deleteItemOnArray}>x</button>
						</span>
					))}
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
					{filteredIngr.map((suggestion, index) => (
						<span key={index} onClick={getSelectedIngr}>
							{suggestion}
						</span>
					))}
				</div>
				<p>ingredient array: {ingredientArray}</p>
				<p>ingredient query: {ingredientQuery}</p>
			</div>
			<RecipeSearch searchQuery={ingredientQuery} />
		</>
	);
};

export default SearchSuggestion;
