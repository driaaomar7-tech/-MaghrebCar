import React, { useState } from 'react';
import { StarIcon, FacebookIcon, TwitterIcon, InstagramIcon } from './Icons';
import { Testimonial } from '../types';

interface ContactProps {
    onReviewSubmit: (review: Omit<Testimonial, 'id' | 'date' | 'authorImageUrl'>) => void;
}

const StarInput = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void; }) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex justify-center space-x-1 space-x-reverse">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <label
                        key={index}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            className="sr-only"
                        />
                        <StarIcon
                            className="h-8 w-8 cursor-pointer transition-colors text-yellow-400"
                            filled={ratingValue <= (hover || rating)}
                        />
                    </label>
                )
            })}
        </div>
    )
}

const Contact: React.FC<ContactProps> = ({ onReviewSubmit }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };
  
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && reviewName && reviewComment) {
        onReviewSubmit({
            authorName: reviewName,
            comment: reviewComment,
            rating: rating
        });
        setReviewSubmitted(true);
        setRating(0);
        setReviewName('');
        setReviewComment('');
    }
  };

  return (
    <div className="bg-gray-50 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            اتصل بنا
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            لديك سؤال أو اقتراح؟ يسعدنا أن نسمع منك.
          </p>
        </div>
        <div className="mt-12 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            {contactSubmitted ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-green-600">شكراً لك!</h3>
                <p className="mt-2 text-gray-600">لقد تم استلام رسالتك بنجاح. سنتواصل معك قريباً.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
                  <div className="mt-1">
                    <input type="text" name="name" id="name" autoComplete="name" className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                  <div className="mt-1">
                    <input id="email" name="email" type="email" autoComplete="email" className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" required />
                  </div>
                </div>
                 <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">الموضوع</label>
                  <div className="mt-1">
                    <input type="text" name="subject" id="subject" className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">الرسالة</label>
                  <div className="mt-1">
                    <textarea id="message" name="message" rows={4} className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md" required></textarea>
                  </div>
                </div>
                <div>
                  <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    إرسال الرسالة
                  </button>
                </div>
              </form>
            )}
             <div className="text-center mt-8">
                <p className="text-sm text-gray-500">
                    أو تواصل معنا مباشرة عبر البريد الإلكتروني: <a href="mailto:driaaomar7@gmail.com" className="font-medium text-blue-600 hover:text-blue-500">driaaomar7@gmail.com</a>
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <span className="sr-only">Facebook</span>
                        <FacebookIcon className="h-8 w-8" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                        <span className="sr-only">Twitter</span>
                        <TwitterIcon className="h-8 w-8" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                        <span className="sr-only">Instagram</span>
                        <InstagramIcon className="h-8 w-8" />
                    </a>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">شاركنا رأيك</h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
                نحن نقدر ملاحظاتك! ساعدنا على التحسين من خلال ترك تقييم.
            </p>
        </div>
         <div className="mt-12 bg-white shadow-xl rounded-lg overflow-hidden">
             <div className="px-6 py-8 sm:p-10">
                {reviewSubmitted ? (
                    <div className="text-center py-10">
                        <h3 className="text-2xl font-bold text-green-600">شكراً على تقييمك!</h3>
                        <p className="mt-2 text-gray-600">نحن نقدر وقتك وملاحظاتك القيمة.</p>
                         <button onClick={() => setReviewSubmitted(false)} className="mt-4 text-sm text-blue-600 hover:underline">إضافة تقييم آخر</button>
                    </div>
                ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                        <div className="text-center">
                            <label className="block text-sm font-medium text-gray-700 mb-2">تقييمك العام</label>
                            <StarInput rating={rating} setRating={setRating} />
                        </div>
                        <div>
                            <label htmlFor="reviewName" className="block text-sm font-medium text-gray-700">الاسم</label>
                            <input type="text" name="reviewName" id="reviewName" value={reviewName} onChange={(e) => setReviewName(e.target.value)} className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" required />
                        </div>
                        <div>
                            <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700">رأيك</label>
                            <textarea id="reviewComment" name="reviewComment" rows={4} value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} className="mt-1 py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md" required placeholder="كيف كانت تجربتك معنا؟"></textarea>
                        </div>
                         <div>
                            <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                إرسال التقييم
                            </button>
                        </div>
                    </form>
                )}
             </div>
         </div>
      </div>
    </div>
  );
};

export default Contact;
