
import React, { useState, useEffect } from 'react';
import { AtSymbolIcon } from './Icons';

interface VerifyAccountProps {
  email: string;
  onVerify: (token: string) => void;
}

const VerifyAccount: React.FC<VerifyAccountProps> = ({ email, onVerify }) => {
  const [code, setCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendCode = () => {
    if (resendCooldown === 0) {
      // In a real app, you would trigger an API call to resend the code here.
      console.log('Resending code to', email);
      setMessage(`تم إرسال رمز جديد إلى ${email}`);
      setResendCooldown(30); // Start 30-second cooldown
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
        onVerify(code);
    } else {
        setMessage('الرجاء إدخال رمز صحيح مكون من 6 أرقام.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-600">
          <AtSymbolIcon className="h-12 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          تأكيد حسابك
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          لقد أرسلنا رمز تحقق مكون من 6 أرقام إلى <br/> <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 text-center">
                أدخل الرمز هنا
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center tracking-[1em]"
                />
              </div>
            </div>

            {message && <p className="text-sm text-center text-green-600">{message}</p>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                تأكيد الحساب
              </button>
            </div>
          </form>
           <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                لم تستلم الرمز؟{' '}
                <button
                    onClick={handleResendCode}
                    disabled={resendCooldown > 0}
                    className="font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    إعادة إرسال {resendCooldown > 0 ? `(${resendCooldown})` : ''}
                </button>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;