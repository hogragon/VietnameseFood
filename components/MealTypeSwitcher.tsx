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

  return (
    <div className="btn-group shadow-sm" role="group" aria-label="Meal type selector">
      {mealTypes.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => setMealType(type)}
          disabled={disabled}
          className={`btn fw-semibold px-3 ${mealType === type ? 'btn-warning text-dark active' : 'btn-light'}`}
        >
          {texts[type]}
        </button>
      ))}
    </div>
  );
};

export default MealTypeSwitcher;