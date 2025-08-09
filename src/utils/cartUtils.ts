import type { CatalogItem } from '../modals/catalog';
import type { CartItem } from './calculations';

/**
 * Converts CatalogItem array to CartItem array with default quantity
 * @param items - Array of catalog items
 * @returns Array of cart items with quantity
 */
export const convertToCartItems = (items: CatalogItem[]): CartItem[] => {
    return items.map(item => ({ ...item, quantity: 1 }));
};

/**
 * Updates quantity of a specific item in cart
 * @param items - Current cart items
 * @param itemId - ID of item to update
 * @param change - Quantity change (positive or negative)
 * @returns Updated cart items array
 */
export const updateItemQuantity = (
    items: CartItem[],
    itemId: number,
    change: number
): CartItem[] => {
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return items;
    
    const updatedItems = [...items];
    const newQuantity = updatedItems[itemIndex].quantity + change;
    
    if (newQuantity <= 0) {
        // Remove item when quantity reaches 0 or below
        updatedItems.splice(itemIndex, 1);
    } else {
        // Update quantity
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity: newQuantity };
    }
    
    return updatedItems;
};

/**
 * Removes an item from cart by ID
 * @param items - Current cart items
 * @param itemId - ID of item to remove
 * @returns Updated cart items array
 */
export const removeItemFromCart = (items: CatalogItem[], itemId: number): CatalogItem[] => {
    return items.filter(item => item.id !== itemId);
};

/**
 * Checks if an item already exists in cart
 * @param items - Current cart items
 * @param itemId - ID of item to check
 * @returns Boolean indicating if item exists
 */
export const isItemInCart = (items: CatalogItem[], itemId: number): boolean => {
    return items.some(item => item.id === itemId);
};

/**
 * Adds an item to cart (prevents duplicates)
 * @param items - Current cart items
 * @param newItem - Item to add
 * @returns Updated cart items array
 */
export const addItemToCart = (items: CatalogItem[], newItem: CatalogItem): CatalogItem[] => {
    if (isItemInCart(items, newItem.id)) {
        return items; // Item already exists, don't add duplicate
    }
    return [...items, newItem];
};

/**
 * Clears all items from cart
 * @returns Empty cart items array
 */
export const clearCart = (): CartItem[] => {
    return [];
};

/**
 * Gets total number of items in cart
 * @param items - Cart items
 * @returns Total quantity of all items
 */
export const getCartItemCount = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
}; 