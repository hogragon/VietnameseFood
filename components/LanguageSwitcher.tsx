
import React from 'react';
import { Language } from '../types';
import { UKFlagIcon } from './icons/UKFlagIcon';
import { VietnamFlagIcon } from './icons/VietnamFlagIcon';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const commonButtonClasses = "p-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-400";
  const activeButtonClasses = "bg-slate-700 scale-110 shadow-lg";
  const inactiveButtonClasses = "bg-slate-800 hover:bg-slate-700";

  return (
    <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-full">
      <button
        onClick={() => setLanguage(Language.EN)}
        className={`${commonButtonClasses} ${language === Language.EN ? activeButtonClasses : inactiveButtonClasses}`}
        aria-label="Switch to English"
      >
        <UKFlagIcon className="w-6 h-6" />
      </button>
      <button
        onClick={() => setLanguage(Language.VI)}
        className={`${commonButtonClasses} ${language === Language.VI ? activeButtonClasses : inactiveButtonClasses}`}
        aria-label="Switch to Vietnamese"
      >
        <VietnamFlagIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
