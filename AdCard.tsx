
import React, { useState } from 'react';
import { VehicleAd } from '../types';
import { HeartIcon, MapPinIcon } from './Icons';
import MapPreview from './MapPreview';

interface AdCardProps {
  ad: VehicleAd;
  isFavorited: boolean;
  onToggleFavorite: (adId: number) => void;
  onClick: () => void;
  actionSlot?: React.ReactNode;
}

const AdCard: React.FC<AdCardProps> = ({ ad, isFavorited, onToggleFavorite, onClick, actionSlot }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the onClick for the card from firing
    onToggleFavorite(ad.id);
    setIsAnimating(true);
    // Reset animation class after it finishes
    setTimeout(() => {
        setIsAnimating(false);
    }, 300); // Corresponds to animation duration
  };

  const primaryImageUrl = ad.imageUrls && ad.imageUrls.length > 0
    ? ad.imageUrls[0]
    : 'https://via.placeholder.com/400x300.png?text=No+Image';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <div className="flex-grow">
        <div className="cursor-pointer" onClick={onClick}>
          <div className="relative">
              <button
                  onClick={handleFavoriteClick}
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white/70 rounded-full hover:bg-white transition-colors"
                  aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                  <HeartIcon 
                  className={`h-6 w-6 transition-colors ${isFavorited ? 'text-red-500' : 'text-gray-600'} ${isAnimating ? 'animate-pop' : ''}`}
                  filled={isFavorited}
                  />
              </button>

              <img className="w-full h-48 object-cover" src={primaryImageUrl} alt={ad.title} />
          </div>
          <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{ad.title}</h3>
              <p className="text-xl font-semibold text-blue-600 mt-1">
              {ad.price.toLocaleString('ar-MA')} درهم
              </p>
              <div className="mt-2 text-sm text-gray-600 flex justify-between">
              <span>{ad.year}</span>
              <span>{ad.mileage.toLocaleString('ar-MA')} كلم</span>
              </div>
          </div>
        </div>
        
        {/* Location and Map Toggle Section */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p className="flex items-center">
              <MapPinIcon className="h-4 w-4 ml-1 text-gray-400" />
              {ad.location}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMap(!showMap);
              }}
              className="text-xs font-semibold text-blue-600 hover:underline focus:outline-none"
              aria-label={showMap ? 'إخفاء الخريطة' : 'إظهار الخريطة'}
            >
              {showMap ? 'إخفاء الخريطة' : 'عرض الخريطة'}
            </button>
          </div>
          {showMap && (
            <div className="mt-2 h-24 w-full rounded-md overflow-hidden border">
              <MapPreview location={ad.location} className="h-full w-full" />
            </div>
          )}
        </div>
      </div>
      
      {actionSlot && (
        <div className="border-t mt-auto p-2 flex justify-around bg-gray-50">
          {actionSlot}
        </div>
      )}
    </div>
  );
};

export default AdCard;
