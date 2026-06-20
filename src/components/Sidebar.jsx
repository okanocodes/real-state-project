// src/components/Sidebar.jsx
import { useEffect, useState } from 'react';
import { useFilters } from '../context/FilterContext';

export default function Sidebar() {
    const {
        category, setCategory,
        selectedIl, setSelectedIl,
        selectedIlce, setSelectedIlce,
        selectedMahalle, setSelectedMahalle
    } = useFilters();

    // Local UI data lists populated dynamically from MSW
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);

    // 1. Fetch Active Cities whenever Category switches
    useEffect(() => {
        fetch('/api/locations/active/cities')
            .then(res => res.json())
            .then(data => {
                setCities(data);
                setDistricts([]);
                setNeighborhoods([]);
            });
    }, [category]);

    // 2. Fetch Active Districts when an İl is selected
    useEffect(() => {
        if (!selectedIl) {
            setDistricts([]);
            setNeighborhoods([]);
            return;
        }
        fetch(`/api/locations/active/districts?cityId=${selectedIl}`)
            .then(res => res.json())
            .then(data => {
                setDistricts(data);
                setNeighborhoods([]);
            });
    }, [selectedIl]);

    // 3. Fetch Active Neighborhoods when an İlçe is selected
    useEffect(() => {
        if (!selectedIlce) {
            setNeighborhoods([]);
            return;
        }
        fetch(`/api/locations/active/neighborhoods?districtId=${selectedIlce}`)
            .then(res => res.json())
            .then(data => setNeighborhoods(data));
    }, [selectedIlce]);

    const resetle = () => {
        setSelectedIl(null),
            setSelectedIlce(null),
            setSelectedMahalle(null)
    }

    return (
        <aside className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm select-none">
            <h3 className="text-base font-black text-slate-800 uppercase tracking-wider mb-4">Kategoriler</h3>

            {/* Category Selection Links */}
            <div className="flex flex-col gap-1.5 mb-6 text-sm font-bold">
                <div
                    onClick={() => setCategory('konut')}
                    className={`cursor-pointer px-3 py-2 rounded-xl transition-all ${category === 'konut' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                    🏢 Konut Daireleri
                </div>
                <div
                    onClick={() => setCategory('arsa')}
                    className={`cursor-pointer px-3 py-2 rounded-xl transition-all ${category === 'arsa' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                    🌿 Satılık Arsalar
                </div>
            </div>

            {/* Cascading Location Hierarchy Scroll Containers */}
            <div className="border-t border-slate-100 pt-4 flex flex-col gap-4 text-xs font-bold text-slate-500">

                {/* Tier 1: Şehir (İl) */}
                <div>
                    <span className="block mb-1.5 text-slate-400 uppercase tracking-wider text-[10px]">Şehir (İl)</span>
                    <div className="max-h-36 overflow-y-auto border border-slate-200 rounded-xl p-1 flex flex-col gap-0.5 scrollbar-thin">
                        <div
                            onClick={() => { setSelectedIl(''); setSelectedIlce(''); setSelectedMahalle(''); }}
                            className={`cursor-pointer p-2 rounded-lg ${!selectedIl ? 'bg-amber-50 text-amber-700 font-black' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                            Tümü
                        </div>
                        {cities.map(c => (
                            <div
                                key={c.id}
                                onClick={() => { setSelectedIl(c.id); setSelectedIlce(''); setSelectedMahalle(''); }}
                                className={`cursor-pointer p-2 rounded-lg ${selectedIl === c.id ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
                            >
                                {c.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tier 2: İlçe (Visible only if an İl is selected) */}
                {selectedIl && districts.length > 0 && (
                    <div>
                        <span className="block mb-1.5 text-slate-400 uppercase tracking-wider text-[10px]">İlçe</span>
                        <div className="max-h-36 overflow-y-auto border border-slate-200 rounded-xl p-1 flex flex-col gap-0.5 scrollbar-thin">
                            <div
                                onClick={() => { setSelectedIlce(''); setSelectedMahalle(''); }}
                                className={`cursor-pointer p-2 rounded-lg ${!selectedIlce ? 'bg-amber-50 text-amber-700 font-black' : 'text-slate-700 hover:bg-slate-50'}`}
                            >
                                Tümü
                            </div>
                            {districts.map(d => (
                                <div
                                    key={d.id}
                                    onClick={() => { setSelectedIlce(d.id); setSelectedMahalle(''); }}
                                    className={`cursor-pointer p-2 rounded-lg ${selectedIlce === d.id ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
                                >
                                    {d.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tier 3: Mahalle - (Visible only if an İlçe is selected) */}
                {selectedIlce && neighborhoods.length > 0 && (
                    <div>
                        <span className="block mb-1.5 text-slate-400 uppercase tracking-wider text-[10px]">Mahalle</span>
                        <div className="max-h-36 overflow-y-auto border border-slate-200 rounded-xl p-1 flex flex-col gap-0.5 scrollbar-thin">
                            <div
                                onClick={() => setSelectedMahalle('')}
                                className={`cursor-pointer p-2 rounded-lg ${!selectedMahalle ? 'bg-amber-50 text-amber-700 font-black' : 'text-slate-700 hover:bg-slate-50'}`}
                            >
                                Tümü
                            </div>
                            {neighborhoods.map(m => (
                                <div
                                    key={m.id}
                                    onClick={() => setSelectedMahalle(m.id)}
                                    className={`cursor-pointer p-2 rounded-lg ${selectedMahalle === m.id ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
                                >
                                    {m.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <div className='mt-6'>
                <button onClick={() => resetle()} className='px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-indigo-600/20 hover:-translate-y-0.5 active:translate-y-0'>Temizle</button>
            </div>
        </aside>
    );
}