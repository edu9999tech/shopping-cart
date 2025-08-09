import React, { useState, useEffect } from 'react'
import type { CatalogItem } from '../modals/catalog';

import Feedback from './Feedback';
import { handleImageError } from '../utils/imageUtils';

type CatalogProps = {
    items: CatalogItem[];
    onAddToCart: (item: CatalogItem) => void;
};

const Catalog = ({ items: initialItems ,onAddToCart}: CatalogProps) => {
    const [items, setItems] = useState(initialItems);
    const [showVegOnly, setShowVegOnly] = useState(false);
      const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    // Update items when initialItems prop changes (for search functionality)
    useEffect(() => {
        if (showVegOnly) {
            const vegItems = initialItems.filter(item => item.itemType === 'veg');
            setItems(vegItems);
        } else {
            setItems(initialItems);
        }
    }, [initialItems, showVegOnly]);

    const toggleVegFilter = () => {
        setShowVegOnly(!showVegOnly);
    };
    function addToCart(ol:CatalogItem){
        onAddToCart(ol)
    }

    return (
        <div className='w-3/5 rounded-lg shadow-md m-1 flex flex-col h-full'>
            <header className='flex items-center justify-between p-4 bg-slate-400 rounded-lg shadow-md'>
                <div>
                    <h1 className='text-white font-bold text-xl'>Catalog</h1>
                    <p className='text-gray-200 text-sm'>
                        {items.length} item{items.length !== 1 ? 's' : ''} 
                        {showVegOnly ? ' (Veg only)' : ''}
                    </p>
                </div>
                
                {/* Animated Toggle Switch */}
                <div className='flex items-center space-x-3'>
                    <span className={`text-sm font-medium transition-colors duration-300 ${!showVegOnly ? 'text-white' : 'text-gray-300'}`}>
                        All Items
                    </span>
                    <button
                        onClick={toggleVegFilter}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                            showVegOnly ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out ${
                                showVegOnly ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                    <span className={`text-sm font-medium transition-colors duration-300 ${showVegOnly ? 'text-white' : 'text-gray-300'}`}>
                        🌱 Veg Only
                    </span>
                </div>

                <button className='bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 shadow-md' onClick={()=>handleClickOpen()}> 
                    💬 Feedback 
                </button>
                <Feedback
                   open={open}
                    onClose={handleClose}
                />

            </header>
            <div className='flex-1 overflow-y-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
                    {items.map((ol) => (
                        <div key={ol.id} className='flex flex-col items-center justify-start h-64 bg-white rounded-lg shadow p-2'>
                            <img 
                                src={ol?.imageURI} 
                                className='h-1/2 w-full object-cover mb-2 rounded-lg' 
                                alt={ol?.name}
                                onError={handleImageError}
                                loading="lazy"
                            />
                            <h2 className='text-lg font-bold mb-1'>{ol?.name}</h2>
                            <p className='text-base font-semibold text-green-700 mb-1 rounded'>₹{ol?.price}</p>

                            {ol?.isAvailable ? (
                                <button
                                    className='bg-green-400 hover:bg-green-500 rounded-md p-1 disabled:text-gray-500'
                                    onClick={()=>addToCart(ol)}
                                >
                                    Add to cart 🛒
                                </button>
                            ) : (
                                <strong className='bg-red-400 rounded-md p-1'>Out of stock</strong>
                            )}
                        </div>

                    ))}
                </div>
            </div>

        </div>
    );
}

export default Catalog