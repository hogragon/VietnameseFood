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
      <div className="text-center text-slate-500">
        Recipe not available.
        <button onClick={onBack} className="mt-4 block mx-auto px-4 py-2 bg-slate-200 rounded-lg">
          {texts.back}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl shadow-slate-300/50 overflow-hidden border border-slate-200/80">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-full transition-colors duration-200 flex items-center space-x-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>{texts.back}</span>
          </button>
        </div>
        
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column (Image & Ingredients) */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="relative mb-6">
              <img src={food.imageUrl} alt={food.name.en} className="w-full h-64 object-cover rounded-lg shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
              <h2 className="absolute bottom-0 left-0 p-4 text-3xl font-bold text-white">
                {food.name[language]}
              </h2>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {texts.ingredients}
              </h3>
              <ul className="space-y-3 pl-2">
                {food.recipe.ingredients.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (Instructions) */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
              {texts.instructions}
            </h3>
            <ol className="space-y-6">
              {food.recipe.instructions.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-4 flex-shrink-0 bg-amber-500 text-slate-900 font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg">
                    {index + 1}
                  </span>
                  <p className="text-slate-700 pt-1.5">{step}</p>
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