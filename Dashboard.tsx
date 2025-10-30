
import React, { useState } from 'react';
import { VehicleAd, User, Page } from '../types';
import AdCard from './AdCard';
import { PencilIcon, TrashIcon } from './Icons';

interface DashboardProps {
  user: User;
  userAds: VehicleAd[];
  favoriteAds: VehicleAd[];
  onNavigate: (page: Page, data?: any) => void;
  onDeleteAd: (adId: number) => void;
  onToggleFavorite: (adId: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, userAds, favoriteAds, onNavigate, onDeleteAd, onToggleFavorite }) => {
  const [adToDelete, setAdToDelete] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'myAds' | 'favorites'>('myAds');

  const handleDeleteClick = (adId: number) => {
    setAdToDelete(adId);
  };

  const confirmDelete = () => {
    if (adToDelete) {
      onDeleteAd(adToDelete);
      setAdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setAdToDelete(null);
  };

  const renderAdsList = () => {
    const adsToDisplay = activeTab === 'myAds' ? userAds : favoriteAds;
    const favoriteIds = user.favorites || [];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {adsToDisplay.length > 0 ? (
          adsToDisplay.map(ad => {
            const adminActions = activeTab === 'myAds' ? (
              <>
                <button
                  onClick={() => onNavigate(Page.EditAd, ad)}
                  className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <PencilIcon className="h-4 w-4 ml-1" />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(ad.id)}
                  className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                >
                  <TrashIcon className="h-4 w-4 ml-1" />
                  <span>حذف</span>
                </button>
              </>
            ) : undefined;

            return (
              <AdCard
                key={ad.id}
                ad={ad}
                isFavorited={favoriteIds.includes(ad.id)}
                onToggleFavorite={onToggleFavorite}
                onClick={() => onNavigate(Page.AdDetail, ad)}
                actionSlot={adminActions}
              />
            );
          })
        ) : (
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center text-gray-500 py-16">
            <p className="text-lg">
              {activeTab === 'myAds' ? 'ليس لديك أي إعلانات منشورة بعد.' : 'لم تقم بإضافة أي إعلانات إلى المفضلة بعد.'}
            </p>
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">أهلاً بك، {user.name}</h1>
      <p className="text-lg text-gray-600 mb-8">هنا يمكنك إدارة إعلاناتك، مفضلتك، وملفك الشخصي.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold text-gray-700">إعلاناتك النشطة</h3>
            <p className="text-4xl font-bold text-blue-600 my-2">{userAds.length}</p>
            <button onClick={() => onNavigate(Page.PostAd)} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                أضف إعلان جديد
            </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50" onClick={() => setActiveTab('favorites')}>
            <h3 className="text-xl font-semibold text-gray-700">المفضلة</h3>
            <p className="text-4xl font-bold text-blue-600 my-2">{user.favorites.length}</p>
            <span className="mt-4 text-blue-600 font-semibold">عرض المفضلة</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50" onClick={() => onNavigate(Page.Messages)}>
            <h3 className="text-xl font-semibold text-gray-700">الرسائل الواردة</h3>
            <p className="text-4xl font-bold text-blue-600 my-2">3</p>
            <span className="mt-4 text-blue-600 font-semibold">عرض الرسائل</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50" onClick={() => onNavigate(Page.Profile)}>
            <h3 className="text-xl font-semibold text-gray-700">الملف الشخصي</h3>
            <p className="text-gray-600 my-2">تعديل معلوماتك</p>
            <span className="mt-4 text-blue-600 font-semibold">تعديل الملف الشخصي</span>
        </div>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 space-x-reverse" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('myAds')}
              className={`${
                activeTab === 'myAds'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              إعلاناتي ({userAds.length})
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`${
                activeTab === 'favorites'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              مفضلتي ({user.favorites.length})
            </button>
          </nav>
        </div>
        {renderAdsList()}
      </div>

      {adToDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4 text-right animate-slide-in-up">
            <h3 className="text-lg font-bold text-gray-900" id="modal-title">تأكيد الحذف</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-600">هل أنت متأكد من رغبتك في حذف هذا الإعلان؟ لا يمكن التراجع عن هذا الإجراء.</p>
            </div>
            <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
              <button type="button" onClick={cancelDelete} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300">
                إلغاء
              </button>
              <button type="button" onClick={confirmDelete} className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;