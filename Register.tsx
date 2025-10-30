
import React, { useState } from 'react';
import { CarIcon, EyeIcon, EyeOffIcon } from './Icons';
import { Page } from '../types';

interface RegisterProps {
  onRegister: (name, email, password) => Promise<void>;
  onNavigate: (page: Page) => void;
}

interface PasswordStrength {
  level: 0 | 1 | 2 | 3 | 4;
  label: string;
}

const PasswordStrengthIndicator: React.FC<{ strength: PasswordStrength }> = ({ strength }) => {
    if (strength.level === 0) return null;

    const strengthLevels = [
        { level: 1, color: 'bg-red-500', textColor: 'text-red-500' },
        { level: 2, color: 'bg-red-500', textColor: 'text-red-500' },
        { level: 3, color: 'bg-yellow-500', textColor: 'text-yellow-500' },
        { level: 4, color: 'bg-green-500', textColor: 'text-green-500' },
    ];

    return (
        <div className="mt-2" aria-live="polite">
            <div className="flex space-x-1 space-x-reverse">
                {strengthLevels.map((levelInfo, index) => (
                    <div key={index} className="w-1/4 h-1.5 rounded-full bg-gray-200">
                        <div className={`h-1.5 rounded-full transition-colors ${strength.level > index ? levelInfo.color : ''}`}></div>
                    </div>
                ))}
            </div>
            <p className={`text-xs mt-1 text-right font-medium ${strengthLevels[strength.level -1]?.textColor || 'text-transparent'}`}>
                {strength.label}
            </p>
        </div>
    );
};


const Register: React.FC<RegisterProps> = ({ onRegister, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strength, setStrength] = useState<PasswordStrength>({ level: 0, label: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const checkPasswordStrength = (pass: string): PasswordStrength => {
    if (!pass) return { level: 0, label: '' };

    let score = 0;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^a-zA-Z\d]/.test(pass)) score++;

    if (pass.length < 8) {
      return { level: 1, label: 'ضعيف جداً' };
    }

    switch (score) {
      case 1:
      case 2:
        return { level: 2, label: 'ضعيف' };
      case 3:
        return { level: 3, label: 'متوسط' };
      case 4:
        return { level: 4, label: 'قوي' };
      default:
        return { level: 0, label: '' };
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(checkPasswordStrength(newPassword));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    setIsLoading(true);
    try {
        await onRegister(name, email, password);
    } catch(error) {
        // Error is alerted in App.tsx
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-600">
          <CarIcon className="h-12 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          إنشاء حساب جديد
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          أو{' '}
          <a onClick={() => onNavigate(Page.Login)} className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
            تسجيل الدخول لحسابك الحالي
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                الاسم الكامل
              </label>
              <div className="mt-1">
                <input id="name" name="name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required value={password} onChange={handlePasswordChange} className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500 focus:outline-none" aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                </div>
              </div>
              <PasswordStrengthIndicator strength={strength} />
            </div>
             <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                تأكيد كلمة المرور
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input id="confirm-password" name="confirm-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500 focus:outline-none" aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                </div>
              </div>
            </div>


            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;