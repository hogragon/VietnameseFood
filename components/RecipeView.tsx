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
      <div className="text-center text-muted">
        Recipe not available.
        <button onClick={onBack} className="btn btn-secondary mt-3">
          {texts.back}
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 rounded-4 mx-auto" style={{ maxWidth: '64rem' }}>
      <div className="card-body p-4 p-lg-5">
        <div className="mb-4">
          <button
            onClick={onBack}
            className="btn btn-light rounded-pill d-inline-flex align-items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
            <span>{texts.back}</span>
          </button>
        </div>
        
        <div className="row g-4 g-lg-5">
          {/* Left Column (Image & Ingredients) */}
          <div className="col-lg-5">
            <div className="position-relative mb-4 shadow-lg rounded-3 overflow-hidden">
              <img 
                src={food.imageUrl} 
                alt={food.name.en} 
                className="img-fluid"
                style={{ height: '18rem', width: '100%', objectFit: 'cover' }}
              />
              <div 
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
              >
                <h2 className="text-white fw-bold fs-3">
                  {food.name[language]}
                </h2>
              </div>
            </div>
            
            <div>
              <h3 className="fw-bold fs-4 mb-3">
                {texts.ingredients}
              </h3>
              <ul className="list-unstyled d-flex flex-column gap-2">
                {food.recipe.ingredients.map((item, index) => (
                  <li key={index} className="d-flex align-items-start">
                    <span className="me-3 mt-2 flex-shrink-0" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffc107' }}></span>
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (Instructions) */}
          <div className="col-lg-7">
            <h3 className="fw-bold fs-4 mb-4 border-bottom pb-2">
              {texts.instructions}
            </h3>
            <ol className="list-unstyled d-flex flex-column gap-4">
              {food.recipe.instructions.map((step, index) => (
                <li key={index} className="d-flex align-items-start">
                  <span className="me-3 flex-shrink-0 bg-warning text-dark fw-bold rounded-circle d-flex align-items-center justify-content-center fs-5" style={{ width: '40px', height: '40px' }}>
                    {index + 1}
                  </span>
                  <p className="text-secondary mb-0 pt-1">{step}</p>
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