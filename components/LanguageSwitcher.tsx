import React from 'react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const commonButtonClasses = "btn rounded-circle p-1 d-flex align-items-center justify-content-center transition-all duration-300";

  return (
    <div className="d-flex align-items-center gap-2 p-1 bg-body-secondary border rounded-pill">
      <button
        onClick={() => setLanguage(Language.EN)}
        className={`${commonButtonClasses} ${language === Language.EN ? 'btn-light shadow-sm' : 'btn-link'}`}
        aria-label="Switch to English"
        style={{ width: '32px', height: '32px' }}
      >
        <img src="https://flagcdn.com/gb.svg" alt="UK Flag" className="rounded-circle" style={{ width: '24px', height: '24px' }}/>
      </button>
      <button
        onClick={() => setLanguage(Language.VI)}
        className={`${commonButtonClasses} ${language === Language.VI ? 'btn-light shadow-sm' : 'btn-link'}`}
        aria-label="Switch to Vietnamese"
        style={{ width: '32px', height: '32px' }}
      >
        <img src="https://flagcdn.com/vn.svg" alt="Vietnam Flag" className="rounded-circle" style={{ width: '24px', height: '24px' }}/>
      </button>
    </div>
  );
};

export default LanguageSwitcher;