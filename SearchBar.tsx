
import React, { useState } from 'react';
import { SearchCriteria } from '../types';
import { SearchIcon } from './Icons';

interface SearchBarProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const VEHICLE_CATEGORIES = ['الكل', 'سيارة', 'دراجة نارية', 'شاحنة'];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    query: '',
    category: 'الكل',
    yearFrom: '',
    yearTo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(criteria);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="md:col-span-4 lg:col-span-2">
           <label htmlFor="search-query" className="sr-only">البحث</label>
           <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="search"
                    name="query"
                    id="search-query"
                    value={criteria.query}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="ابحث بالاسم، المدينة..."
                />
            </div>
        </div>
        <div>
            <label htmlFor="search-category" className="sr-only">الفئة</label>
            <select
                id="search-category"
                name="category"
                value={criteria.category}
                onChange={handleInputChange}
                className="w-full h-full text-right block pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                {VEHICLE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>
        <div>
            <label htmlFor="search-yearFrom" className="sr-only">من سنة</label>
            <input
                type="number"
                name="yearFrom"
                id="search-yearFrom"
                value={criteria.yearFrom}
                onChange={handleInputChange}
                min="1950"
                max={new Date().getFullYear()}
                className="w-full h-full focus:ring-blue-500 focus:border-blue-500 block shadow-sm sm:text-sm border-gray-300 rounded-md py-3 px-3"
                placeholder="من سنة"
            />
        </div>
        <div>
            <label htmlFor="search-yearTo" className="sr-only">إلى سنة</label>
            <input
                type="number"
                name="yearTo"
                id="search-yearTo"
                value={criteria.yearTo}
                onChange={handleInputChange}
                min="1950"
                max={new Date().getFullYear()}
                className="w-full h-full focus:ring-blue-500 focus:border-blue-500 block shadow-sm sm:text-sm border-gray-300 rounded-md py-3 px-3"
                placeholder="إلى سنة"
            />
        </div>
      </div>
      <div className="mt-4">
        <button type="submit" className="w-full flex items-center justify-center bg-blue-600 border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-blue-700">
            بحث
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
