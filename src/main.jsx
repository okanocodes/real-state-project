import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { FilterProvider } from './context/FilterContext';
// import { FavoritesProvider } from './context/FavoritesContext';

// Function to enable mocking environment
async function enableMocking() {
  // Only start worker in development mode
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <FilterProvider>
          {/* <FavoritesProvider> */}
          <App />
          {/* </FavoritesProvider> */}
        </FilterProvider>
    </React.StrictMode>
  );
});