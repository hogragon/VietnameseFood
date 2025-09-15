import React from 'react';
import { Language, MealType } from '../types';
import { UI_TEXT } from '../constants';

interface MealTypeSwitcherProps {
  language: Language;
  mealType: MealType;
  setMealType: (mealType: MealType) => void;
  disabled: boolean;
}

const MealTypeSwitcher: React.FC<MealTypeSwitcherProps> = ({ language, mealType, setMealType, disabled }) => {
  const texts = UI_TEXT[language];
  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];

  const commonButtonClasses = "px-4 py-2 text-sm sm:px-5 sm:text-base font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed";
  const activeButtonClasses = "bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20";
  const inactiveButtonClasses = "bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-300";

  return (
    <div className="flex items-center space-x-2 bg-slate-200/80 border border-slate-300/80 p-1.5 rounded-full">
      {mealTypes.map((type) => (
        <button
          key={type}
          onClick={() => setMealType(type)}
          disabled={disabled}
          className={`${commonButtonClasses} ${mealType === type ? activeButtonClasses : inactiveButtonClasses}`}
          aria-pressed={mealType === type}
        >
          {texts[type]}
        </button>
      ))}
    </div>
  );
};

export default MealTypeSwitcher;