import ListingCard from '../components/ListingCard';

export default function Favorites({
  setView,
  favorites,
  onFavoriteClick,
  onListingClick,
}) {
  return (
    <main className="w-full">
      <section className="mb-10 text-center">
        <span className="text-sm font-black tracking-[0.25em] uppercase text-indigo-600">
          Kaydedilen İlanlar
        </span>

        <h1 className="mt-3 text-4xl md:text-5xl font-black text-slate-900">
          Favorilerim
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-slate-500 leading-7">
          Beğendiğiniz ilanları daha sonra incelemek için burada
          görüntüleyebilirsiniz.
        </p>
      </section>

      {favorites.length === 0 ? (
        <section className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
          <div className="text-5xl mb-4">🤍</div>

          <h2 className="text-2xl font-black text-slate-900">
            Henüz favori ilanınız yok
          </h2>

          <p className="mt-3 text-slate-500">
            İlanları favorilere eklediğinizde burada listelenecek.
          </p>

          <button
            type="button"
            onClick={() => setView('home')}
            className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
          >
            İlanlara Geri Dön
          </button>
        </section>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onCardClick={onListingClick}
              onFavoriteClick={onFavoriteClick}
              isFavorite={true}
            />
          ))}
        </section>
      )}
    </main>
  );
}