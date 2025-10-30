import React, { useState } from 'react';
import { Page } from '../types';
import { CarIcon, FacebookIcon, TwitterIcon, InstagramIcon, CheckCircleIcon } from './Icons';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // In a real app, you would handle the subscription here.
    console.log('Subscribing email:', email);
    setSubmitted(true);
    setEmail('');

    setTimeout(() => {
        setSubmitted(false);
    }, 5000); // Reset form after 5 seconds
  };

  return (
    <footer className="bg-gray-900 text-gray-400" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="pb-8 xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 xl:col-span-4">
            {/* Column 1: Logo & Social */}
            <div className="md:col-span-1 space-y-8">
              <div className="flex items-center">
                <CarIcon className="h-10 w-10 text-blue-500" />
                <span className="ml-3 text-2xl font-bold text-white">مغرب كار</span>
              </div>
              <p className="text-base">
                الوجهة الأولى لبيع وشراء السيارات والدراجات النارية في المغرب.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <FacebookIcon className="h-6 w-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <TwitterIcon className="h-6 w-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <InstagramIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            {/* Column 2: Quick Links */}
            <div className="md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">روابط سريعة</h3>
              <ul className="mt-4 space-y-4">
                <li><a onClick={() => onNavigate(Page.About)} className="text-base hover:text-white cursor-pointer">من نحن</a></li>
                <li><a onClick={() => onNavigate(Page.Contact)} className="text-base hover:text-white cursor-pointer">اتصل بنا</a></li>
                <li><a onClick={() => onNavigate(Page.Blog)} className="text-base hover:text-white cursor-pointer">المدونة</a></li>
                <li><a onClick={() => onNavigate(Page.Faq)} className="text-base hover:text-white cursor-pointer">الأسئلة الشائعة</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">قانوني</h3>
              <ul className="mt-4 space-y-4">
                <li><a onClick={() => onNavigate(Page.Privacy)} className="text-base hover:text-white cursor-pointer">سياسة الخصوصية</a></li>
                <li><a onClick={() => onNavigate(Page.Terms)} className="text-base hover:text-white cursor-pointer">شروط الاستخدام</a></li>
              </ul>
            </div>
            
            {/* Column 4: Newsletter */}
            <div className="md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">اشترك في نشرتنا الإخبارية</h3>
              <p className="mt-4 text-base">
                احصل على آخر التحديثات، العروض، وأخبار السيارات مباشرة في بريدك الإلكتروني.
              </p>
              <div className="mt-4">
                {!submitted ? (
                  <form className="sm:flex sm:max-w-md" onSubmit={handleNewsletterSubmit}>
                    <label htmlFor="email-address" className="sr-only">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none min-w-0 w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-4 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                    <div className="mt-3 rounded-md sm:mt-0 sm:mr-3 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                      >
                        اشترك
                      </button>
                    </div>
                  </form>
                ) : (
                   <div className="rounded-md bg-green-500/20 p-4">
                      <div className="flex">
                          <div className="flex-shrink-0">
                              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                          </div>
                          <div className="mr-3">
                              <p className="text-sm font-medium text-green-300">شكراً لاشتراكك!</p>
                          </div>
                      </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">&copy; {new Date().getFullYear()} مغرب كار. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;