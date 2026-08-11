<script setup lang="ts">
import type { CartItem as CartItemType } from '../../types/cart'
import { computed } from 'vue'
import AppButton from '../common/AppButton.vue'
import CartItem from './CartItem.vue'
import PriceDisplay from '../common/PriceDisplay.vue'
import AppSpinner from '../common/AppSpinner.vue'

const props = withDefaults(defineProps<{
    modelValue: boolean
    items: CartItemType[]
    loading?: boolean           
}>(), {
    modelValue: false,
    items: () => [],
    loading: false              
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    'update-quantity': [id: string | undefined, quantity: number]
    'remove-item': [id: string | undefined]
    'checkout': []
    'clear-cart': []
}>()

const close = () => {
    emit('update:modelValue', false)
}

const total = computed(() => {
    return props.items.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity)
    }, 0)
})
</script>

<template>
    <Transition name="drawer">
        <div 
            class="cart-drawer__overlay" 
            v-if="props.modelValue" 
            @click="close"
        >
            <div class="cart-drawer__panel" @click.stop>
                
                <header class="cart-drawer__header">
                    <h2 class="cart-drawer__title">Корзина</h2>
                    <button class="cart-drawer__close" @click="close">×</button>
                </header>

                <main class="cart-drawer__body">
                    <template v-if="props.items.length > 0">
                        <CartItem
                            v-for="item in props.items"
                            :key="item.product.id"
                            :item="item"
                            @update-quantity="(id, qty) => emit('update-quantity', id, qty)"
                            @remove-item="(id) => emit('remove-item', id)"
                        />
                    </template>

                    <div v-else class="cart-drawer__empty">
                        <p>Корзина пуста</p>
                    </div>

                    <div v-if="props.loading" class="cart-drawer__loading">
                        <AppSpinner size="md" color="#3b82f6" />
                    </div>
                </main>

                <footer class="cart-drawer__footer">
                    <div class="cart-drawer__total">
                        <span>Итого:</span>
                        <PriceDisplay :price="total" currency="₽" size="lg" />
                    </div>

                    <AppButton 
                    variant="primary" 
                    block
                    @click="emit('checkout')"
                    >Оформить заказ
                    </AppButton>

                    <AppButton 
                    variant="ghost" 
                    size="sm"
                    @click="emit('clear-cart')"
                    >Очистить корзину
                    </AppButton>

                </footer>

            </div>
        </div>
    </Transition>
</template>


<style scoped lang="css">
.cart-drawer__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.cart-drawer__panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 420px;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
}

.cart-drawer__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
}

.cart-drawer__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
}

.cart-drawer__close {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    border-radius: 0.375rem;
}

.cart-drawer__close:hover {
    background-color: #f3f4f6;
    color: #111827;
}

.cart-drawer__body {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.cart-drawer__empty {
    text-align: center;
    padding: 3rem 1rem;
    color: #6b7280;
}

.cart-drawer__loading {
    text-align: center;
    padding: 2rem;
}

.cart-drawer__footer {
    padding: 1rem 1.5rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    background-color: #f9fafb;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.cart-drawer__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
}

.drawer-enter-active,
.drawer-leave-active {
    transition: opacity 0.3s ease;
}

.drawer-enter-active .cart-drawer__panel,
.drawer-leave-active .cart-drawer__panel {
    transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
    opacity: 0;
}

.drawer-enter-from .cart-drawer__panel {
    transform: translateX(100%);
}

.drawer-leave-to .cart-drawer__panel {
    transform: translateX(100%);
}
</style>
