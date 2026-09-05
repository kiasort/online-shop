<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'
import AppButton from '../components/common/AppButton.vue'
import PriceDisplay from '../components/common/PriceDisplay.vue'
import CartItem from '../components/cart/CartItem.vue'
const cartStore = useCartStore()
const router = useRouter()
// cartStore.[items, total, itemCount, removeFromCart, updateQuantity ]

const shippingCost = computed(() => {
  return cartStore.total > 0 ? 1000 : 0
})

const goToCheckout = () => {
  router.push({ name: 'Checkout' })
}

const goToCatalog = () => {
  router.push({ name: 'Catalog' })
}

onMounted(() => {
  cartStore.fetchCartItems()
})
</script>

<template>
  <section class="cart-view">
    <h1>Корзина</h1>

    <div class="main-content" v-if="cartStore.items.length > 0">
      <div class="main-content__list">
        <CartItem v-for="cart in cartStore.items" :key="cart.id" :item="cart" />

      </div>

      <aside class="main-content__summary">
        <div class="summary-card">
          <h3>Итого</h3>
          <div class="summary__subtotal">
            <PriceDisplay :price="cartStore.total" currency="RUB" :old-price="null" size="sm" />
          </div>
          <div class ="summary__shipping">
            <PriceDisplay :price="shippingCost" currency="RUB" :old-price="null" size="sm" />
          </div>
          <div class="summary__total">
            <PriceDisplay :price="cartStore.total + shippingCost" currency="RUB" :old-price="null" size="lg" />
          </div>
          <AppButton @click="goToCheckout">Оформить заказ</AppButton>
        </div>
      </aside>
      <AppButton @click="goToCatalog">Продолжить покупки</AppButton>
    </div>
    <div v-else class="empty-cart">
      <p>Ваша корзина пуста</p>
      <AppButton @click="goToCatalog">Перейти к каталогу</AppButton>
    </div>
  </section>
</template>

<style lang="css" scoped>
</style>
