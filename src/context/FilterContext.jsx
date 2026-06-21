import { createContext, useContext, useState } from 'react';

// 1. CREATE THE BLANK CONTEXT SPACE
const FilterContext = createContext();

// 2. THE PROVIDER WRAPPER COMPONENT
export function FilterProvider({ children }) {
    // Global States shared across the entire app
    const [category, setCategory] = useState('konut'); // 'konut' or 'arsa'
    const [searchQuery, setSearchQuery] = useState('');

    // Cascading Location IDs
    const [selectedIl, setSelectedIl] = useState('');
    const [selectedIlce, setSelectedIlce] = useState('');
    const [selectedMahalle, setSelectedMahalle] = useState('');

    // Detailed specifications (from your technical FilterPanel)
    const [activeFilters, setActiveFilters] = useState({
        minM2: '',
        maxM2: '',
        odaSayisi: '',
        binaYasi: '',
        bulunduguKat: '',
        esyali: false,
        otopark: false
    });

    // The "Radio Tower" broadcasting everything nested inside it
    return (
        <FilterContext.Provider value={{
            category, setCategory,
            searchQuery, setSearchQuery,
            selectedIl, setSelectedIl,
            selectedIlce, setSelectedIlce,
            selectedMahalle, setSelectedMahalle,
            activeFilters, setActiveFilters
        }}>
            {children}
        </FilterContext.Provider>
    );
}

// 3. THE CUSTOM HOOK FOR EASY ACCESS
export function useFilters() {
    return useContext(FilterContext);
}