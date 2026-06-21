import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateListing() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            title: '',
            price: '',
            m2: '',
            category: 'konut',
            ilId: '',
            ilName: '',
            ilceId: '',
            ilceName: '',
            mahalleId: '',
            mahalleName: '',
            description: '',
            odaSayisi: '',
            binaYasi: '',
            katSayisi: '',
            esyali: false,
            otopark: false
        }
    });

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);

    const selectedIlId = watch('ilId');
    const selectedIlceId = watch('ilceId');
    const currentCategory = watch('category');

    // Fetch all cities on mount
    useEffect(() => {
        fetch('https://api.turkiyeapi.dev/v2/provinces')
            .then((res) => res.json())
            .then((resData) => setCities(resData.data || []))
            .catch((err) => console.error('Error fetching cities:', err));
    }, []);

    // Cascade districts when city changes
    useEffect(() => {
        if (!selectedIlId) {
            setDistricts([]);
            setNeighborhoods([]);
            setValue('ilceId', '');
            setValue('mahalleId', '');
            return;
        }

        setValue('ilceId', '');
        setValue('mahalleId', '');
        setNeighborhoods([]);

        const matchCity = cities.find((c) => String(c.id) === String(selectedIlId));
        if (matchCity) setValue('ilName', matchCity.name);

        // FIX: resData.data is the array directly
        fetch(`https://api.turkiyeapi.dev/v2/provinces/${selectedIlId}/districts`)
            .then((res) => res.json())
            .then((resData) => setDistricts(resData.data || []))
            .catch((err) => console.error('Error fetching districts:', err));
    }, [selectedIlId, cities, setValue]);

    // Cascade neighborhoods when district changes
    useEffect(() => {
        if (!selectedIlceId) {
            setNeighborhoods([]);
            setValue('mahalleId', '');
            return;
        }

        setValue('mahalleId', '');

        const matchDist = districts.find((d) => String(d.id) === String(selectedIlceId));
        if (matchDist) setValue('ilceName', matchDist.name);

        // FIX: resData.data is the array directly
        fetch(`https://api.turkiyeapi.dev/v2/districts/${selectedIlceId}/neighborhoods`)
            .then((res) => res.json())
            .then((resData) => setNeighborhoods(resData.data || []))
            .catch((err) => console.error('Error fetching neighborhoods:', err));
    }, [selectedIlceId, districts, setValue]);

    const handleMahalleChange = (e) => {
        const mId = e.target.value;
        const matchMah = neighborhoods.find((n) => String(n.id) === String(mId));
        if (matchMah) setValue('mahalleName', matchMah.name);
    };

    const onSubmit = async (data) => {
        const randomSeedBase = Math.floor(Math.random() * 500);
        const mockImagesArray = [
            `https://picsum.photos/seed/${randomSeedBase}/800/600`,
            `https://picsum.photos/seed/${randomSeedBase + 1}/800/600`,
            `https://picsum.photos/seed/${randomSeedBase + 2}/800/600`,
            `https://picsum.photos/seed/${randomSeedBase + 3}/800/600`,
        ];

        const finalPayload = {
            ...data,
            imageUrl: mockImagesArray[0],
            images: mockImagesArray
        };

        try {
            const response = await fetch('/api/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalPayload),
            });

            if (response.ok) {
                const createdAd = await response.json();
                console.log('MSW Response Success Payload:', createdAd);
                alert('İlan başarıyla veritabanına kaydedildi!');
                reset();
            } else {
                alert('İlan eklenirken bir hata meydana geldi.');
            }
        } catch (error) {
            console.error('Network Error connecting to MSW:', error);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white border border-slate-200 rounded-2xl shadow-sm select-none">
            <div className="border-b border-slate-100 pb-4 mb-6">
                <h1 className="text-2xl font-black text-slate-800">Yeni İlan Ekle</h1>
                <p className="text-sm font-semibold text-slate-400 mt-1">Girdiğiniz veriler MSW sahte veritabanına anlık kaydedilir.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                {/* Category & Title */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">İlan Türü</label>
                        <select
                            {...register('category')}
                            className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all font-semibold text-slate-800"
                        >
                            <option value="konut">Satılık Konut</option>
                            <option value="arsa">Satılık Arsa</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">İlan Başlığı</label>
                        <input
                            type="text"
                            placeholder="Örn: Caddebostan Sahilde Satılık Daire"
                            {...register('title', { required: 'İlan başlığı girilmesi zorunludur' })}
                            className={`w-full px-3 py-2 text-sm border ${errors.title ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 bg-slate-50'} rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all font-semibold text-slate-800`}
                        />
                        {errors.title && <span className="text-xs font-bold text-rose-500 mt-0.5">{errors.title.message}</span>}
                    </div>
                </div>

                {/* Price & Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fiyat (TL)</label>
                        <input
                            type="number"
                            placeholder="0"
                            {...register('price', { required: 'Fiyat alanı boş bırakılamaz' })}
                            className={`w-full px-3 py-2 text-sm border ${errors.price ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 bg-slate-50'} rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all font-semibold text-slate-800`}
                        />
                        {errors.price && <span className="text-xs font-bold text-rose-500 mt-0.5">{errors.price.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Metrekare (m²)</label>
                        <input
                            type="number"
                            placeholder="0"
                            {...register('m2', { required: 'Metrekare alanı boş bırakılamaz' })}
                            className={`w-full px-3 py-2 text-sm border ${errors.m2 ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 bg-slate-50'} rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all font-semibold text-slate-800`}
                        />
                        {errors.m2 && <span className="text-xs font-bold text-rose-500 mt-0.5">{errors.m2.message}</span>}
                    </div>
                </div>

                {/* Cascading Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50/60 p-4 border border-slate-100 rounded-2xl">
                    {/* İl */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">İl</label>
                        <select
                            {...register('ilId', { required: 'İl seçimi yapmalısınız' })}
                            className={`w-full px-3 py-2 text-sm border ${errors.ilId ? 'border-rose-500' : 'border-slate-200'} bg-white rounded-xl focus:border-indigo-500 focus:outline-none font-semibold text-slate-700`}
                        >
                            <option value="">Seçiniz</option>
                            {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        {errors.ilId && <span className="text-xs font-bold text-rose-500 mt-0.5">{errors.ilId.message}</span>}
                    </div>

                    {/* İlçe */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">İlçe</label>
                        <select
                            disabled={!selectedIlId || districts.length === 0}
                            {...register('ilceId', { required: 'İlçe seçimi yapmalısınız' })}
                            className={`w-full px-3 py-2 text-sm border ${errors.ilceId ? 'border-rose-500' : 'border-slate-200'} bg-white rounded-xl focus:border-indigo-500 focus:outline-none font-semibold text-slate-700 disabled:opacity-40 disabled:bg-slate-100`}
                        >
                            <option value="">Seçiniz</option>
                            {districts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                        {errors.ilceId && <span className="text-xs font-bold text-rose-500 mt-0.5">{errors.ilceId.message}</span>}
                    </div>

                    {/* Mahalle */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mahalle</label>
                        <select
                            disabled={!selectedIlceId || neighborhoods.length === 0}
                            {...register('mahalleId', { required: 'Mahalle seçimi yapmalısınız' })}
                            onChangeCapture={handleMahalleChange}
                            className={`w-full px-3 py-2 text-sm border ${errors.mahalleId ? 'border-rose-500' : 'border-slate-200'} bg-white rounded-xl focus:border-indigo-500 focus:outline-none font-semibold text-slate-700 disabled:opacity-40 disabled:bg-slate-100`}
                        >
                            <option value="">Seçiniz</option>
                            {neighborhoods.map((n) => <option key={n.id} value={n.id}>{n.name}</option>)}
                        </select>
                        {errors.mahalleId && <span className="text-xs font-bold text-rose-500 mt-0.5">{errors.mahalleId.message}</span>}
                    </div>
                </div>

                {/* Housing Specific Details Block */}
                {currentCategory === 'konut' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-b border-slate-100 py-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Oda Sayısı</label>
                            <select
                                {...register('odaSayisi', { required: 'Konutlar için oda sayısı seçilmelidir' })}
                                className={`w-full px-3 py-2 text-sm border ${errors.odaSayisi ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200 bg-slate-50'} rounded-xl focus:outline-none font-semibold text-slate-700`}
                            >
                                <option value="">Seçiniz</option>
                                <option value="1+1">1+1</option>
                                <option value="2+1">2+1</option>
                                <option value="3+1">3+1</option>
                                <option value="4+1">4+1</option>
                            </select>
                            {errors.odaSayisi && <span className="text-xs font-bold text-rose-500 mt-0.5">{errors.odaSayisi.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bina Yaşı</label>
                            <select
                                {...register('binaYasi', { required: 'Konutlar için bina yaşı seçilmelidir' })}
                                className={`w-full px-3 py-2 text-sm border ${errors.binaYasi ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200 bg-slate-50'} rounded-xl focus:outline-none font-semibold text-slate-700`}
                            >
                                <option value="">Seçiniz</option>
                                <option value="0">0 (Yeni)</option>
                                <option value="1-5">1-5 Yıl</option>
                                <option value="6-10">6-10 Yıl</option>
                                <option value="11+">11+ Yıl</option>
                            </select>
                            {errors.binaYasi && <span className="text-xs font-bold text-rose-500 mt-0.5">{errors.binaYasi.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bulunduğu Kat</label>
                            <input
                                type="number"
                                placeholder="Kat"
                                {...register('katSayisi', { required: 'Kat numarası belirtilmelidir' })}
                                className={`w-full px-3 py-2 text-sm border ${errors.katSayisi ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200 bg-slate-50'} rounded-xl focus:outline-none font-semibold text-slate-800`}
                            />
                            {errors.katSayisi && <span className="text-xs font-bold text-rose-500 mt-0.5">{errors.katSayisi.message}</span>}
                        </div>

                        <div className="md:col-span-3 flex items-center gap-6 mt-2">
                            <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer">
                                <input type="checkbox" {...register('esyali')} className="w-4 h-4 rounded-md text-indigo-600 focus:ring-0 cursor-pointer" />
                                <span>Eşyalı Konut</span>
                            </label>
                            <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer">
                                <input type="checkbox" {...register('otopark')} className="w-4 h-4 rounded-md text-indigo-600 focus:ring-0 cursor-pointer" />
                                <span>Özel Otopark Var</span>
                            </label>
                        </div>
                    </div>
                )}

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">İlan Açıklaması</label>
                    <textarea rows="3" {...register('description')} className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:outline-none font-semibold text-slate-800 resize-none" />
                </div>

                {/* Form CTA Actions */}
                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 rounded-xl shadow-md transition-all"
                    >
                        {isSubmitting ? 'Kaydediliyor...' : '💾 İlanı Yayınla'}
                    </button>
                </div>

            </form>
        </div>
    );
}