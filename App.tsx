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
        <div key="recipe-view" className="w-100 animate-slide-in-up">
          <RecipeView food={currentFood} language={language} onBack={handleBack} />
        </div>
      );
    }

    const mainContent = isLoading ? (
      <div key="loading" className="text-center animate-fade-in-slow">
        <LoadingSpinner />
        <p className="mt-3 fs-5 fw-semibold text-warning-emphasis">{texts.loadingDish}</p>
      </div>
    ) : currentFood ? (
      <div key="food-card" className="w-100 animate-slide-in-up">
        <FoodCard 
          food={currentFood} 
          language={language} 
          onViewRecipe={handleViewRecipe} 
          isRecipeLoading={isRecipeLoading}
        />
      </div>
    ) : (
      <div key="welcome" className="text-center text-secondary p-5 fs-5 animate-fade-in-slow">
        <p>{texts.welcome}</p>
      </div>
    );
    
    return <div className="d-flex align-items-center justify-content-center w-100">{mainContent}</div>;
  };

  return (
    <div className="min-vh-100 d-flex flex-column p-3 p-md-4">
      <div className="container-xl mx-auto d-flex flex-column flex-grow-1">
        <header className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="fw-bolder fs-2">
            {texts.title}
          </h1>
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </header>

        <main className="w-100 flex-grow-1 d-flex flex-column align-items-center">
          <div className="w-100 d-flex flex-column align-items-center gap-4 mb-5" style={{maxWidth: '512px'}}>
            <MealTypeSwitcher 
              language={language}
              mealType={mealType}
              setMealType={setMealType}
              disabled={isLoading || isRecipeLoading}
            />
            <button
              onClick={handleFindDish}
              disabled={isLoading || isRecipeLoading}
              className="btn btn-warning btn-lg text-dark fw-bold rounded-pill px-5 py-3 fs-5 shadow-sm"
            >
              {texts.buttonText}
            </button>
          </div>
          
          {error && (
            <div className="alert alert-danger w-100 animate-fade-in-slow" role="alert" style={{maxWidth: '768px'}}>
              {error}
            </div>
          )}

          <div className="w-100 flex-grow-1 d-flex align-items-start justify-content-center">
            {renderContent()}
          </div>
        </main>

        <footer className="w-100 text-center text-muted small mt-auto pt-5">
          <p>Powered by Local Data</p>
        </footer>
      </div>
    </div>
  );
};

export default App;