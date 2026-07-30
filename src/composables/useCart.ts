import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../utils/formatPrice'
import type { AddToCartPayload } from '../types'

export function useCart() {
    const store = useCartStore()

    const items = computed(() => store.items)
    const loading = computed(() => store.loading)
    const error = computed(() => store.error)
    const itemCount = computed(() => store.itemCount)
    const total = computed(() => store.total)

    function addToCart(payload: AddToCartPayload) {
        return store.addToCart(payload)
    }
    
    function removeFromCart(productId: string) {
        return store.removeFromCart(productId)
    }

    function updateQuantity(productId: string, quantity: number) {
        return store.updateQuantity(productId, quantity)
    }

    function clearCart() {
        return store.clearCart()
    }

    
    function isInCart(productId: string): boolean {
        return store.items.some(item => item.product.id ===productId)
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
        clearCart,
        
        isInCart,
        formatPrice
    }
}