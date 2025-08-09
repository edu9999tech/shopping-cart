import type { CatalogItem } from '../modals/catalog';

export type CartItem = CatalogItem & {
    quantity: number;
};

export interface CartCalculations {
    subtotal: number;
    tax: number;
    total: number;
}

export const calculateCartTotals = (items: CartItem[]): CartCalculations => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = 0.10; // 10% tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return {
        subtotal,
        tax,
        total
    };
}; 