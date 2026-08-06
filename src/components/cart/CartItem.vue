<script setup lang="ts">
import type { CartItem } from '../../types/cart'
import PriceDisplay from '../common/PriceDisplay.vue'
import AppButton from '../common/AppButton.vue'
import { computed } from 'vue'
interface Props {
    item: CartItem       
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update-quantity': [id: string | undefined, quantity: number]
    'remove-item': [id: string | undefined]
}>()

const oldPrice = computed(()=>{
    return props.item.product.compareAtPrice ?? null
})
</script>

<template>
  <div class="cart-item">
    <div class="cart-item__image">
        <img :src="props.item.product.images[0]" alt="Product Image" />
    </div>
    <div class="cart-item__details">
        <h3 class="cart-item__name">{{ props.item.product.name }}</h3>
        <PriceDisplay 
                :price="props.item.product.price" 
                :old-price="oldPrice"
                currency="₽" 
                size="sm"
        />
    </div>
    <div class="cart-item__controls">
        <AppButton
            variant="secondary"
            size="sm"
            @click="emit('update-quantity', props.item.id, props.item.quantity - 1)"
            :disabled="props.item.quantity <= 1"
        >
            -
        </AppButton>
        <span class="cart-item__quantity">{{ props.item.quantity }}</span>
        <AppButton
            variant="secondary"
            size="sm"
            @click="emit('update-quantity', props.item.id, props.item.quantity + 1)"
        >
            +
        </AppButton>
        <AppButton
            variant="danger"
            size="sm"
            @click="emit('remove-item', props.item.id)"
        >
            Удалить
        </AppButton>
    </div>
  </div>
</template>

<style scoped lang="css">

.cart-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    transition: box-shadow 0.2s ease;
}

.cart-item:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}


.cart-item__image {
    flex-shrink: 0;             
    width: 80px;
    height: 80px;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: #f3f4f6;
}

.cart-item__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


.cart-item__details {
    flex: 1;                     
    min-width: 0;                
}

.cart-item__name {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    
    /* Обрезаем длинные названия */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


.cart-item__controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;             
}

.cart-item__quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
    padding: 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    color: #374151;
    background-color: #f9fafb;
    border-radius: 0.375rem;
}

@media (max-width: 640px) {
    .cart-item {
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .cart-item__image {
        width: 60px;
        height: 60px;
    }

    .cart-item__details {
        flex: 1 1 calc(100% - 76px);
    }

    .cart-item__controls {
        flex: 1 1 100%;
        justify-content: space-between;
        padding-top: 0.5rem;
        border-top: 1px solid #e5e7eb;
    }
}
</style>
