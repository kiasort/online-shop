import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CartItem, CartState, AddToCartPayload } from "@/types";
import * as cartApi from  '../api/cart'



export const useCartStore = defineStore('cart', ()=>{
    const items = ref<CartItem[]>([])
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)

    //GETTERS

    const itemCount = computed(() => {
        return items.value.reduce((acc, item)=>{
            return acc+item.quantity
        }, 0)
    })

    const total = computed(()=>{
        return items.value.reduce((acc,item)=>{
            return acc + item.product.price*item.quantity
        }, 0)
    })

    //ACTIONS

    async function fetchCartItems(): Promise<void> {
        loading.value = true
        error.value = null
        try{
            items.value = await cartApi.getCart()
        }catch(e){
            error.value = 'Не удалось загрузить в корзину' 
            console.error('Ошибка корзины', e)
        }finally{
            loading.value=false
        }
        
    }

    async function addToCart(payload: AddToCartPayload){
        loading.value = true
        error.value = null
        try{
            const itemToAdd = items.value.find(item=>item.product.id === payload.product.id)
            if (itemToAdd?.id){
                await  cartApi.updateCartItem(itemToAdd.id, {
                     product: itemToAdd.product,
                    quantity: itemToAdd.quantity + (payload.quantity || 1)
                })
            }else{
                await cartApi.addToCartApi({
                product: payload.product,
                quantity: payload.quantity || 1
            })
        }
        await fetchCartItems()
        }catch(e){
            error.value = 'Не удалось добавить в корзину'
            console.error('Ошибка добавления в корзину', e)
        }finally{
            loading.value = false
        }
        
   }

   async function removeFromCart (productId: string): Promise<void>{
        loading.value = true
        error.value = null
        try{
            const itemToDelete = items.value.find(item => item.product.id === productId)
            if (itemToDelete?.id){
                await cartApi.removeFromCartApi(itemToDelete.id)
            }
            await fetchCartItems()
        }catch(e){
            error.value = 'Не удалось удалить из корзины'
            console.error('Ошибка удаления из корзины', e)
        }finally{
            loading.value = false
        }
        
   }

   async function updateQuantity(productId: string, quantity: number){
        loading.value = true
        error.value = null    
        try{  
            const itemToUpdate = items.value.find(item => item.product.id===productId)
        if (itemToUpdate?.id){
            if (quantity > 0){
            await cartApi.updateCartItem(itemToUpdate.id, {
                product: itemToUpdate.product,
                quantity: quantity || 1
            })
            }else{
                await cartApi.removeFromCartApi(itemToUpdate.id)
            }
            await fetchCartItems()
            }
        }catch(e){
            error.value = 'Не удалось обновить количество'
            console.error('Ошибка обновления количества', e)
        }finally{
            loading.value = false
        }
   }

   async function clearCart(): Promise<void>{
        loading.value = true
        error.value = null
        try{
            
            await cartApi.clearCartApi()
            await fetchCartItems()
        }catch(e){
            error.value = 'Не удалось очистить корзину'
            console.error('Ошибка очистки корзины', e)
        }finally{
            loading.value = false
        }
   }

   return {
        items,
        itemCount,
        total,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    }

})