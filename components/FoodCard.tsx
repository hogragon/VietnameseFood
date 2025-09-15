
import React from 'react';
import { Food, Language } from '../types';
import { UI_TEXT } from '../constants';
import LoadingSpinner from './LoadingSpinner';

interface FoodCardProps {
  food: Food;
  language: Language;
  onViewRecipe: () => void;
  isRecipeLoading: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, language, onViewRecipe, isRecipeLoading }) => {
  const texts = UI_TEXT[language];

  return (
    <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
      <div className="relative">
        <img src={food.imageUrl} alt={food.name.en} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
        <h2 className="absolute bottom-0 left-0 p-6 text-4xl font-extrabold text-white tracking-wide">
          {food.name[language]}
        </h2>
      </div>
      <div className="p-6 flex justify-center">
        <button
          onClick={onViewRecipe}
          disabled={isRecipeLoading}
          className="w-full sm:w-auto px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg shadow-md hover:bg-amber-400 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isRecipeLoading && <LoadingSpinner size="sm" />}
          <span>{isRecipeLoading ? texts.loadingRecipe : texts.viewRecipe}</span>
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
