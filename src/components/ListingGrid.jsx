// src/components/ListingGrid.jsx
import { useEffect, useState } from 'react';
import { useFilters } from '../context/FilterContext';
import ListingCard from './ListingCard';

export default function ListingGrid({ onListingClick, onFavoriteClick }) {
    const {
        category,
        searchQuery,
        selectedIl,
        selectedIlce,
        selectedMahalle,
        activeFilters
    } = useFilters();

    const [listings, setListings] = useState([]);

    // High-performance state switch: 
    // We track background fetching status WITHOUT unmounting the main wrapper list
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        let isCurrentRequest = true;
        setIsUpdating(true); // Soft loading indicator triggered

        const queryPayload = {
            category,
            q: searchQuery,
            il: selectedIl,
            ilce: selectedIlce,
            mahalle: selectedMahalle,
            ...activeFilters
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
                    setIsUpdating(false); // Graceful completion
                }
            })
            .catch((err) => {
                console.error("İlanlar getirilirken hata oluştu:", err);
                if (isCurrentRequest) setIsUpdating(false);
            });

        return () => {
            isCurrentRequest = false;
        };
    }, [category, searchQuery, selectedIl, selectedIlce, selectedMahalle, activeFilters]);

    // If there are zero listings AND we are not mid-fetch, show the empty state panel
    if (listings.length === 0 && !isUpdating) {
        return (
            <div className="w-full py-16 bg-white border border-slate-200 rounded-2xl text-center p-6 text-slate-500 shadow-sm">
                <span className="text-4xl block mb-2">🔍</span>
                <h3 className="text-sm font-bold text-slate-700">Aradığınız kriterlere uygun ilan bulunamadı.</h3>
                <p className="text-xs text-slate-400 mt-1">Farklı filtreler seçerek tekrar deneyebilirsiniz.</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4 relative">

            {/* Top Meta Details bar containing an elegant minimal status pulse */}
            <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-400 uppercase tracking-wider h-5">
                <div>
                    Toplam <span className="text-slate-800 font-black">{listings.length}</span> ilan listeleniyor
                </div>
                {isUpdating && (
                    <div className="flex items-center gap-1.5 text-indigo-600 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        Güncelleniyor...
                    </div>
                )}
            </div>

            {/* 
        The Magic Fix: We add a transition duration property 
        and lower opacity if updates are pending. No layout shifts!
      */}
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${isUpdating ? 'opacity-40 pointer-events-none' : 'opacity-100'
                    }`}
            >
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        listing={listing}
                        onCardClick={onListingClick}
                        onFavoriteClick={onFavoriteClick}
                    />
                ))}
            </div>
        </div>
    );
}