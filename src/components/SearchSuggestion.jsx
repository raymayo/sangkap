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
				const suggestionArray = text.split(/\r?\n/).filter(Boolean);
				setIngrSuggestion(suggestionArray);
				console.log(ingrSuggestion);
			})
			.catch((err) => console.error('Error fetching suggestions:', err));
	}, []);


	const onIngrType = (e) => {
		const input = e.target.value;
		setUserInput(input);

		const filterSuggestions = input.toLowerCase() !== '' ? ingrSuggestion
			.filter((suggestion) =>
				suggestion.toLowerCase().includes(input.toLowerCase())
			)
			.sort(
				(a, b) =>
					a.toLowerCase().indexOf(input.toLowerCase()) -
					b.toLowerCase().indexOf(input.toLowerCase())
			) : [];

		setFilterIngr(filterSuggestions);
	};

	const getSelectedIngr = (e) => {
		if (ingredientArray.includes(e.target.textContent)) {
			return;
		}
		setIngredientArray([...ingredientArray,e.target.textContent]);
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
						<span key={index} onClick={getSelectedIngr} className='suggestion'>{suggestion}</span>
					))}
				</div>
				</div>
				
				<p>ingredient array: {ingredientArray}</p>
				<p>ingredient query: {ingredientQuery}</p>
			<RecipeSearch searchQuery={ingredientQuery} />
			</div>
		</>
	);
};

export default SearchSuggestion;
