/**
 * Common CSS classes for consistent styling
 */
export const UI_CLASSES = {
    // Button styles
    BUTTON: {
        PRIMARY: 'bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200',
        SECONDARY: 'bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200',
        DISABLED: 'bg-gray-300 text-gray-500 cursor-not-allowed font-bold py-2 px-4 rounded-lg',
        SMALL: 'bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm',
        ICON: 'w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold'
    },
    
    // Card styles
    CARD: {
        DEFAULT: 'bg-white rounded-lg shadow-md p-4',
        HOVER: 'bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200',
        SELECTED: 'bg-green-50 border-2 border-green-500 rounded-lg p-4'
    },
    
    // Layout styles
    LAYOUT: {
        CONTAINER: 'max-w-md mx-auto',
        MODAL: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
        MODAL_CONTENT: 'bg-white rounded-lg p-6 max-w-md w-full mx-4'
    },
    
    // Text styles
    TEXT: {
        HEADING: 'text-2xl font-bold text-gray-800 mb-6 text-center',
        SUBHEADING: 'text-lg font-semibold text-gray-700 mb-4',
        BODY: 'text-gray-600',
        PRICE: 'text-green-600 font-medium',
        TOTAL: 'text-xl font-bold text-green-600'
    }
};

/**
 * Generates a unique key for React components
 * @param prefix - Prefix for the key
 * @param id - Unique identifier
 * @returns Unique key string
 */
export const generateKey = (prefix: string, id: number | string): string => {
    return `${prefix}-${id}`;
};

/**
 * Formats a number as currency
 * @param amount - Amount to format
 * @param currency - Currency symbol
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = '₹'): string => {
    return `${currency}${amount.toFixed(2)}`;
};

/**
 * Truncates text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

/**
 * Validates email format
 * @param email - Email to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates phone number format
 * @param phone - Phone number to validate
 * @returns Boolean indicating if phone is valid
 */
export const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}; 