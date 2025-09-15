import { GoogleGenAI, Type } from "@google/genai";
import type { FoodName, Recipe, MealType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRandomVietnameseDish = async (mealType: MealType): Promise<FoodName> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Give me the name of one random, popular, and authentic Vietnamese dish suitable for ${mealType}. Provide the name in both English and Vietnamese, in a JSON format. Only return the JSON object, nothing else.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            en: { type: Type.STRING, description: "The English name of the dish." },
            vi: { type: Type.STRING, description: "The Vietnamese name of the dish." },
          },
          required: ["en", "vi"],
        },
      },
    });
    const jsonString = response.text;
    return JSON.parse(jsonString) as FoodName;
  } catch (error) {
    console.error("Error fetching random Vietnamese dish:", error);
    throw new Error("Failed to fetch a random dish name from the API.");
  }
};

export const generateFoodImage = async (dishNameInEnglish: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `A vibrant, high-quality, photorealistic image of Vietnamese food "${dishNameInEnglish}", beautifully plated and ready to eat, on a clean, slightly rustic table setting.`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    throw new Error("No image was generated.");
  } catch (error) {
    console.error("Error generating food image:", error);
    throw new Error("Failed to generate an image from the API.");
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
