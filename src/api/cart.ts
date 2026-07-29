import axiosInstance from "./axiosInstance";
import type { CartItem } from "@/types";

export async function getCart(): Promise<CartItem[]>{
    try{
        const response = await axiosInstance.get('/cart')
        return response.data
    }catch(e){
        console.error(e)
        throw e
    }
    
}

export async function addToCartApi(item: CartItem): Promise<CartItem>{
    try{
        const response = await axiosInstance.post('/cart', item)
        return response.data
    }catch(e){
        console.error(e)
        throw e
    }
}

export async function updateCartItem(id: string, item: CartItem): Promise<CartItem>{
    try{
        const response = await axiosInstance.put(`/cart/${id}`, item)
        return response.data
    }catch(e){
        console.error(e)
        throw e
    }
}

export async function removeFromCartApi(id: string): Promise<void> {
    try{
        const response = await axiosInstance.delete(`/cart/${id}`)
        return response.data
    }catch(e){
        console.error(e)
        throw e
    }
}

export async function clearCartApi(): Promise<void> {
    try{
        const currentCart = await getCart()
        for(const item of currentCart){
            await removeFromCartApi(item.id!)
        }
    }catch(e){
        console.error(e)
        throw e
    }
}