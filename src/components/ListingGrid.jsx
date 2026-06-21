import { useEffect, useState } from 'react';
import { useFilters } from '../context/FilterContext';
import ListingCard from './ListingCard';

export default function ListingGrid({ onFavoriteClick, favorites }) {
    const {
        category,
        searchQuery,
        selectedIl,
        selectedIlce,
        selectedMahalle,
        activeFilters,
    } = useFilters();

    const [listings, setListings] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        let isCurrentRequest = true;
        setIsUpdating(true);

        const queryPayload = {
            category,
            q: searchQuery,
            il: selectedIl,
            ilce: selectedIlce,
            mahalle: selectedMahalle,
            ...activeFilters,
        };

        const cleanParams = new URLSearchParams();

        Object.entries(queryPayload).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                cleanParams.append(key, value);
            }
        });

        fetch(`/api/listings?${cleanParams.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                if (isCurrentRequest) {
                    setListings(data);
                    setIsUpdating(false);
                }
            })
            .catch((err) => {
                console.error('İlanlar getirilirken hata oluştu:', err);

                if (isCurrentRequest) {
                    setIsUpdating(false);
                }
            });

        return () => {
            isCurrentRequest = false;
        };
    }, [
        category,
        searchQuery,
        selectedIl,
        selectedIlce,
        selectedMahalle,
        activeFilters,
    ]);

    if (listings.length === 0 && !isUpdating) {
        return (
            <div className="w-full py-16 bg-white border border-slate-200 rounded-2xl text-center p-6 text-slate-500 shadow-sm">
                <span className="text-4xl block mb-2">🔍</span>

                <h3 className="text-sm font-bold text-slate-700">
                    Aradığınız kriterlere uygun ilan bulunamadı.
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                    Farklı filtreler seçerek tekrar deneyebilirsiniz.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4 relative">
            <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-400 uppercase tracking-wider h-5">
                <div>
                    Toplam
                    <span className="text-slate-800 font-black"> {listings.length} </span>
                    ilan listeleniyor
                </div>

                {isUpdating && (
                    <div className="flex items-center gap-1.5 text-indigo-600 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        Güncelleniyor...
                    </div>
                )}
            </div>

            <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${isUpdating ? 'opacity-40 pointer-events-none' : 'opacity-100'
                    }`}
            >
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        listing={listing}
                        onFavoriteClick={onFavoriteClick}
                        isFavorite={favorites.some((item) => item.id === listing.id)}
                    />
                ))}
            </div>
        </div>
    );
}