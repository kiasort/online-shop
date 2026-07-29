import type { Product } from "./product";

export interface CartItem {
    id?: string,
    product: Product,
    quantity: number
}

export interface CartState {
    items: CartItem[]
}

export interface AddToCartPayload {
    product: Product,
    quantity?: number
}