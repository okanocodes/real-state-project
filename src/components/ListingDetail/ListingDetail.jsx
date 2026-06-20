import { useState } from 'react';

export default function ListingDetail({ listing, onBackClick }) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  if (!listing) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        <h2 className="text-xl font-black text-slate-800">
          İlan bulunamadı
        </h2>

        <button
          type="button"
          onClick={onBackClick}
          className="mt-4 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
        >
          İlanlara Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 select-none">
      <button
        type="button"
        onClick={onBackClick}
        className="w-fit text-sm font-bold text-indigo-600 hover:text-indigo-500 hover:underline"
      >
        ⬅ İlan Listesine Dön
      </button>

      <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              onClick={() => setIsImageOpen(true)}
              className="w-full h-[420px] object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col gap-5">
            <span className="w-fit text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
              {listing.category === 'konut' ? 'Konut' : 'Arsa'}
            </span>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {listing.title}
            </h1>

            <p className="text-3xl font-black text-indigo-600">
              {listing.price?.toLocaleString('tr-TR')} TL
            </p>

            <p className="text-slate-500 font-semibold">
              📍 {listing.ilName} / {listing.ilceName}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <p className="text-xs text-slate-400 font-bold uppercase">
                  Metrekare
                </p>

                <p className="text-lg font-black text-slate-800">
                  {listing.m2} m²
                </p>
              </div>

              {listing.category === 'konut' && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Oda Sayısı
                  </p>

                  <p className="text-lg font-black text-slate-800">
                    {listing.odaSayisi}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-2 bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h2 className="text-lg font-black text-slate-900 mb-2">
                İlan Açıklaması
              </h2>

              <p className="text-slate-500 leading-7">
                {listing.description ||
                  'Bu ilan için henüz açıklama eklenmemiştir.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {isImageOpen && (
        <div
          onClick={() => setIsImageOpen(false)}
          className="fixed inset-0 bg-black/80 z-[999] flex items-center justify-center p-6"
        >
          <button
            type="button"
            onClick={() => setIsImageOpen(false)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white text-slate-900 font-black text-xl hover:bg-slate-200 transition-colors"
          >
            ×
          </button>

          <img
            src={listing.imageUrl}
            alt={listing.title}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}