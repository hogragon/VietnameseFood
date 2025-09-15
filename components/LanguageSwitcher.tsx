import React from 'react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const commonButtonClasses = "w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-amber-500";
  const activeButtonClasses = "bg-white scale-110 shadow-lg";
  const inactiveButtonClasses = "hover:bg-slate-200";

  return (
    <div className="flex items-center space-x-2 bg-slate-200/80 border border-slate-300/80 p-1 rounded-full">
      <button
        onClick={() => setLanguage(Language.EN)}
        className={`${commonButtonClasses} ${language === Language.EN ? activeButtonClasses : inactiveButtonClasses}`}
        aria-label="Switch to English"
      >
        <img src="https://flagcdn.com/gb.svg" alt="UK Flag" className="w-6 h-6 rounded-full" />
      </button>
      <button
        onClick={() => setLanguage(Language.VI)}
        className={`${commonButtonClasses} ${language === Language.VI ? activeButtonClasses : inactiveButtonClasses}`}
        aria-label="Switch to Vietnamese"
      >
        <img src="https://flagcdn.com/vn.svg" alt="Vietnam Flag" className="w-6 h-6 rounded-full" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;