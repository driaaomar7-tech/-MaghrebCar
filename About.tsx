
import React from 'react';
import { CarIcon, UserGroupIcon } from './Icons';

const About: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      <main>
        {/* Hero section */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-50" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1930&q=80"
                  alt="سيارة رياضية زرقاء"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-700 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">من نحن</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                  مغرب كار هي أكثر من مجرد منصة، إنها وجهة لكل محبي السيارات والمحترفين في عالم المركبات في المغرب.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="bg-gray-50 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">رؤيتنا ورسالتنا</h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                نسعى لنكون المنصة الرقمية الرائدة والموثوقة في المغرب لبيع وشراء جميع أنواع المركبات، من خلال توفير تجربة مستخدم سلسة، آمنة، وفعالة.
              </p>
            </div>
            <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
              <div>
                <div className="inline-block">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <CarIcon className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900">مهمتنا</h3>
                  <p className="mt-2 text-base text-gray-500">
                    تتمثل مهمتنا في ربط البائعين والمشترين في بيئة رقمية شفافة ومباشرة، مع تقديم أدوات مبتكرة تسهل عملية البحث، المقارنة، والتواصل. نحن ملتزمون بتقديم أعلى مستويات الجودة والمصداقية في جميع الإعلانات المعروضة.
                  </p>
                </div>
              </div>
              <div>
                <div className="inline-block">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900">قيمنا</h3>
                  <p className="mt-2 text-base text-gray-500">
                    <strong>الابتكار:</strong> نسعى دائمًا لتطوير منصتنا وتقديم أحدث التقنيات. <strong>الثقة:</strong> نضع أمان مستخدمينا وبياناتهم في قمة أولوياتنا. <strong>الشفافية:</strong> نوفر معلومات واضحة ودقيقة لتمكين المستخدمين من اتخاذ قرارات مستنيرة.
                  </p>
                </div>
              </div>
              <div>
                <div className="inline-block">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <UserGroupIcon className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900">مجتمعنا</h3>
                  <p className="mt-2 text-base text-gray-500">
                    نحن فخورون ببناء مجتمع متكامل يجمع عشاق السيارات، التجار، والأفراد في مكان واحد. نؤمن بأن القوة تكمن في التواصل المباشر، ونسهل هذا التواصل لضمان أفضل الصفقات لجميع الأطراف.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;