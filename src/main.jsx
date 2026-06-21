import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Your Tailwind file
import { FilterProvider } from './context/FilterContext';
import { UserProvider } from './context/UserContext';
// import { FavoritesProvider } from './context/FavoritesContext';

// Function to enable mocking environment
async function enableMocking() {
  // Only start worker in development mode
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass', // Keeps your console clean of unhandled asset logs
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <UserProvider>
        <FilterProvider>
          {/* <FavoritesProvider> */}
          <App />
          {/* </FavoritesProvider> */}
        </FilterProvider>
      </UserProvider>
    </React.StrictMode>
  );
});