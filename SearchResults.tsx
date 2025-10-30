import React from 'react';
import { VehicleAd, SearchCriteria, Page } from '../types';
import AdCard from './AdCard';

interface SearchResultsProps {
  criteria: SearchCriteria;
  results: VehicleAd[];
  favoriteIds: number[];
  onNavigate: (page: Page, data?: any) => void;
  onToggleFavorite: (adId: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ criteria, results, favoriteIds, onNavigate, onToggleFavorite }) => {
  const hasActiveFilters = criteria.query || criteria.category !== 'الكل' || criteria.yearFrom || criteria.yearTo;
  
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">نتائج البحث</h1>
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-700">
            <span className="font-semibold">الفلاتر المطبقة:</span>
            {criteria.query && (
              <span className="bg-gray-200 rounded-full px-3 py-1">
                النص: <span className="font-medium text-gray-900">"{criteria.query}"</span>
              </span>
            )}
            {criteria.category !== 'الكل' && (
              <span className="bg-gray-200 rounded-full px-3 py-1">
                الفئة: <span className="font-medium text-gray-900">{criteria.category}</span>
              </span>
            )}
            {criteria.yearFrom && (
              <span className="bg-gray-200 rounded-full px-3 py-1">
                من سنة: <span className="font-medium text-gray-900">{criteria.yearFrom}</span>
              </span>
            )}
            {criteria.yearTo && (
              <span className="bg-gray-200 rounded-full px-3 py-1">
                إلى سنة: <span className="font-medium text-gray-900">{criteria.yearTo}</span>
              </span>
            )}
          </div>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map(ad => (
            <AdCard 
              key={ad.id} 
              ad={ad} 
              onClick={() => onNavigate(Page.AdDetail, ad)}
              isFavorited={favoriteIds.includes(ad.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">لا توجد نتائج</h2>
          <p className="mt-4 text-gray-500 max-w-md mx-auto">
            لم نتمكن من العثور على أي إعلانات تطابق بحثك. حاول تعديل الفلاتر أو استخدام كلمات بحث مختلفة.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;