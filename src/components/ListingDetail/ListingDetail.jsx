import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function ListingDetail({
  listing,
  onBackClick,
  onFavoriteClick,
  isFavorite,
}) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
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
          className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
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
        className="w-fit mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
      >
        İlan Listesine Dön
      </button>

      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm self-start">
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

          <div className="flex flex-col gap-5 bg-white border border-slate-200 rounded-3xl shadow-sm p-6 self-start">
            <div className="flex items-center justify-between gap-4">
              <span className="w-fit text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                {listing.category === 'konut' ? 'Konut' : 'Arsa'}
              </span>

              <button
                type="button"
                onClick={() => {
                  if (onFavoriteClick) {
                    onFavoriteClick(listing);
                  }
                }}
                className={`w-11 h-11 rounded-full shadow-md flex items-center justify-center transition-colors ${
                  isFavorite
                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                    : 'bg-white border border-slate-200 text-rose-500 hover:bg-rose-50'
                }`}
              >
                {isFavorite ? '🤍' : '❤️'}
              </button>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {listing.title}
            </h1>

            <p className="text-3xl font-black text-indigo-600">
              {listing.price?.toLocaleString('tr-TR')} TL
            </p>

            <p className="text-slate-500 font-semibold">
              📍 {listing.ilName} / {listing.ilceName}
            </p>



            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                <h2 className="text-sm font-black text-slate-900">
                  İlan Özellikleri
                </h2>
              </div>

              <div className="border border-slate-200  overflow-hidden bg-white">
              <div className="flex justify-between gap-4 px-5 py-4 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-500">
                  İlan No
                </span>

                <span className="text-sm font-black text-rose-600">
                  #{listing.id}
                </span>
              </div>

              <div className="flex justify-between gap-4 px-5 py-4">
                <span className="text-sm font-bold text-slate-500">
                  İlan Tarihi
                </span>

                <span className="text-sm font-black text-slate-900">
                  {listing.createdAt || '21 Haziran 2026'}
                </span>
              </div>
            </div>

              <div className="flex justify-between gap-4 px-5 py-3 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-500">
                  Kategori
                </span>

                <span className="text-sm font-black text-slate-900">
                  {listing.category === 'konut' ? 'Konut' : 'Arsa'}
                </span>
              </div>



              <div className="flex justify-between gap-4 px-5 py-3 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-500">
                  Metrekare
                </span>

                <span className="text-sm font-black text-slate-900">
                  {listing.m2} m²
                </span>
              </div>

              {listing.category === 'konut' && (
                <>
                  <div className="flex justify-between gap-4 px-5 py-3 border-b border-slate-200">
                    <span className="text-sm font-bold text-slate-500">
                      Oda Sayısı
                    </span>

                    <span className="text-sm font-black text-slate-900">
                      {listing.odaSayisi || 'Belirtilmemiş'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 px-5 py-3 border-b border-slate-200">
                    <span className="text-sm font-bold text-slate-500">
                      Bina Yaşı
                    </span>

                    <span className="text-sm font-black text-slate-900">
                      {listing.binaYasi || 'Belirtilmemiş'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 px-5 py-3 border-b border-slate-200">
                    <span className="text-sm font-bold text-slate-500">
                      Bulunduğu Kat
                    </span>

                    <span className="text-sm font-black text-slate-900">
                      {listing.bulunduguKat || 'Belirtilmemiş'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 px-5 py-3 border-b border-slate-200">
                    <span className="text-sm font-bold text-slate-500">
                      Eşyalı
                    </span>

                    <span className="text-sm font-black text-slate-900">
                      {listing.esyaliMi || 'Hayır'}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 px-5 py-3">
                    <span className="text-sm font-bold text-slate-500">
                      Otopark
                    </span>

                    <span className="text-sm font-black text-slate-900">
                      {listing.otopark === true
                        ? 'Var'
                        : listing.otopark === false
                        ? 'Yok'
                        : listing.otopark || 'Yok'}
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsMessageOpen(true)}
              className="w-full px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black transition-colors shadow-md"
            >
              Satıcıya Mesaj Gönder
            </button>
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
            Açıklama
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
              İlan Açıklaması
            </h2>

            <p className="text-slate-600 leading-8">
              {listing.description ||
                'Bu ilan için henüz açıklama eklenmemiştir.'}
            </p>
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

              <div className="mt-5 h-80 rounded-2xl overflow-hidden border border-slate-200">
                <iframe
                  title={`${listing.ilName} ${listing.ilceName} harita`}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=28.5%2C40.7%2C29.5%2C41.3&layer=mapnik"
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
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

      {isMessageOpen && (
        <div
          onClick={() => setIsMessageOpen(false)}
          className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Satıcıya Mesaj Gönder
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {listing.title}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsMessageOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black transition-colors"
              >
                ×
              </button>
            </div>

            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Merhaba, ilan hakkında bilgi almak istiyorum..."
              className="w-full min-h-36 border border-slate-300 rounded-2xl p-4 outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsMessageOpen(false)}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
              >
                Vazgeç
              </button>

              <button
                type="button"
                onClick={() => {
                  if (messageText.trim() === '') {
                    alert('Lütfen mesajınızı yazınız.');
                    return;
                  }

                  alert('Mesajınız satıcıya gönderildi.');
                  setMessageText('');
                  setIsMessageOpen(false);
                }}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black transition-colors"
              >
                Mesajı Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}