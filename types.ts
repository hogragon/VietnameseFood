export enum Language {
  EN = 'en',
  VI = 'vi',
}

export enum View {
  MAIN = 'main',
  RECIPE = 'recipe',
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface FoodName {
  en: string;
  vi: string;
}

export interface Recipe {
  ingredients: string[];
  instructions: string[];
}

export interface Food {
  name: FoodName;
  imageUrl: string;
  recipe?: Recipe;
}
