import { GoogleGenAI, Type } from "@google/genai";
import type { FoodName, Recipe, MealType } from '../types';
import { VIETNAMESE_FOOD_LIST } from '../data/foodList';
import { VIETNAMESE_FOOD_IMAGES, DEFAULT_IMAGE_URL } from '../data/imageList';

// The API key is now expected to be set in index.html via a script tag.
// The check is removed to allow the app to load and show a graceful error
// in the UI if the key is missing, rather than crashing on start.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export const getFoodRecipe = async (dishName: string, language: string): Promise<Recipe> => {
  const promptLanguage = language === 'en' ? 'English' : 'Vietnamese';
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide a detailed recipe for how to cook ${dishName}. The recipe should include a list of ingredients and step-by-step cooking instructions. Format the response as a JSON object with two keys: "ingredients" (an array of strings) and "instructions" (an array of strings). Respond in ${promptLanguage}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ingredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of ingredients for the recipe."
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Step-by-step cooking instructions."
            },
          },
          required: ["ingredients", "instructions"],
        },
      },
    });
    const jsonString = response.text;
    return JSON.parse(jsonString) as Recipe;
  } catch (error) {
    console.error("Error fetching food recipe:", error);
    throw new Error("Failed to fetch the recipe from the API.");
  }
};