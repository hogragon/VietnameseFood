import React, { useState, useCallback } from 'react';
import { Language, Food, View, MealType } from './types';
import { UI_TEXT } from './constants';
import * as geminiService from './services/geminiService';
import LanguageSwitcher from './components/LanguageSwitcher';
import LoadingSpinner from './components/LoadingSpinner';
import FoodCard from './components/FoodCard';
import RecipeView from './components/RecipeView';
import MealTypeSwitcher from './components/MealTypeSwitcher';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [currentFood, setCurrentFood] = useState<Food | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecipeLoading, setIsRecipeLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>(View.MAIN);

  const texts = UI_TEXT[language];

  const handleFindDish = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCurrentFood(null);
    setView(View.MAIN);

    try {
      const foodName = await geminiService.getRandomVietnameseDish(mealType);
      const imageUrl = await geminiService.generateFoodImage(foodName.en);
      setCurrentFood({ name: foodName, imageUrl });
    } catch (err) {
      console.error(err);
      setError(texts.error);
    } finally {
      setIsLoading(false);
    }
  }, [texts.error, mealType]);

  const handleViewRecipe = useCallback(async () => {
    if (!currentFood) return;

    if (currentFood.recipe) {
      setView(View.RECIPE);
      return;
    }

    setIsRecipeLoading(true);
    setError(null);
    try {
      const recipe = await geminiService.getFoodRecipe(currentFood.name[language], language);
      setCurrentFood(prevFood => prevFood ? { ...prevFood, recipe } : null);
      setView(View.RECIPE);
    } catch (err) {
      console.error(err);
      setError(texts.error);
    } finally {
      setIsRecipeLoading(false);
    }
  }, [currentFood, language, texts.error]);

  const handleBack = () => {
    setView(View.MAIN);
  };

  const renderContent = () => {
    if (view === View.RECIPE && currentFood) {
      return <RecipeView food={currentFood} language={language} onBack={handleBack} />;
    }

    return (
      <div className="flex flex-col items-center justify-center w-full">
        {isLoading ? (
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-amber-300">{texts.loadingDish}</p>
          </div>
        ) : currentFood ? (
          <FoodCard 
            food={currentFood} 
            language={language} 
            onViewRecipe={handleViewRecipe} 
            isRecipeLoading={isRecipeLoading}
          />
        ) : (
          <div className="text-center text-slate-400 text-xl p-8 border-2 border-dashed border-slate-700 rounded-lg">
            <p>{texts.welcome}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <header className="w-full flex justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 tracking-tight">
            {texts.title}
          </h1>
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </header>

        <div className="w-full flex justify-center mb-6">
          <MealTypeSwitcher 
            language={language}
            mealType={mealType}
            setMealType={setMealType}
            disabled={isLoading || isRecipeLoading}
          />
        </div>
        
        <div className="w-full flex justify-center mb-8">
          <button
            onClick={handleFindDish}
            disabled={isLoading || isRecipeLoading}
            className="px-8 py-4 bg-amber-500 text-slate-900 font-bold text-lg rounded-full shadow-lg hover:bg-amber-400 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            {texts.buttonText}
          </button>
        </div>
        
        {error && (
          <div className="w-full bg-red-800/50 text-red-300 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <div className="w-full flex-grow flex items-start justify-center">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
