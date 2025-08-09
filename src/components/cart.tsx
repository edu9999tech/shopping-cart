import React, { useState } from 'react'
import Catalog from './catalog'
import Checkout from './checkout'
import {catalogMockData} from '../mockData/catalogMockData'
import type { CatalogItem } from '../modals/catalog'
import { addItemToCart, removeItemFromCart, convertToCartItems } from '../utils/cartUtils'

type CartProps = {
    catalogItems?: CatalogItem[];
}

export const Cart = ({ catalogItems = catalogMockData }: CartProps) => {

    const [cartItems, setCartItems] = useState<CatalogItem[]>([]);

    function handleAddToCart(item: CatalogItem) {
        setCartItems(prev => addItemToCart(prev, item));
    }

    function handleRemoveFromCart(itemId: number) {
        setCartItems(prev => removeItemFromCart(prev, itemId));
    }

    function handleUpdateQuantity(itemId: number, change: number) {
        setCartItems(prev => {
            const cartItemsWithQuantity = convertToCartItems(prev);
            const updatedItems = cartItemsWithQuantity.map(item => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity <= 0) {
                        return null; // Remove item
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(Boolean) as CatalogItem[];
            
            return updatedItems;
        });
    }

    function handleClearCart() {
        setCartItems([]);
    }

    return (
        <div className='flex flex-col gap-1.5 md:flex-row w-full h-[78vh] overflow-auto'>
            <Catalog items={catalogMockData} onAddToCart={handleAddToCart}/>
            <Checkout 
                cartItems={cartItems} 
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onClearCart={handleClearCart}
            />
        </div>
    )
}