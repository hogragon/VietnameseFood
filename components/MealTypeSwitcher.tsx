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

  const commonButtonClasses = "px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed";
  const activeButtonClasses = "bg-amber-500 text-slate-900 shadow-md";
  const inactiveButtonClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600";

  return (
    <div className="flex items-center space-x-2 bg-slate-800 p-2 rounded-full">
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
