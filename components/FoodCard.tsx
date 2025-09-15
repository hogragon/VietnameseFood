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
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-slate-300/50 overflow-hidden border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-400/40">
      <div className="relative">
        <img src={food.imageUrl} alt={food.name.en} className="w-full h-64 md:h-80 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
            {food.name[language]}
          </h2>
        </div>
      </div>
      <div className="p-6 md:p-8 flex justify-center">
        <button
          onClick={onViewRecipe}
          disabled={isRecipeLoading}
          className="w-full sm:w-auto px-8 py-3 bg-amber-500 text-slate-900 font-bold rounded-full shadow-md shadow-amber-500/20 hover:bg-amber-400 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center space-x-3"
        >
          {isRecipeLoading && <LoadingSpinner size="sm" />}
          <span className="text-lg">{isRecipeLoading ? texts.loadingRecipe : texts.viewRecipe}</span>
        </button>
      </div>
    </div>
  );
};

export default FoodCard;