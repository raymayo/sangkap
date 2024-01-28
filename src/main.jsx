import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppStateProvider } from './components/AppStateContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AppStateProvider>
			<App />
		</AppStateProvider>
	</React.StrictMode>
);
