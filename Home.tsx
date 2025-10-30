import React from 'react';
import { VehicleAd, Page, SearchCriteria, Testimonial } from '../types';
import AdCard from './AdCard';
import SearchBar from './SearchBar';
import Testimonials from './Testimonials';
import MapSection from './MapSection';

interface HomeProps {
  latestAds: VehicleAd[];
  recommendedAds: VehicleAd[];
  testimonials: Testimonial[];
  favoriteIds: number[];
  onNavigate: (page: Page, data?: any) => void;
  onSearch: (criteria: SearchCriteria) => void;
  onToggleFavorite: (adId: number) => void;
}

const Home: React.FC<HomeProps> = ({ latestAds, recommendedAds, testimonials, favoriteIds, onNavigate, onSearch, onToggleFavorite }) => {
  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">مرحباً في <span className="text-blue-600">مغرب كار</span></h1>
          <p className="mt-4 text-lg text-gray-600">استكشف أحدث السيارات والدراجات النارية في المغرب</p>
          <div className="mt-8 max-w-3xl mx-auto">
              <SearchBar onSearch={onSearch} />
          </div>
        </div>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">إعلانات موصى بها لك</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedAds.map(ad => (
              <AdCard 
                key={ad.id} 
                ad={ad} 
                onClick={() => onNavigate(Page.AdDetail, ad)}
                isFavorited={favoriteIds.includes(ad.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>

        <section id="latest-ads">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">أحدث الإعلانات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {latestAds.map(ad => (
              <AdCard 
                key={ad.id} 
                ad={ad} 
                onClick={() => onNavigate(Page.AdDetail, ad)}
                isFavorited={favoriteIds.includes(ad.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>
      </div>
      <MapSection />
      <Testimonials testimonials={testimonials} />
    </div>
  );
};

export default Home;