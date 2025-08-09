export interface OrderDetails {
    items: Array<{
        name: string;
        price: number;
        quantity: number;
    }>;
    subtotal: number;
    tax: number;
    total: number;
}

export interface OrderReceipt {
    orderId: string;
    date: string;
    time: string;
    paymentMethod: string;
    orderDetails: OrderDetails;
}

/**
 * Generates a unique order ID with timestamp and random number
 * @returns Unique order ID string
 */
export const generateOrderId = (): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
};

/**
 * Creates order receipt data
 * @param paymentMethod - Selected payment method
 * @param orderDetails - Order details including items and totals
 * @returns OrderReceipt object
 */
export const createOrderReceipt = (
    paymentMethod: string,
    orderDetails: OrderDetails
): OrderReceipt => {
    return {
        orderId: generateOrderId(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        paymentMethod,
        orderDetails
    };
};

/**
 * Formats currency amount with proper symbol
 * @param amount - Amount to format
 * @param currency - Currency symbol (default: ₹)
 * @returns Formatted currency string
 */
export const formatOrderCurrency = (amount: number, currency: string = '₹'): string => {
    return `${currency}${amount.toFixed(2)}`;
};

/**
 * Validates if order can be confirmed
 * @param items - Array of cart items
 * @param selectedPayment - Selected payment method
 * @returns Boolean indicating if order can be confirmed
 */
export const canConfirmOrder = (items: Array<{ name: string; price: number; quantity: number }>, selectedPayment: string): boolean => {
    return items.length > 0 && selectedPayment.length > 0;
}; 