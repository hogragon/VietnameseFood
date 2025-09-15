import { VIETNAMESE_FOOD_LIST } from './foodList';

const IMAGE_MAP: Record<string, string> = {};

// Use a placeholder service to generate a unique, visually distinct image URL for each dish.
// The dimensions (1280x720) match the 16:9 aspect ratio previously used for generated images.
VIETNAMESE_FOOD_LIST.forEach(food => {
  const encodedName = encodeURIComponent(food.en);
  IMAGE_MAP[food.en] = `https://placehold.co/1280x720/1e293b/f59e0b/png?text=${encodedName}`;
});

export const VIETNAMESE_FOOD_IMAGES = IMAGE_MAP;

export const DEFAULT_IMAGE_URL = 'https://placehold.co/1280x720/1e293b/f59e0b/png?text=Image+Not+Found';
