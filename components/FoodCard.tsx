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
    <div className="card shadow-sm border-0 rounded-4 mx-auto" style={{ maxWidth: '42rem' }}>
      <div className="position-relative">
        <img 
          src={food.imageUrl} 
          alt={food.name.en} 
          className="card-img-top rounded-top-4"
          style={{ height: '20rem', objectFit: 'cover' }}
        />
        <div 
          className="card-img-overlay d-flex flex-column justify-content-end p-4 p-md-5"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
        >
          <h2 className="card-title text-white fw-bolder fs-1">
            {food.name[language]}
          </h2>
        </div>
      </div>
      <div className="card-body p-4 text-center">
        <button
          onClick={onViewRecipe}
          disabled={isRecipeLoading}
          className="btn btn-warning rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center justify-content-center gap-2"
        >
          {isRecipeLoading && <LoadingSpinner size="sm" />}
          <span className="fs-5">{isRecipeLoading ? texts.loadingRecipe : texts.viewRecipe}</span>
        </button>
      </div>
    </div>
  );
};

export default FoodCard;