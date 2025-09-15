import type { FoodName, Recipe, MealType } from '../types';
import { VIETNAMESE_FOOD_LIST } from '../data/foodList';
import { VIETNAMESE_FOOD_IMAGES, DEFAULT_IMAGE_URL } from '../data/imageList';
import { VIETNAMESE_RECIPES } from '../data/recipeList'; // Import local recipes

// The Gemini API client has been removed as this app now runs fully offline.
// All data, including recipes, is sourced from local files.

export const getRandomVietnameseDish = async (mealType: MealType): Promise<FoodName> => {
  try {
    const suitableDishes = VIETNAMESE_FOOD_LIST.filter(dish => dish.mealTypes.includes(mealType));
    
    // If no specific dishes are found for the meal type, fall back to the entire list
    const listToUse = suitableDishes.length > 0 ? suitableDishes : VIETNAMESE_FOOD_LIST;
    
    const randomIndex = Math.floor(Math.random() * listToUse.length);
    const selectedDish = listToUse[randomIndex];

    // The function is async to maintain consistency with other service calls
    return Promise.resolve({
      en: selectedDish.en,
      vi: selectedDish.vi,
    });
  } catch (error) {
     console.error("Error selecting a random Vietnamese dish from the local list:", error);
     throw new Error("Failed to select a random dish.");
  }
};

export const generateFoodImage = async (dishNameInEnglish: string): Promise<string> => {
  try {
    const imageUrl = VIETNAMESE_FOOD_IMAGES[dishNameInEnglish] || DEFAULT_IMAGE_URL;
    // The function is async to maintain consistency with other service calls
    return Promise.resolve(imageUrl);
  } catch (error) {
    console.error("Error retrieving food image from the local list:", error);
    throw new Error("Failed to retrieve an image.");
  }
};

// This function now retrieves recipes from a local data file instead of the Gemini API.
export const getFoodRecipe = async (dishNameInEnglish: string, language: string): Promise<Recipe> => {
  try {
    const recipeData = VIETNAMESE_RECIPES[dishNameInEnglish];

    if (recipeData && recipeData[language as keyof typeof recipeData]) {
      return Promise.resolve(recipeData[language as keyof typeof recipeData]);
    } else {
      // If no local recipe is found, return a placeholder.
      console.warn(`No local recipe found for "${dishNameInEnglish}".`);
      const fallbackRecipe: Recipe = {
          ingredients: ["No local recipe available for this dish."],
          instructions: ["Please try another dish to see a sample recipe."]
      };
      return Promise.resolve(fallbackRecipe);
    }
  } catch (error) {
    console.error("Error fetching food recipe from local data:", error);
    throw new Error("Failed to fetch the recipe from the local data.");
  }
};
