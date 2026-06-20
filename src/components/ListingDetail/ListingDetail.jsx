import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function ListingDetail({ listing, onBackClick }) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedImageIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', handleSelect);
    handleSelect();

    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi]);

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

  const listingImages = listing.images || [listing.imageUrl];

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
          <div className="relative rounded-2xl overflow-hidden bg-slate-100">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {listingImages.map((image, index) => (
                  <div key={index} className="min-w-0 flex-[0_0_100%]">
                    <img
                      src={image}
                      alt={`${listing.title} görsel ${index + 1}`}
                      onClick={() => {
                        setSelectedImageIndex(index);
                        setIsImageOpen(true);
                      }}
                      className="w-full h-[420px] object-cover cursor-zoom-in hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {listingImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={scrollPrev}
                  className="absolute left-4 top-[210px] -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 font-black shadow-md z-10"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={scrollNext}
                  className="absolute right-4 top-[210px] -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 font-black shadow-md z-10"
                >
                  ›
                </button>
              </>
            )}

            {listingImages.length > 1 && (
              <div className="bg-white border-t border-slate-200 p-4">
                <div className="flex gap-3 overflow-x-auto">
                  {listingImages.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedImageIndex(index);
                        emblaApi?.scrollTo(index);
                      }}
                      className={`w-20 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-indigo-600'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${listing.title} küçük görsel ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-xs font-bold text-slate-500">
                  {selectedImageIndex + 1}/{listingImages.length} Fotoğraf
                </p>
              </div>
            )}
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

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-6 py-4 text-sm font-black transition-colors ${
              activeTab === 'details'
                ? 'bg-yellow-400 text-slate-900'
                : 'bg-slate-50 text-slate-500 hover:text-slate-900'
            }`}
          >
            İlan Detayları
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`px-6 py-4 text-sm font-black transition-colors border-l border-slate-200 ${
              activeTab === 'location'
                ? 'bg-yellow-400 text-slate-900'
                : 'bg-slate-50 text-slate-500 hover:text-slate-900'
            }`}
          >
            Konumu
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="p-6">
            <h2 className="text-lg font-black text-slate-900 mb-4">
              Açıklama
            </h2>

            <p className="text-slate-600 leading-8 mb-8">
              {listing.description ||
                'Bu ilan için henüz açıklama eklenmemiştir.'}
            </p>

            <h3 className="text-lg font-black text-slate-900 mb-4">
              İlan Özellikleri
            </h3>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex justify-between gap-4 px-5 py-4 border-b border-slate-200 md:border-r">
                  <span className="text-sm font-bold text-slate-500">
                    Kategori
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {listing.category === 'konut' ? 'Konut' : 'Arsa'}
                  </span>
                </div>

                <div className="flex justify-between gap-4 px-5 py-4 border-b border-slate-200">
                  <span className="text-sm font-bold text-slate-500">
                    Fiyat
                  </span>
                  <span className="text-sm font-black text-indigo-600">
                    {listing.price?.toLocaleString('tr-TR')} TL
                  </span>
                </div>

                <div className="flex justify-between gap-4 px-5 py-4 border-b border-slate-200 md:border-r">
                  <span className="text-sm font-bold text-slate-500">
                    Metrekare
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {listing.m2} m²
                  </span>
                </div>

                {listing.category === 'konut' && (
                  <div className="flex justify-between gap-4 px-5 py-4 border-b border-slate-200">
                    <span className="text-sm font-bold text-slate-500">
                      Oda Sayısı
                    </span>
                    <span className="text-sm font-black text-slate-900">
                      {listing.odaSayisi}
                    </span>
                  </div>
                )}

                <div className="flex justify-between gap-4 px-5 py-4 border-b border-slate-200 md:border-r">
                  <span className="text-sm font-bold text-slate-500">
                    İl
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {listing.ilName}
                  </span>
                </div>

                <div className="flex justify-between gap-4 px-5 py-4 border-b border-slate-200">
                  <span className="text-sm font-bold text-slate-500">
                    İlçe
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {listing.ilceName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="p-6">
            <h2 className="text-lg font-black text-slate-900 mb-4">
              Konum Bilgisi
            </h2>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="text-slate-600 font-semibold">
                📍 {listing.ilName} / {listing.ilceName}
              </p>

              <div className="mt-5 h-64 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-500 font-bold">
                Harita alanı
              </div>
            </div>
          </div>
        )}
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
            src={listingImages[selectedImageIndex]}
            alt={`${listing.title} büyük görsel`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}