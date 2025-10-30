import React, { useState, useEffect, useRef } from 'react';
import { User, Page } from '../types';
import { CarIcon, PlusCircleIcon, UserCircleIcon, LogoutIcon, LayoutDashboardIcon, XIcon } from './Icons';

interface HeaderProps {
  isLoggedIn: boolean;
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, user, onLogout, onNavigate }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    onNavigate(isLoggedIn ? Page.Home : Page.Landing);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      // Mobile menu outside click is handled by the overlay div
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavAndClose = (page: Page) => {
    onNavigate(page);
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  };
  
  const navLinkClasses = "text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer";
  const mobileNavLinkClasses = "block text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-50 p-3 rounded-md cursor-pointer";
  
  const navLinks = (isMobile: boolean) => (
    <>
      <a onClick={() => handleNavAndClose(isLoggedIn ? Page.Home : Page.Landing)} className={isMobile ? mobileNavLinkClasses : navLinkClasses}>الرئيسية</a>
      <a onClick={() => handleNavAndClose(Page.AllAds)} className={isMobile ? mobileNavLinkClasses : navLinkClasses}>كل الإعلانات</a>
      <a onClick={() => handleNavAndClose(Page.About)} className={isMobile ? mobileNavLinkClasses : navLinkClasses}>من نحن</a>
      <a onClick={() => handleNavAndClose(Page.Blog)} className={isMobile ? mobileNavLinkClasses : navLinkClasses}>المدونة</a>
      <a onClick={() => handleNavAndClose(Page.Contact)} className={isMobile ? mobileNavLinkClasses : navLinkClasses}>اتصل بنا</a>
      <a onClick={() => handleNavAndClose(Page.Faq)} className={isMobile ? mobileNavLinkClasses : navLinkClasses}>الأسئلة الشائعة</a>
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer flex-shrink-0" onClick={handleLogoClick}>
            <CarIcon className="h-8 w-8 text-blue-600"/>
            <span className="ml-2 text-xl font-bold text-gray-800">مغرب كار</span>
          </div>

          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
             {navLinks(false)}
          </nav>

          <div className="flex items-center space-x-2 space-x-reverse">
            {isLoggedIn && user ? (
              <>
                <button onClick={() => onNavigate(Page.PostAd)} className="hidden sm:flex items-center bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                  <PlusCircleIcon className="h-5 w-5 ml-1" />
                  <span>نشر إعلان</span>
                </button>
                <div className="relative" ref={profileMenuRef}>
                  <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    {user.imageUrl ? (
                        <img className="h-9 w-9 rounded-full object-cover" src={user.imageUrl} alt={user.name} />
                    ) : (
                        <UserCircleIcon className="h-9 w-9 text-gray-600" />
                    )}
                  </button>
                  <div className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 ${isProfileMenuOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}`}>
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-sm font-semibold text-gray-800" role="none">
                                {user.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate" role="none">
                                {user.email}
                            </p>
                        </div>
                        <a onClick={() => handleNavAndClose(Page.Dashboard)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer" role="menuitem">
                          <LayoutDashboardIcon className="h-5 w-5 mr-3 text-gray-400" />
                          <span>لوحة التحكم</span>
                        </a>
                        <a onClick={() => handleNavAndClose(Page.Profile)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer" role="menuitem">
                            <UserCircleIcon className="h-5 w-5 mr-3 text-gray-400" />
                            <span>الملف الشخصي</span>
                        </a>
                        <a onClick={onLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer border-t border-gray-200" role="menuitem">
                          <LogoutIcon className="h-5 w-5 mr-3 text-gray-400" />
                          <span>تسجيل الخروج</span>
                        </a>
                      </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-2 space-x-reverse">
                <button onClick={() => onNavigate(Page.Login)} className="text-gray-600 font-semibold hover:text-blue-600 px-3 py-2 text-sm">تسجيل الدخول</button>
                <button onClick={() => onNavigate(Page.Register)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">إنشاء حساب</button>
              </div>
            )}
             <div className="md:hidden">
                <button onClick={() => setIsMobileMenuOpen(true)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="sr-only">Open main menu</span>
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ease-linear ${isMobileMenuOpen ? "block" : "hidden"}`} role="dialog" aria-modal="true">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" onClick={() => setIsMobileMenuOpen(false)}></div>

        {/* Sliding menu panel (for RTL) */}
        <div
          ref={mobileMenuRef}
          className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white h-full shadow-xl flex flex-col overflow-y-auto transition-transform transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="px-4 pt-5 pb-2 flex justify-between items-center">
             <div className="flex items-center cursor-pointer flex-shrink-0" onClick={handleLogoClick}>
                <CarIcon className="h-8 w-8 text-blue-600"/>
                <span className="ml-2 text-xl font-bold text-gray-800">مغرب كار</span>
             </div>
            <button type="button" className="-mr-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mt-6 px-4 space-y-1">
            {navLinks(true)}
          </div>

          <div className="mt-auto">
            {isLoggedIn && user && (
              <div className="p-4">
                  <a onClick={() => handleNavAndClose(Page.PostAd)} className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
                    <PlusCircleIcon className="h-5 w-5 ml-1" />
                    <span>نشر إعلان</span>
                  </a>
              </div>
            )}
            {!isLoggedIn && (
              <div className="px-4 py-6 border-t border-gray-200 space-y-4">
                <a onClick={() => handleNavAndClose(Page.Register)} className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 text-base font-medium">إنشاء حساب</a>
                <a onClick={() => handleNavAndClose(Page.Login)} className="block w-full text-center text-gray-600 font-semibold hover:text-blue-600 px-3 py-2 text-base">تسجيل الدخول</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;