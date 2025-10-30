import React, { useState, useMemo } from 'react';
import { VehicleAd, User, Page } from '../types';
import AdCard from './AdCard';
import { FilterIcon } from './Icons';

interface AllAdsProps {
  ads: VehicleAd[];
  users: User[];
  favoriteIds: number[];
  onNavigate: (page: Page, data?: any) => void;
  onToggleFavorite: (adId: number) => void;
}

const AllAds: React.FC<AllAdsProps> = ({ ads, users, favoriteIds, onNavigate, onToggleFavorite }) => {
  const [selectedOwnerId, setSelectedOwnerId] = useState<string>('all');

  const advertisers = useMemo(() => {
    const ownerIds = new Set(ads.map(ad => ad.ownerId));
    return users.filter(user => ownerIds.has(user.id));
  }, [ads, users]);

  const filteredAds = useMemo(() => {
    if (selectedOwnerId === 'all') {
      return ads;
    }
    return ads.filter(ad => ad.ownerId === selectedOwnerId);
  }, [ads, selectedOwnerId]);
  
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">كل الإعلانات</h1>
            <div className="flex items-center space-x-2 space-x-reverse">
                <FilterIcon className="h-5 w-5 text-gray-500" />
                <label htmlFor="advertiser-filter" className="text-sm font-medium text-gray-700">
                    فلترة حسب المعلن:
                </label>
                <select
                    id="advertiser-filter"
                    value={selectedOwnerId}
                    onChange={(e) => setSelectedOwnerId(e.target.value)}
                    className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="all">جميع المعلنين</option>
                    {advertisers.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
      </div>
      

      {filteredAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAds.map(ad => (
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
          <h2 className="text-2xl font-semibold text-gray-700">لا توجد إعلانات</h2>
          <p className="mt-4 text-gray-500 max-w-md mx-auto">
            لم يتم العثور على إعلانات تطابق الفلتر المحدد. حاول اختيار معلن آخر أو عرض جميع الإعلانات.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllAds;