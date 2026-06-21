// src/components/FilterPanel.jsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFilters } from '../context/FilterContext';

export default function FilterPanel() {
    const { category, setActiveFilters } = useFilters();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            minM2: '',
            maxM2: '',
            odaSayisi: '',
            binaYasi: '',
            bulunduguKat: '',
            esyali: false,
            otopark: false
        }
    });

    // Reset fields back to default values when switching main categories
    useEffect(() => {
        const clearedValues = {
            minM2: '',
            maxM2: '',
            odaSayisi: '',
            binaYasi: '',
            bulunduguKat: '',
            esyali: false,
            otopark: false
        };
        reset(clearedValues);
        // Explicitly clear active filters in context on category change too
        setActiveFilters(clearedValues);
    }, [category, reset, setActiveFilters]);

    // Triggers ONLY when user clicks the "Filtreleri Uygula" button
    const onSubmit = (data) => {
        setActiveFilters(data);
    };

    // Optional: Triggers when user clears the panel
    const handleClearFilters = () => {
        const clearedValues = {
            minM2: '',
            maxM2: '',
            odaSayisi: '',
            binaYasi: '',
            bulunduguKat: '',
            esyali: false,
            otopark: false
        };
        reset(clearedValues);
        setActiveFilters(clearedValues);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden select-none"
        >
            <div className="p-5 flex flex-col gap-5">

                {/* Responsive Input Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 items-end">

                    {/* 1. Metrekare inputs */}
                    <div className="flex flex-col gap-1.5 lg:col-span-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metrekare (m²)</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                {...register('minM2')}
                                className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all text-slate-800 font-semibold"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                {...register('maxM2')}
                                className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all text-slate-800 font-semibold"
                            />
                        </div>
                    </div>

                    {/* 2. Dynamic Housing Specifications */}
                    {category === 'konut' ? (
                        <>
                            <div className="flex flex-col gap-1.5 lg:col-span-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Oda Sayısı</label>
                                <select
                                    {...register('odaSayisi')}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none text-slate-700 transition-all font-semibold"
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="1+1">1+1</option>
                                    <option value="2+1">2+1</option>
                                    <option value="3+1">3+1</option>
                                    <option value="4+1">4+1</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5 lg:col-span-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bina Yaşı</label>
                                <select
                                    {...register('binaYasi')}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none text-slate-700 transition-all font-semibold"
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="0">0 (Yeni)</option>
                                    <option value="1-5">1-5 Yıl</option>
                                    <option value="6-10">6-10 Yıl</option>
                                    <option value="11+">11+ Yıl</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5 lg:col-span-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bulunduğu Kat</label>
                                <input
                                    type="number"
                                    placeholder="Kat No"
                                    {...register('bulunduguKat')}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all text-slate-800 font-semibold"
                                />
                            </div>
                        </>
                    ) : (
                        // Spacing block to keep alignment when it's just 'arsa' category
                        <div className="hidden lg:block lg:col-span-6" />
                    )}

                    {/* Action Buttons Integrated into the primary line row */}
                    <div className="flex items-center gap-2 lg:col-span-3 w-full">
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="w-1/3 px-3 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
                        >
                            Temizle
                        </button>
                        <button
                            type="submit"
                            className="w-2/3 px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-xl shadow-md shadow-indigo-600/10 transition-all text-center"
                        >
                            🔍 Filtrele
                        </button>
                    </div>

                </div>

                {/* 3. Checkbox Row for Amenities */}
                {category === 'konut' && (
                    <div className="flex items-center gap-6 py-1 border-t border-slate-100 pt-4">
                        <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none group">
                            <input
                                type="checkbox"
                                {...register('esyali')}
                                className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition-all cursor-pointer"
                            />
                            <span className="group-hover:text-slate-900 transition-colors">Eşyalı</span>
                        </label>

                        <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none group">
                            <input
                                type="checkbox"
                                {...register('otopark')}
                                className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition-all cursor-pointer"
                            />
                            <span className="group-hover:text-slate-900 transition-colors">Otopark Var</span>
                        </label>
                    </div>
                )}

            </div>
        </form>
    );
}

// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useFilters } from '../context/FilterContext';

// export default function FilterPanel() {
//     const { category, setActiveFilters } = useFilters();

//     const { register, watch, reset } = useForm({
//         defaultValues: {
//             minM2: '',
//             maxM2: '',
//             odaSayisi: '',
//             binaYasi: '',
//             bulunduguKat: '',
//             esyali: false,
//             otopark: false
//         }
//     });

//     // Watch individual fields explicitly so we get stable value dependencies
//     const minM2 = watch('minM2');
//     const maxM2 = watch('maxM2');
//     const odaSayisi = watch('odaSayisi');
//     const binaYasi = watch('binaYasi');
//     const bulunduguKat = watch('bulunduguKat');
//     const esyali = watch('esyali');
//     const otopark = watch('otopark');

//     // Reset values when switching main categories
//     useEffect(() => {
//         reset({
//             minM2: '',
//             maxM2: '',
//             odaSayisi: '',
//             binaYasi: '',
//             bulunduguKat: '',
//             esyali: false,
//             otopark: false
//         });
//     }, [category, reset]);

//     // Sync with context ONLY when primitive values change (safely breaking the object-reference loop)
//     useEffect(() => {
//         setActiveFilters({
//             minM2,
//             maxM2,
//             odaSayisi,
//             binaYasi,
//             bulunduguKat,
//             esyali,
//             otopark
//         });
//     }, [minM2, maxM2, odaSayisi, binaYasi, bulunduguKat, esyali, otopark, setActiveFilters]);

//     return (
//         <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden select-none">
//             <div className="p-5 flex flex-col gap-5">

//                 {/* Responsive Input Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">

//                     {/* 1. Metrekare inputs */}
//                     <div className="flex flex-col gap-1.5 lg:col-span-1">
//                         <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metrekare (m²)</label>
//                         <div className="flex items-center gap-2">
//                             <input
//                                 type="number"
//                                 placeholder="Min"
//                                 {...register('minM2')}
//                                 className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all text-slate-800 font-semibold"
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Max"
//                                 {...register('maxM2')}
//                                 className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all text-slate-800 font-semibold"
//                             />
//                         </div>
//                     </div>

//                     {/* 2. Dynamic Housing Specifications */}
//                     {category === 'konut' && (
//                         <>
//                             <div className="flex flex-col gap-1.5">
//                                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Oda Sayısı</label>
//                                 <select
//                                     {...register('odaSayisi')}
//                                     className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none text-slate-700 transition-all font-semibold"
//                                 >
//                                     <option value="">Seçiniz</option>
//                                     <option value="1+1">1+1</option>
//                                     <option value="2+1">2+1</option>
//                                     <option value="3+1">3+1</option>
//                                     <option value="4+1">4+1</option>
//                                 </select>
//                             </div>

//                             <div className="flex flex-col gap-1.5">
//                                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bina Yaşı</label>
//                                 <select
//                                     {...register('binaYasi')}
//                                     className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none text-slate-700 transition-all font-semibold"
//                                 >
//                                     <option value="">Seçiniz</option>
//                                     <option value="0">0 (Yeni)</option>
//                                     <option value="1-5">1-5 Yıl</option>
//                                     <option value="6-10">6-10 Yıl</option>
//                                     <option value="11+">11+ Yıl</option>
//                                 </select>
//                             </div>

//                             <div className="flex flex-col gap-1.5">
//                                 <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kat Sayısı</label>
//                                 <input
//                                     type="number"
//                                     placeholder="Kat Adedi"
//                                     {...register('bulunduguKat')}
//                                     className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:border-indigo-500 focus:bg-white focus:outline-none transition-all text-slate-800 font-semibold"
//                                 />
//                             </div>
//                         </>
//                     )}
//                 </div>

//                 {/* 3. Checkbox Row for Amenities */}
//                 {category === 'konut' && (
//                     <div className="flex items-center gap-6 py-1 border-t border-slate-100 pt-4">
//                         <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none group">
//                             <input
//                                 type="checkbox"
//                                 {...register('esyali')}
//                                 className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition-all cursor-pointer"
//                             />
//                             <span className="group-hover:text-slate-900 transition-colors">Eşyalı</span>
//                         </label>

//                         <label className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-600 cursor-pointer select-none group">
//                             <input
//                                 type="checkbox"
//                                 {...register('otopark')}
//                                 className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500/30 transition-all cursor-pointer"
//                             />
//                             <span className="group-hover:text-slate-900 transition-colors">Otopark Var</span>
//                         </label>
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// }