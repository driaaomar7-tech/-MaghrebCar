
import React, { useState } from 'react';
import { Page } from '../types';

const faqData = [
  {
    question: 'كيف يمكنني نشر إعلان؟',
    answer: 'لنشر إعلان، يجب أن تكون مسجلاً ومسجلاً للدخول. انقر على "نشر إعلان" في القائمة العلوية، املأ تفاصيل المركبة، قم بتحميل الصور، ثم أرسل إعلانك للمراجعة.',
  },
  {
    question: 'هل نشر الإعلانات مجاني؟',
    answer: 'نعم، نشر الإعلانات الأساسية على منصة "مغرب كار" مجاني تمامًا للمستخدمين الأفراد. قد تكون هناك خيارات مدفوعة لتمييز الإعلان في المستقبل.',
  },
  {
    question: 'كيف أبحث عن سيارة معينة؟',
    answer: 'استخدم شريط البحث في أعلى الصفحة. يمكنك كتابة كلمات مفتاحية مثل طراز السيارة أو المدينة. للحصول على نتائج أكثر دقة، استخدم خيارات الفلترة المتقدمة لتحديد الفئة، نطاق سنة الصنع، والمزيد.',
  },
  {
    question: 'كيف يمكنني التواصل مع البائع؟',
    answer: 'في صفحة تفاصيل الإعلان، ستجد خيارًا لإرسال رسالة إلى البائع عبر نظام الرسائل الآمن الخاص بنا. قد تجد أيضًا رقم هاتفه إذا اختار عرضه.',
  },
  {
    question: 'لقد نسيت كلمة المرور الخاصة بي. ماذا أفعل؟',
    answer: 'في صفحة تسجيل الدخول، انقر على رابط "هل نسيت كلمة المرور؟". أدخل عنوان بريدك الإلكتروني، وسنرسل لك تعليمات حول كيفية إعادة تعيين كلمة المرور الخاصة بك.',
  },
  {
    question: 'كيف يمكنني ضمان إجراء معاملة آمنة؟',
    answer: 'نوصي بمقابلة البائعين في مكان عام، وفحص المركبة ومستنداتها بدقة قبل الشراء، وعدم تحويل الأموال أبدًا قبل رؤية السيارة. "مغرب كار" هي منصة لربط المشترين والبائعين وليست طرفًا في المعاملة نفسها.',
  },
];

// FIX: Changed FaqItem to be a React.FC to correctly handle the 'key' prop when used in a list.
const FaqItem: React.FC<{ faq: { question: string; answer: string; }; isOpen: boolean; onToggle: () => void; }> = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <dt>
        <button
          onClick={onToggle}
          className="w-full flex justify-between items-start text-gray-700 text-right"
          aria-expanded={isOpen}
        >
          <span className="text-lg font-medium text-gray-900">{faq.question}</span>
          <span className="ml-6 h-7 flex items-center">
            <svg
              className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </dt>
      <dd className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 mt-2' : 'max-h-0'}`}>
        <div className="pb-4">
          <p className="text-base text-gray-600">{faq.answer}</p>
        </div>
      </dd>
    </div>
  );
};

interface FaqProps {
  onNavigate: (page: Page) => void;
}

const Faq: React.FC<FaqProps> = ({ onNavigate }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <div className="bg-gray-50 animate-fade-in">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            الأسئلة الشائعة
          </h2>
          <p className="text-center mt-4 text-lg text-gray-600">
            هل لديك سؤال؟ ابحث عن إجابتك هنا. إذا لم تجد ما تبحث عنه، فلا تتردد في <a onClick={() => onNavigate(Page.Contact)} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">الاتصال بنا</a>.
          </p>
          <div className="mt-12">
            <dl className="space-y-4">
               {faqData.map((faq, index) => (
                    <FaqItem
                        key={index}
                        faq={faq}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                    />
                ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;