export default function ListingCard({
  listing,
  onFavoriteClick,
  isFavorite,
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 group flex flex-col h-full select-none">
      <div className="w-full h-52 bg-slate-100 relative overflow-hidden shrink-0">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            if (onFavoriteClick) {
              onFavoriteClick(listing);
            }
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-colors z-20 ${
            isFavorite
              ? 'bg-rose-500 text-white hover:bg-rose-600'
              : 'bg-white/90 text-rose-500 hover:bg-rose-100'
          }`}
        >
          {isFavorite ? '🤍' : '❤️'}
        </button>

        <span
          className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm text-white ${
            listing.category === 'konut' ? 'bg-indigo-600' : 'bg-emerald-600'
          }`}
        >
          {listing.category === 'konut' ? 'Konut' : 'Arsa'}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-bold text-slate-800 line-clamp-2 leading-5 group-hover:text-indigo-600 transition-colors">
            {listing.title}
          </p>

          <h4 className="text-lg font-black text-indigo-600 tracking-tight">
            {listing.price?.toLocaleString('tr-TR')} TL
          </h4>
        </div>

        <div className="border-t border-slate-100 pt-3 flex flex-col gap-1 text-xs font-semibold text-slate-500">
          <div className="flex justify-between items-center text-slate-700">
            <span className="bg-slate-100 px-2 py-0.5 rounded">
              {listing.m2} m²
            </span>

            {listing.category === 'konut' && (
              <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                {listing.odaSayisi}
              </span>
            )}
          </div>

          <p className="text-slate-400 font-medium truncate mt-1">
            📍 {listing.ilName} / {listing.ilceName}
          </p>
        </div>
      </div>
    </div>
  );
}