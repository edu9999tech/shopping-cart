/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import type { CatalogItem } from '../modals/catalog'
import { calculateCartTotals, type CartItem } from '../utils/calculations'
import { ConfirmOrder } from './confirmOrder';

type CheckoutProps = {
    cartItems: CatalogItem[];
    onRemoveFromCart: (itemId: number) => void;
    onUpdateQuantity: (itemId: number, change: number) => void;
    onClearCart?: () => void;
};

const Checkout = ({ cartItems, onRemoveFromCart, onClearCart }: CheckoutProps) => {
    // Convert cartItems to CartItem with quantity
    const [itemsWithQuantity, setItemsWithQuantity] = useState<CartItem[]>(
        cartItems.map(item => ({ ...item, quantity: 1 }))
    );

    const [showOrderConfirmationDetails, setshowOrderConfirmationDetails] = useState(false)

    // Update quantity when cartItems prop changes
    React.useEffect(() => {
        setItemsWithQuantity(cartItems.map(item => ({ ...item, quantity: 1 })));
    }, [cartItems]);

    function updateQuantity(itemId: number, change: number) {
        setItemsWithQuantity(prev => {
            const itemIndex = prev.findIndex(item => item.id === itemId);
            if (itemIndex === -1) return prev;
            
            const updatedItems = [...prev];
            const newQuantity = updatedItems[itemIndex].quantity + change;
            
            if (newQuantity <= 0) {
                // Remove item when quantity reaches 0 or below
                updatedItems.splice(itemIndex, 1);
                // Also notify parent component
                onRemoveFromCart(itemId);
            } else {
                // Update quantity
                updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity: newQuantity };
            }
            
            return updatedItems;
        });
    }

    function orderConfiration(){
      setshowOrderConfirmationDetails(true)
    }

    function handleClose(){
        setshowOrderConfirmationDetails(false)
    }

    function handleConfirmOrder(){
        // Clear cart by removing all items
        itemsWithQuantity.forEach(item => {
            onRemoveFromCart(item.id);
        });
        // Also clear the local state
        setItemsWithQuantity([]);
        // Call the optional onClearCart callback if provided
        if (onClearCart) {
            onClearCart();
        }
    }

    // Calculate totals using utils
    const { subtotal, tax, total } = calculateCartTotals(itemsWithQuantity);

    return (
        <div className='w-2/5 h-full rounded-lg shadow-md m-1 flex flex-col'>
            <header className='flex items-center justify-center p-4 bg-slate-400 rounded-lg shadow-md'>
                <h1>Checkout</h1>
            </header>
            {
                itemsWithQuantity.length > 0 ? (
                    <div className='flex-1 flex flex-col'>
                        <div className='flex-1 flex flex-col gap-3 p-4 bg-slate-100 rounded-lg shadow-md overflow-y-auto'>
                            {itemsWithQuantity.map((item: CartItem, index: number) => (
                                <div key={`${item.id}-${index}`} className='bg-white rounded-lg shadow-md p-4 flex items-center gap-3'>
                                    <div className='flex-1'>
                                        <h3 className='font-semibold text-gray-800'>{item?.name}</h3>
                                        <p className='text-green-600 font-medium'>₹{item?.price}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button 
                                            className='w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold'
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            -
                                        </button>
                                        <span className='w-8 text-center font-semibold'>{item.quantity}</span>
                                        <button 
                                            className='w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white font-bold'
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='bg-white rounded-lg shadow-md p-4 m-4'>
                            <div className='space-y-2'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-gray-600'>Subtotal:</span>
                                    <span className='font-medium'>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-gray-600'>Tax (10%):</span>
                                    <span className='font-medium'>₹{tax.toFixed(2)}</span>
                                </div>
                                <div className='border-t pt-2'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-lg font-semibold'>Total:</span>
                                        <span className='text-xl font-bold text-green-600'>₹{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full' onClick={orderConfiration}>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex-1 flex items-center justify-center'>
                        <h2 className='text-lg font-bold text-center'>Add Items to Cart to Checkout 😊...</h2>
                    </div>
                )
            }
            
            {/* Order Confirmation Modal */}
            {showOrderConfirmationDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <ConfirmOrder 
                            onClose={handleClose}
                            onConfirmOrder={handleConfirmOrder}
                            orderDetails={{
                                items: itemsWithQuantity,
                                subtotal,
                                tax,
                                total
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Checkout