
import React, { useState } from 'react';
import { Page } from '../types';

interface PostAdFormProps {
  onAdPosted: (ad: any) => void;
  onCancel: () => void;
  editingAd?: any;
}

const PREDEFINED_CATEGORIES = ['سيارة', 'دراجة نارية', 'شاحنة'];

const PostAdForm: React.FC<PostAdFormProps> = ({ onAdPosted, onCancel, editingAd }) => {
  const isCustomCategory = editingAd && !PREDEFINED_CATEGORIES.includes(editingAd.category);

  const [formData, setFormData] = useState({
    title: editingAd?.title || '',
    price: editingAd?.price || '',
    year: editingAd?.year || '',
    mileage: editingAd?.mileage || '',
    location: editingAd?.location || '',
    description: editingAd?.description || '',
    category: isCustomCategory ? 'أخرى' : (editingAd?.category || 'سيارة'),
    customCategory: isCustomCategory ? editingAd.category : '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(editingAd?.imageUrls?.[0] || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = formData.category === 'أخرى' ? formData.customCategory : formData.category;
    const { customCategory, ...adData } = formData;
    
    onAdPosted({ 
        ...adData, 
        category: finalCategory,
        id: editingAd?.id,
        imageFile: imageFile, 
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">{editingAd ? 'تعديل الإعلان' : 'نشر إعلان جديد'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">عنوان الإعلان</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
        </div>

        <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">نوع المركبة</label>
            <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                {PREDEFINED_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                <option value="أخرى">أخرى (حدد)</option>
            </select>
        </div>

        {formData.category === 'أخرى' && (
            <div>
                <label htmlFor="customCategory" className="block text-sm font-medium text-gray-700">تحديد نوع المركبة</label>
                <input type="text" name="customCategory" id="customCategory" value={formData.customCategory} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="مثال: حافلة، قارب..." required />
            </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">السعر (درهم)</label>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">سنة الصنع</label>
                <input type="number" name="year" id="year" value={formData.year} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">المسافة المقطوعة (كلم)</label>
                <input type="number" name="mileage" id="mileage" value={formData.mileage} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">المدينة</label>
              <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
        </div>

        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">الوصف</label>
            <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">تحميل الصور</label>
            <div className="mt-1 flex items-center space-x-4 space-x-reverse">
                <span className="inline-block h-32 w-32 rounded-lg overflow-hidden bg-gray-100 border">
                    {imagePreview ? <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" /> : <svg className="h-full w-full text-gray-300 p-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
                </span>
                <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span>اختر صورة</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                </label>
            </div>
        </div>

        <div className="pt-4 flex justify-end space-x-3 space-x-reverse">
            <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">
                إلغاء
            </button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
                {editingAd ? 'حفظ التعديلات' : 'نشر الإعلان'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default PostAdForm;