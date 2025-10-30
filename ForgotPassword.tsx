
import React, { useState } from 'react';
import { Page } from '../types';
import { CarIcon, CheckCircleIcon } from './Icons';

interface ForgotPasswordProps {
  onForgotPasswordRequest: (email: string) => void;
  onNavigate: (page: Page) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onForgotPasswordRequest, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onForgotPasswordRequest(email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-600">
          <CarIcon className="h-12 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          هل نسيت كلمة المرور؟
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {submitted ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-3 text-lg leading-6 font-medium text-gray-900">
                تم إرسال التعليمات
              </h3>
              <div className="mt-2 px-4 py-3">
                <p className="text-sm text-gray-600">
                  إذا كان البريد الإلكتروني <span className="font-medium text-gray-700">{email}</span> مرتبطًا بحساب، فستتلقى رابطًا لإعادة تعيين كلمة المرور قريبًا.
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => onNavigate(Page.Login)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  العودة إلى تسجيل الدخول
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <p className="text-center text-sm text-gray-600">
                  لا تقلق. أدخل عنوان بريدك الإلكتروني المسجل وسنرسل لك تعليمات لإعادة تعيين كلمة المرور.
                </p>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  البريد الإلكتروني
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  إرسال رابط إعادة التعيين
                </button>
              </div>
              <div className="text-sm text-center">
                 <a onClick={() => onNavigate(Page.Login)} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                    العودة إلى تسجيل الدخول
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;