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
      // Pass the English name as a consistent key for the local recipe data
      const recipe = await geminiService.getFoodRecipe(currentFood.name.en, language);
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
    setError(null);
  };

  const renderContent = () => {
    if (view === View.RECIPE && currentFood) {
      return (
        <div key="recipe-view" className="w-full animate-slide-in-up">
          <RecipeView food={currentFood} language={language} onBack={handleBack} />
        </div>
      );
    }

    const mainContent = isLoading ? (
      <div key="loading" className="text-center animate-fade-in-slow">
        <LoadingSpinner />
        <p className="mt-4 text-lg font-semibold text-amber-600">{texts.loadingDish}</p>
      </div>
    ) : currentFood ? (
      <div key="food-card" className="w-full animate-slide-in-up">
        <FoodCard 
          food={currentFood} 
          language={language} 
          onViewRecipe={handleViewRecipe} 
          isRecipeLoading={isRecipeLoading}
        />
      </div>
    ) : (
      <div key="welcome" className="text-center text-slate-500 text-lg md:text-xl p-8 animate-fade-in-slow">
        <p>{texts.welcome}</p>
      </div>
    );
    
    return <div className="flex items-center justify-center w-full">{mainContent}</div>;
  };

  return (
    <div className="min-h-[100dvh] bg-slate-100 text-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col">
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-grow">
        <header className="w-full flex justify-between items-center mb-10 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {texts.title}
          </h1>
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </header>

        <main className="w-full flex-grow flex flex-col items-center">
          <div className="w-full max-w-lg mx-auto flex flex-col items-center space-y-10 mb-10 sm:mb-16">
            <MealTypeSwitcher 
              language={language}
              mealType={mealType}
              setMealType={setMealType}
              disabled={isLoading || isRecipeLoading}
            />
            <button
              onClick={handleFindDish}
              disabled={isLoading || isRecipeLoading}
              className="px-10 py-5 bg-amber-500 text-slate-900 font-bold text-xl rounded-full shadow-lg shadow-amber-500/30 transform transition-all duration-300 ease-in-out hover:bg-amber-400 hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/40 disabled:bg-slate-300 disabled:shadow-none disabled:text-slate-500 disabled:cursor-not-allowed disabled:scale-100"
            >
              {texts.buttonText}
            </button>
          </div>
          
          {error && (
            <div className="w-full max-w-3xl bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg mb-8 text-center animate-fade-in-slow">
              {error}
            </div>
          )}

          <div className="w-full flex-grow flex items-start justify-center">
            {renderContent()}
          </div>
        </main>

        <footer className="w-full text-center text-slate-500 text-sm mt-16">
          <p>Powered by Local Data</p>
        </footer>
      </div>
    </div>
  );
};

export default App;