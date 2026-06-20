// src/components/ListingDetail.jsx
export default function ListingDetail({ listing, onBackClick, setView }) {
    if (!listing) return null;

    console.log('listing', listing)


    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 select-none">

            liste detayı sayfası
        </div>
    );
}