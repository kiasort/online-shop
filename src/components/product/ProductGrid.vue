<script setup lang="ts">
import type { Product } from '../../types/product'
import AppSpinner from '../common/AppSpinner.vue'
import ProductCard from './ProductCard.vue'
interface Props {
  products: Product[]
  loading?: boolean
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  columns: 4,
})

const emit = defineEmits<{
  'add-to-cart': [product: Product]
}>()
</script>

<template>
  <div class="product-grid" :style="{ '--columns': props.columns }">
    <template v-if="props.products.length > 0">
      <ProductCard
        v-for="product in props.products"
        :key="product.id"
        :product="product"
        :loading="props.loading"
        @add-to-cart="(p) => emit('add-to-cart', p)"
      />
    </template>

    <template v-else-if="props.loading">
      <div v-for="i in 8" :key="`skeleton-${i}`" class="product-grid__skeleton">
        <AppSpinner size="lg" color="#e5e7eb" />
      </div>
    </template>

    <div v-else class="product-grid__empty">
      <p>Товары не найдены</p>
    </div>
  </div>
</template>

<style scoped lang="css">
.product-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns, 4), 1fr);
  gap: 1.5rem;
}

/* ─── Адаптивность (если колонок много — уменьшаем) ─── */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

.product-grid__skeleton {
  aspect-ratio: 1 / 1;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.product-grid__empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.product-grid__empty p {
  margin: 0;
  font-size: 1.125rem;
}
</style>
