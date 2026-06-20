// src/context/FilterContext.jsx
import { createContext, useContext, useState } from 'react';

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('konut'); // 'konut' veya 'arsa'

    // --- Global Location States ---
    const [selectedIl, setSelectedIl] = useState('');
    const [selectedIlce, setSelectedIlce] = useState('');
    const [selectedMahalle, setSelectedMahalle] = useState('');

    // Other specific property specifications (m2, rooms, age, etc.)
    const [activeFilters, setActiveFilters] = useState({});

    // Reset EVERYTHING except the search bar when the category changes
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setSelectedIl('');
        setSelectedIlce('');
        setSelectedMahalle('');
        setActiveFilters({});
    };

    return (
        <FilterContext.Provider value={{
            searchQuery, setSearchQuery,
            category, setCategory: handleCategoryChange,
            selectedIl, setSelectedIl,
            selectedIlce, setSelectedIlce,
            selectedMahalle, setSelectedMahalle,
            activeFilters, setActiveFilters
        }}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error('useFilters error');
    return context;
};