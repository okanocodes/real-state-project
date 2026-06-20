import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FilterPanel from './components/FilterPanel';
import ListingGrid from './components/ListingGrid';
import ListingDetail from './components/ListingDetail/ListingDetail';
import AboutUs from './pages/AboutUs';

export default function App() {
  const [view, setView] = useState('home');
  const [selectedListingId, setSelectedListingId] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <Header setView={setView} />

      {/* Expanded Max-Width Wrapper for a broad dashboard experience */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">

        {view === 'home' && (
          <div className="w-full flex flex-col lg:flex-row gap-8 items-start">

            {/* Sidebar Filter Area */}
            <div className="w-full lg:w-1/5 shrink-0">
              <Sidebar />
            </div>

            {/* Complete Full-Width Content Container Panel */}
            <div className="w-full lg:w-4/5 flex flex-col gap-6">
              <FilterPanel />
              <ListingGrid onListingClick={(id) => { setSelectedListingId(id); setView('detail'); }} />
            </div>

          </div>
        )}

        {/* Router sub-views templates */}
        {view === 'detail' && (
          // <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
          //   <button onClick={() => setView('home')} className="mb-4 text-sm font-bold text-indigo-600 hover:text-indigo-500 hover:underline flex items-center gap-1">
          //     ⬅️ İlan Listesine Dön
          //   </button>
          //   <h2 className="text-xl font-black text-slate-800">İlan Detay Gözlem Alanı (ID: {selectedListingId})</h2>
          // </div>

          <ListingDetail
            listing={selectedListingId}
            onBackClick={() => setSelectedListingId(null)}
            setView={setView}
          />
        )}
        {view === 'about' && (
          <AboutUs setView={setView} />
        )}
      </main>
    </div>
  );
}