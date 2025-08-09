/**
 * Image utility functions for handling fallbacks and optimizations
 */

// Default fallback image for when product images fail to load
export const DEFAULT_PRODUCT_IMAGE = '/vite.svg';

// Food category images from reliable sources
export const FOOD_IMAGES = {
  sandwich: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937a?w=400&h=300&fit=crop&auto=format',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format',
  pizza: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format',
  wrap: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop&auto=format',
  omelette: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop&auto=format',
  pasta: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop&auto=format',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&auto=format',
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&auto=format',
  tea: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format',
  juice: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop&auto=format',
  soda: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop&auto=format',
  cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format',
  icecream: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop&auto=format',
  biryani: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&auto=format',
  curry: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format',
  default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&auto=format'
};

/**
 * Get appropriate image URL based on food item name
 */
export const getImageForFoodItem = (itemName: string): string => {
  const name = itemName.toLowerCase();
  
  if (name.includes('sandwich')) return FOOD_IMAGES.sandwich;
  if (name.includes('burger')) return FOOD_IMAGES.burger;
  if (name.includes('pizza')) return FOOD_IMAGES.pizza;
  if (name.includes('wrap')) return FOOD_IMAGES.wrap;
  if (name.includes('omelette') || name.includes('egg')) return FOOD_IMAGES.omelette;
  if (name.includes('pasta') || name.includes('noodle')) return FOOD_IMAGES.pasta;
  if (name.includes('salad')) return FOOD_IMAGES.salad;
  if (name.includes('coffee')) return FOOD_IMAGES.coffee;
  if (name.includes('tea')) return FOOD_IMAGES.tea;
  if (name.includes('juice')) return FOOD_IMAGES.juice;
  if (name.includes('soda') || name.includes('cola')) return FOOD_IMAGES.soda;
  if (name.includes('cake') || name.includes('pastry')) return FOOD_IMAGES.cake;
  if (name.includes('ice') || name.includes('cream')) return FOOD_IMAGES.icecream;
  if (name.includes('biryani') || name.includes('rice')) return FOOD_IMAGES.biryani;
  if (name.includes('curry') || name.includes('dal')) return FOOD_IMAGES.curry;
  
  return FOOD_IMAGES.default;
};

/**
 * Handle image loading errors with fallback
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = event.currentTarget;
  if (img.src !== DEFAULT_PRODUCT_IMAGE) {
    img.src = DEFAULT_PRODUCT_IMAGE;
  }
};

/**
 * Get optimized image URL with lazy loading
 */
export const getOptimizedImageUrl = (originalUrl: string): string => {
  // If it's already an optimized Unsplash URL, return as is
  if (originalUrl.includes('images.unsplash.com')) {
    return originalUrl;
  }
  
  // If it's a placeholder or broken URL, return a default
  if (originalUrl.includes('source.unsplash.com') || originalUrl.includes('google.com') || !originalUrl.startsWith('http')) {
    return FOOD_IMAGES.default;
  }
  
  return originalUrl;
};
