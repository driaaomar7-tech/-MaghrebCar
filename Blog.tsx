

import React from 'react';
import { BlogPost, Page } from '../types';

interface BlogProps {
  posts: BlogPost[];
  onNavigate: (page: Page, data: any) => void;
}

const Blog: React.FC<BlogProps> = ({ posts, onNavigate }) => {
  return (
    <div className="bg-gray-50 py-20 sm:py-32 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-12 bg-white rounded-2xl shadow-xl border border-gray-100">
            <svg className="mx-auto h-16 w-16 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                قريباً... قسم المدونة!
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-600">
                فريقنا يعمل بجد لإطلاق مدونة "مغرب كار". استعدوا لمقالات شيقة، نصائح قيمة، وآخر أخبار عالم السيارات في المغرب.
            </p>
            <div className="mt-8">
                <button
                    onClick={() => onNavigate(Page.Home, null)}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    العودة إلى الصفحة الرئيسية
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
