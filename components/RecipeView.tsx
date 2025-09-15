
import React from 'react';
import { Food, Language } from '../types';
import { UI_TEXT } from '../constants';

interface RecipeViewProps {
  food: Food;
  language: Language;
  onBack: () => void;
}

const RecipeView: React.FC<RecipeViewProps> = ({ food, language, onBack }) => {
  const texts = UI_TEXT[language];

  if (!food.recipe) {
    return (
      <div className="text-center text-slate-400">
        Recipe not available.
        <button onClick={onBack} className="mt-4 block mx-auto px-4 py-2 bg-slate-700 rounded-lg">
          {texts.back}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl bg-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
      <div className="p-6">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-lg transition-colors duration-200"
        >
          &larr; {texts.back}
        </button>
        <div className="relative mb-6">
          <img src={food.imageUrl} alt={food.name.en} className="w-full h-64 object-cover rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent rounded-lg"></div>
          <h2 className="absolute bottom-0 left-0 p-4 text-3xl font-bold text-white">
            {food.name[language]}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-amber-400 mb-3 border-b-2 border-amber-400/30 pb-2">
              {texts.ingredients}
            </h3>
            <ul className="space-y-2 list-disc list-inside text-slate-300">
              {food.recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-amber-400 mb-3 border-b-2 border-amber-400/30 pb-2">
              {texts.instructions}
            </h3>
            <ol className="space-y-4 text-slate-200">
              {food.recipe.instructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="mr-3 flex-shrink-0 bg-amber-500 text-slate-900 font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="flex-grow">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;
