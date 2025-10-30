
import React, { useState } from 'react';
import { VehicleAd, User, Page } from '../types';
import { UserCircleIcon, HeartIcon, ShareIcon, XIcon, FacebookIcon, TwitterIcon, WhatsAppIcon, LinkIcon, MapPinIcon } from './Icons';
import AdCard from './AdCard';
import MapPreview from './MapPreview';

interface AdDetailProps {
  ad: VehicleAd;
  owner: User;
  isFavorited: boolean;
  similarAds: VehicleAd[];
  onNavigate: (page: Page, data?: any) => void;
  onToggleFavorite: (adId: number) => void;
}

const AdDetail: React.FC<AdDetailProps> = ({ ad, owner, isFavorited, similarAds, onNavigate, onToggleFavorite }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const adUrl = typeof window !== 'undefined' ? window.location.href : `https://maghrebcar.ma/ad/${ad.id}`;
  const shareText = `ألق نظرة على هذا الإعلان: ${ad.title}`;
  
  const shareOptions = [
    { name: 'Facebook', icon: <FacebookIcon className="h-8 w-8 text-blue-600" />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(adUrl)}` },
    { name: 'Twitter', icon: <TwitterIcon className="h-8 w-8 text-sky-500" />, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(adUrl)}&text=${encodeURIComponent(shareText)}` },
    { name: 'WhatsApp', icon: <WhatsAppIcon className="h-8 w-8 text-green-500" />, url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + adUrl)}` }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(adUrl).then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const favoriteIds = isFavorited ? [ad.id] : [];
  const hasMultipleImages = ad.imageUrls && ad.imageUrls.length > 1;

  return (
    <>
      <div className="bg-gray-50 py-8 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => onNavigate(Page.Home)} className="mb-6 text-blue-600 hover:text-blue-800 font-semibold">
            &larr; العودة إلى القائمة
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main content */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                    src={ad.imageUrls[currentImageIndex]}
                    alt={`${ad.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover" 
                />
                {hasMultipleImages && (
                    <>
                        <button 
                            onClick={() => setCurrentImageIndex(i => (i === 0 ? ad.imageUrls.length - 1 : i - 1))}
                            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Previous Image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button 
                            onClick={() => setCurrentImageIndex(i => (i === ad.imageUrls.length - 1 ? 0 : i + 1))}
                            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Next Image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {ad.imageUrls.map((_, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => setCurrentImageIndex(index)} 
                                    className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'} hover:bg-white transition`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
              </div>
              
              {hasMultipleImages && (
                <div className="p-2 bg-gray-100">
                    <div className="flex space-x-2 overflow-x-auto">
                        {ad.imageUrls.map((imgUrl, index) => (
                            <button key={index} onClick={() => setCurrentImageIndex(index)} className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 ${index === currentImageIndex ? 'border-blue-500' : 'border-transparent'}`}>
                                <img src={imgUrl} alt={`${ad.title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{ad.title}</h1>
                      <p className="text-3xl font-bold text-blue-600 mt-2">{ad.price.toLocaleString('ar-MA')} درهم</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <button 
                        onClick={() => onToggleFavorite(ad.id)}
                        className={`flex items-center space-x-2 space-x-reverse border py-2 px-4 rounded-lg transition-colors ${
                            isFavorited 
                            ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100' 
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                        >
                        <HeartIcon className="h-6 w-6" filled={isFavorited} />
                        <span className="font-semibold">{isFavorited ? 'محفوظ' : 'حفظ'}</span>
                      </button>
                       <button 
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex items-center space-x-2 space-x-reverse border border-gray-300 py-2 px-4 rounded-lg transition-colors bg-white text-gray-700 hover:bg-gray-50"
                        >
                        <ShareIcon className="h-6 w-6" />
                        <span className="font-semibold">مشاركة</span>
                      </button>
                    </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">الوصف</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{ad.description}</p>
                </div>

                <div className="mt-6 border-t pt-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">المواصفات</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
                      <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">سنة الصنع</p>
                          <p className="font-semibold">{ad.year}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">المسافة المقطوعة</p>
                          <p className="font-semibold">{ad.mileage.toLocaleString('ar-MA')} كلم</p>
                      </div>
                       <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">نوع المركبة</p>
                          <p className="font-semibold">{ad.category}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">المدينة</p>
                          <p className="font-semibold">{ad.location}</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">معلومات البائع</h2>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      {owner.imageUrl ? (
                        <img src={owner.imageUrl} alt={owner.name} className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <UserCircleIcon className="w-16 h-16 text-gray-400" />
                      )}
                      <div>
                        <p className="font-bold text-lg text-gray-900">{owner.name}</p>
                        <p className="text-sm text-gray-500">عضو منذ سنة</p>
                      </div>
                    </div>
                    <div className="mt-6">
                       {owner.phone && (
                           <a href={`tel:${owner.phone}`} className="w-full text-center block bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
                              إظهار رقم الهاتف
                           </a>
                       )}
                       <button className="w-full mt-3 text-center block bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                          إرسال رسالة
                       </button>
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 border-r-4 border-yellow-400">
                        <h3 className="font-bold text-yellow-800">نصائح للسلامة</h3>
                        <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                          <li>قابل البائع في مكان عام وآمن.</li>
                          <li>افحص المركبة جيداً قبل الشراء.</li>
                          <li>لا تقم بتحويل أي أموال مسبقاً.</li>
                        </ul>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <MapPinIcon className="h-6 w-6 ml-2 text-gray-400" />
                        الموقع على الخريطة
                    </h2>
                    <div className="h-64 w-full rounded-lg overflow-hidden border">
                        <MapPreview location={ad.location} className="h-full w-full" interactive={true} />
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {similarAds.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">إعلانات مشابهة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarAds.map(similarAd => (
                  <AdCard
                    key={similarAd.id}
                    ad={similarAd}
                    isFavorited={favoriteIds.includes(similarAd.id)}
                    onToggleFavorite={onToggleFavorite}
                    onClick={() => onNavigate(Page.AdDetail, similarAd)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" onClick={() => setIsShareModalOpen(false)}>
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm m-4 text-right animate-slide-in-up" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">مشاركة الإعلان</h3>
              <button onClick={() => setIsShareModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">شارك هذا الإعلان مع أصدقائك:</p>
              <div className="flex justify-around items-center pt-4">
                {shareOptions.map(option => (
                  <a href={option.url} target="_blank" rel="noopener noreferrer" key={option.name} className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
                    {option.icon}
                    <span className="mt-2 text-sm">{option.name}</span>
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-1">أو انسخ الرابط</label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input type="text" readOnly value={adUrl} className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700" />
                  <button onClick={handleCopyLink} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                    {linkCopied ? 'تم النسخ!' : 'نسخ'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdDetail;
