import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FilterPanel from './components/FilterPanel';
import ListingGrid from './components/ListingGrid';
import ListingDetail from './components/ListingDetail/ListingDetail';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';

export default function App() {
  const [view, setView] = useState('home');
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleListingClick = (listing) => {
    setSelectedListingId(listing);
    setView('detail');
  };

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
                onListingClick={handleListingClick}
                onFavoriteClick={handleToggleFavorite}
              />
            </div>
          </div>
        )}

        {view === 'detail' && (
          <ListingDetail
            listing={selectedListingId}
            onBackClick={() => {
              setSelectedListingId(null);
              setView('home');
            }}
            setView={setView}
          />
        )}

        {view === 'about' && <AboutUs />}

        {view === 'contact' && <Contact />}

        {view === 'favorites' && (
          <Favorites
            setView={setView}
            favorites={favorites}
            onFavoriteClick={handleToggleFavorite}
            onListingClick={handleListingClick}
          />
        )}
      </main>
    </div>
  );
}