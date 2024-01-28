/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
	const [searchSuggestionState, setSearchSuggestionState] = useState({
		userInput: '',
		ingredientSuggestions: [],
		filteredIngr: [],
		ingredientArray: [],
		displayRecipe: [],
	});

	return (
		<AppStateContext.Provider
			value={{ searchSuggestionState, setSearchSuggestionState }}>
			{children}
		</AppStateContext.Provider>
	);
};

export const useAppState = () => {
	return useContext(AppStateContext);
};
