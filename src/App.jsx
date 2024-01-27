/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchSuggestion from './components/SearchSuggestion.jsx';
import RecipeView from './components/RecipeView.jsx';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/recipe-app/" element={<SearchSuggestion />} />
				<Route path="/recipe-app/recipe/:recipeId" element={<RecipeView />} />
			</Routes>
		</Router>
	);
}

export default App;
