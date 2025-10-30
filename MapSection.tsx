
import React from 'react';
import { MapPinIcon } from './Icons';

const MapSection: React.FC = () => {
  return (
    <section className="relative bg-gray-800 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.imgur.com/8x8zJdY.png')" }} // Static map image of Morocco
      >
        <div className="absolute inset-0 bg-gray-900 opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          اعثر على سيارتك في كل مدن المغرب
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
          من طنجة إلى الكويرة، تغطي شبكتنا الواسعة جميع أنحاء المملكة.
        </p>

        {/* Example map pins - purely decorative */}
        <div className="absolute top-1/4 left-1/4 animate-pulse">
            <MapPinIcon className="h-8 w-8 text-red-500" />
        </div>
        <div className="absolute top-1/2 left-1/3 animate-pulse delay-500">
            <MapPinIcon className="h-8 w-8 text-red-500" />
        </div>
         <div className="absolute bottom-1/4 right-1/4 animate-pulse delay-1000">
            <MapPinIcon className="h-8 w-8 text-red-500" />
        </div>

        <div className="mt-10">
          <a
            href="#latest-ads"
            className="inline-block bg-blue-600 border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-blue-700"
          >
            تصفح الإعلانات الآن
          </a>
        </div>
      </div>
    </section>
  );
};

export default MapSection;