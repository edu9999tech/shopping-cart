import type { CatalogItem } from '../modals/catalog';

/**
 * Filters catalog items based on search query
 * @param items - Array of catalog items to search
 * @param query - Search query string
 * @returns Filtered array of items
 */
export const filterItemsBySearch = (items: CatalogItem[], query: string): CatalogItem[] => {
    if (!query.trim()) {
        return items; // Return all items if query is empty
    }
    
    const searchTerm = query.toLowerCase();
    return items.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.category?.toLowerCase().includes(searchTerm)
    );
};

/**
 * Filters items by category
 * @param items - Array of catalog items
 * @param category - Category to filter by
 * @returns Filtered array of items
 */
export const filterItemsByCategory = (items: CatalogItem[], category: string): CatalogItem[] => {
    if (!category || category === 'all') {
        return items;
    }
    return items.filter(item => item.category === category);
};

/**
 * Filters items by availability
 * @param items - Array of catalog items
 * @param availableOnly - Whether to show only available items
 * @returns Filtered array of items
 */
export const filterItemsByAvailability = (items: CatalogItem[], availableOnly: boolean = true): CatalogItem[] => {
    if (!availableOnly) {
        return items;
    }
    return items.filter(item => item.isAvailable);
};

/**
 * Sorts items by various criteria
 * @param items - Array of catalog items
 * @param sortBy - Sort criteria ('name', 'price', 'price-desc')
 * @returns Sorted array of items
 */
export const sortItems = (items: CatalogItem[], sortBy: string): CatalogItem[] => {
    const sortedItems = [...items];
    
    switch (sortBy) {
        case 'name':
            return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        case 'price':
            return sortedItems.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sortedItems.sort((a, b) => b.price - a.price);
        default:
            return sortedItems;
    }
};

/**
 * Performs advanced search with multiple filters
 * @param items - Array of catalog items
 * @param options - Search options
 * @returns Filtered and sorted array of items
 */
export const advancedSearch = (
    items: CatalogItem[],
    options: {
        query?: string;
        category?: string;
        availableOnly?: boolean;
        sortBy?: string;
        minPrice?: number;
        maxPrice?: number;
    }
): CatalogItem[] => {
    let filteredItems = [...items];
    
    // Apply search query filter
    if (options.query) {
        filteredItems = filterItemsBySearch(filteredItems, options.query);
    }
    
    // Apply category filter
    if (options.category) {
        filteredItems = filterItemsByCategory(filteredItems, options.category);
    }
    
    // Apply availability filter
    if (options.availableOnly !== undefined) {
        filteredItems = filterItemsByAvailability(filteredItems, options.availableOnly);
    }
    
    // Apply price range filter
    if (options.minPrice !== undefined) {
        filteredItems = filteredItems.filter(item => item.price >= options.minPrice!);
    }
    if (options.maxPrice !== undefined) {
        filteredItems = filteredItems.filter(item => item.price <= options.maxPrice!);
    }
    
    // Apply sorting
    if (options.sortBy) {
        filteredItems = sortItems(filteredItems, options.sortBy);
    }
    
    return filteredItems;
}; 