import type { CartItem } from "./cart"

export interface OrderFormData {
    
    firstName: string,
    lastName: string,
    email: string,
    phone: string
    
    
    deliveryMethod: 'pickup' | 'courier' | 'post',
    city: string,
    street: string,
    apartment?: string,
    zipCode?: string
    

    comment?: string, 
    
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
    id: string,
    items: CartItem[],
    subtotal: number,
    deliveryCost: number,
    total: number,
    status: OrderStatus,
    createdAt: string,
    updatedAt?: string
}

export interface ValidationRule {
    required: boolean,
    minLength?: number,
    maxLength?: number,
    pattern?: RegExp,
    message: string
}

export type OrderValidationSchema = {
    firstName: ValidationRule[]
    lastName: ValidationRule[]
    email: ValidationRule[]
    phone: ValidationRule[]
    city: ValidationRule[],
    street: ValidationRule[]
}