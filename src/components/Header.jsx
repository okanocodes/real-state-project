import { useFilters } from '../context/FilterContext';

export default function Header({ setView }) {
  const { searchQuery, setSearchQuery } = useFilters();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setView('home');
  };

  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-sm select-none">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
        <div
          onClick={() => setView('home')}
          className="text-2xl font-black tracking-tighter cursor-pointer group shrink-0"
        >
          <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">
            SAHİBİNDEN
          </span>

          <span className="text-slate-400 font-light text-base tracking-normal">
            CLONE
          </span>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-3xl h-12 flex bg-slate-800 border border-slate-700 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-md"
        >
          <input
            type="text"
            placeholder="İlan adı, no veya konum yazın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 text-sm text-slate-100 bg-transparent placeholder-slate-500 focus:outline-none"
          />

          <button
            type="submit"
            className="px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors flex items-center gap-2"
          >
            Ara
          </button>
        </form>

        <div className="flex items-center gap-6 shrink-0">
          <button
            type="button"
            onClick={() => setView('about')}
            className="text-sm font-bold text-slate-300 hover:text-yellow-400 transition-colors"
          >
            Hakkımızda
          </button>

          <button
            type="button"
            onClick={() => setView('contact')}
            className="text-sm font-bold text-slate-300 hover:text-yellow-400 transition-colors"
          >
            İletişim
          </button>

          <button
            type="button"
            onClick={() => setView('favorites')}
            className="text-sm font-bold text-slate-300 hover:text-rose-400 transition-colors flex items-center gap-1.5"
          >
            ❤️ <span className="hidden sm:inline">Favorilerim</span>
          </button>

          <button
            type="button"
            onClick={() => setView('login')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-indigo-600/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            Giriş Yap
          </button>

          <button
            type="button"
            onClick={() => setView('create-listing')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-indigo-600/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            İlan Ver
          </button>
        </div>
      </div>
    </header>
  );
}