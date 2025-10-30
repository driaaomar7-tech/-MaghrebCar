
import React from 'react';
import { VehicleAd, Page, SearchCriteria } from '../types';
import AdCard from './AdCard';
import { CheckCircleIcon, SearchIcon, UserGroupIcon } from './Icons';
import SearchBar from './SearchBar';

interface LandingProps {
  latestAds: VehicleAd[];
  favoriteIds: number[];
  onNavigate: (page: Page, data?: any) => void;
  onSearch: (criteria: SearchCriteria) => void;
  onToggleFavorite: (adId: number) => void;
}

const Landing: React.FC<LandingProps> = ({ latestAds, favoriteIds, onNavigate, onSearch, onToggleFavorite }) => {
  return (
    <div className="bg-white animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-60" />

        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                مغرب كار: وجهتك الأولى لسوق السيارات
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                ابحث، قارن، واشترِ سيارتك أو دراجتك النارية القادمة بسهولة وأمان. أكبر تجمع للبائعين والمشترين في المغرب.
            </p>
            <div className="mt-10 max-w-2xl mx-auto">
                <SearchBar onSearch={onSearch} />
            </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">لماذا تختار مغرب كار؟</h2>
                <p className="mt-4 text-lg text-gray-600">نحن نقدم تجربة متكاملة لبيع وشراء المركبات.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="text-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                        <SearchIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">تشكيلة واسعة</h3>
                    <p className="mt-2 text-base text-gray-500">آلاف الإعلانات للسيارات والدراجات النارية الجديدة والمستعملة من جميع أنحاء المغرب.</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                        <CheckCircleIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">سهولة الاستخدام</h3>
                    <p className="mt-2 text-base text-gray-500">واجهة بسيطة وتصميم متجاوب لتصفح ونشر الإعلانات بكل سهولة من أي جهاز.</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                        <UserGroupIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">تواصل مباشر وآمن</h3>
                    <p className="mt-2 text-base text-gray-500">تواصل مباشرة مع البائعين والمشترين عبر نظام رسائل آمن داخل المنصة.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Latest Ads Section */}
      <section id="latest-ads" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900">أحدث الإعلانات</h2>
                <p className="mt-4 text-lg text-gray-600">ألق نظرة على أحدث المركبات المضافة إلى منصتنا.</p>
            </div>
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
        </div>
      </section>

       {/* CTA Section */}
       <section className="bg-blue-600">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">هل أنت جاهز لبيع سيارتك؟</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            انضم إلى آلاف البائعين وانشر إعلانك مجاناً ليصل إلى عدد كبير من المشترين المحتملين.
          </p>
          <button
            onClick={() => onNavigate(Page.Register)}
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
          >
            انشر إعلانك الآن
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;