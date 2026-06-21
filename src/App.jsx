import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FilterPanel from './components/FilterPanel';
import ListingGrid from './components/ListingGrid';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';
import CreateListing from './pages/CreateListing';

export default function App() {
  const [view, setView] = useState('home');
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (listing) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((item) => item.id === listing.id);

      if (isFavorite) {
        return prevFavorites.filter((item) => item.id !== listing.id);
      }

      return [...prevFavorites, listing];
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <Header setView={setView} />

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {view === 'home' && (
          <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-1/5 shrink-0">
              <Sidebar />
            </div>

            <div className="w-full lg:w-4/5 flex flex-col gap-6">
              <FilterPanel />

              <ListingGrid
                onFavoriteClick={handleToggleFavorite}
                favorites={favorites}
              />
            </div>
          </div>
        )}

        {view === 'about' && <AboutUs />}

        {view === 'contact' && <Contact />}

        {view === 'favorites' && (
          <Favorites
            setView={setView}
            favorites={favorites}
            onFavoriteClick={handleToggleFavorite}
          />
        )}

        {view == 'create-listing' && (
          <CreateListing />
        )}
      </main>
    </div>
  );
}