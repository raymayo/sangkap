/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchSuggestion from './components/SearchSuggestion.jsx';
import RecipeView from './components/RecipeView.jsx';
import './App.css';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/sangkap/" element={<SearchSuggestion />} />
				<Route path="/sangkap/recipe/:recipeId" element={<RecipeView />} />
			</Routes>
		</Router>
	);
}

export default App;
