// src/components/ListingDetail.jsx
export default function ListingDetail({ listing, onBackClick, setView }) {
    if (!listing) return null;

    console.log('listing', listing)

    // Simple static display utility for price
    const displayPrice = listing.price?.toLocaleString('tr-TR') + " ₺";

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 select-none">

            {/* 1. Header Navigation Breadcrumbs (Skeleton Structure Only) */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <button
                    onClick={() => { onBackClick(); setView('home') }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 shadow-sm"
                >
                    ← İlan Listesine Dön
                </button>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <span>{listing.ilName}</span>
                    <span className="text-slate-300">/</span>
                    <span>{listing.ilceName}</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-indigo-600">{listing.mahalleName} Mah.</span>
                </div>
            </div>

            {/* 2. Main Content Split Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT COLUMN: Static Image Carousel & Thumbnail Slots Structure */}
                <div className="lg:col-span-7 flex flex-col gap-3">

                    {/* Main Display Image Frame */}
                    <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden shadow-md group">
                        {/* Renders the current index photo or primary asset fallback */}
                        <img
                            src={listing.images?.[0] || listing.imageUrl}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Static layout navigation buttons placeholders */}
                        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-slate-800 font-black text-lg">
                            ‹
                        </button>
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-slate-800 font-black text-lg">
                            ›
                        </button>

                        {/* Pagination Bullet Dot Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-sm flex items-center gap-1.5">
                            {(listing.images || [1, 2, 3, 4]).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'w-5 bg-white' : 'w-2 bg-white/40'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Map Grid Container iterating structural secondary thumbnail previews */}
                    <div className="grid grid-cols-4 gap-3">
                        {listing.images?.map((imgUrl, idx) => (
                            <div
                                key={idx}
                                className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${idx === 0 ? 'border-indigo-600' : 'border-transparent opacity-70'}`}
                            >
                                <img src={imgUrl} alt="Preview structure asset" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: Property Specs Sheet Grid Box Structure */}
                <div className="lg:col-span-5 flex flex-col gap-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                    {/* Headline Titles Section Block */}
                    <div className="flex flex-col gap-2">
                        <span className={`self-start px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${listing.category === 'konut' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            Satılık {listing.category === 'konut' ? 'Konut' : 'Arsa'}
                        </span>
                        <h1 className="text-xl font-black text-slate-800 leading-snug">{listing.title}</h1>
                        <div className="text-2xl font-black text-indigo-600 mt-1">
                            {displayPrice}
                        </div>
                    </div>

                    {/* Key Value Data Grid Structure */}
                    <div className="border-t border-b border-slate-100 py-4 my-1 flex flex-col gap-3">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">İlan Teknik Özellikleri</h3>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm font-semibold">
                            <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 text-slate-500">
                                <span>Metrekare:</span>
                                <span className="text-slate-800 font-bold">{listing.m2} m²</span>
                            </div>

                            {listing.category === 'konut' && (
                                <>
                                    <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 text-slate-500">
                                        <span>Oda Sayısı:</span>
                                        <span className="text-slate-800 font-bold">{listing.odaSayisi || 'Belirtilmemiş'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 text-slate-500">
                                        <span>Bina Yaşı:</span>
                                        <span className="text-slate-800 font-bold">{listing.binaYasi} Yıl</span>
                                    </div>
                                    <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 text-slate-500">
                                        <span>Bulunduğu Kat:</span>
                                        <span className="text-slate-800 font-bold">{listing.katSayisi}. Kat</span>
                                    </div>
                                </>
                            )}

                            <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 text-slate-500">
                                <span>Konum İl:</span>
                                <span className="text-slate-800 font-bold">{listing.ilName}</span>
                            </div>
                            <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 text-slate-500">
                                <span>İlçe / Mahalle:</span>
                                <span className="text-slate-800 font-bold text-right truncate max-w-[130px]">{listing.ilceName} / {listing.mahalleName}</span>
                            </div>
                        </div>
                    </div>

                    {/* Structural Features Badges row for housing features */}
                    {listing.category === 'konut' && (
                        <div className="flex flex-wrap gap-3">
                            <div className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl border ${listing.esyali ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-slate-200 text-slate-400 line-through'}`}>
                                🛋️ {listing.esyali ? 'Eşyalı' : 'Eşyasız'}
                            </div>
                            <div className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl border ${listing.otopark ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 border-slate-200 text-slate-400 line-through'}`}>
                                🚗 {listing.otopark ? 'Özel Otopark' : 'Otopark Yok'}
                            </div>
                        </div>
                    )}

                    {/* Action Footer Call Box Structure */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mt-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
                                RE
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-slate-800">RealEstate Danışmanlık</h4>
                                <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Profesyonel Destek Hattı</p>
                            </div>
                        </div>
                        <button className="w-full mt-4 bg-indigo-600 text-white py-2.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-600/10">
                            Telefon Numarasını Göster
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}