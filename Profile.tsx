
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { UserCircleIcon } from './Icons';

interface ProfileProps {
  user: User;
  onUpdateProfile: (updatedUser: any) => void;
  onCancel: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateProfile, onCancel }) => {
  const [formData, setFormData] = useState<User>(user);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(user.imageUrl || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setFormData(user);
    setImagePreview(user.imageUrl || null);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImagePreview = URL.createObjectURL(file);
      setImagePreview(newImagePreview);
      setImageFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({...formData, imageFile: imageFile});
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">الملف الشخصي</h2>
      
      {showSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 animate-slide-in-up" role="alert">
          <p className="font-bold">نجاح!</p>
          <p>تم تحديث ملفك الشخصي بنجاح.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700">الصورة الشخصية</label>
            <div className="mt-2 flex items-center space-x-4 space-x-reverse">
                <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                    {imagePreview ? 
                        <img src={imagePreview} alt="Profile Preview" className="h-full w-full object-cover" /> : 
                        <UserCircleIcon className="h-full w-full text-gray-300" />
                    }
                </span>
                <label htmlFor="profile-picture-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span>تغيير الصورة</span>
                    <input id="profile-picture-upload" name="profile-picture-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                </label>
            </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
            required 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100 cursor-not-allowed"
            required 
            readOnly
          />
        </div>
         <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
          <input 
            type="tel" 
            name="phone" 
            id="phone" 
            value={formData.phone || ''} 
            onChange={handleChange} 
            placeholder="مثال: 0600112233"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">العنوان</label>
          <input 
            type="text" 
            name="address" 
            id="address" 
            value={formData.address || ''} 
            onChange={handleChange} 
            placeholder="مثال: 123 شارع الرئيسي، الدار البيضاء"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>


        <div className="pt-4 flex justify-end space-x-3 space-x-reverse">
            <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">
                العودة إلى لوحة التحكم
            </button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                حفظ التعديلات
            </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;