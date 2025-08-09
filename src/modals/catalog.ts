export interface CatalogItem {
    id: number;
    name: string;
    price: number;
    imageURI: string;
    description: string;
    category: string; // breakfast or Meal
    brand: string;
    stock: number;
    isAvailable: boolean;
    isFeatured: boolean;
    isNew: boolean;
    itemType: string; // veg or non-veg
}

export interface checkoutItems{
    id: number;
    name: string;
    price: number;
    Quantity:number
}

