<script setup lang="ts">
import type { Product } from '../../types/product'
import PriceDisplay from '../common/PriceDisplay.vue'
import AppButton from '../common/AppButton.vue'
import AppSpinner from '../common/AppSpinner.vue'

interface Props {
  product: Product
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<{
  'add-to-cart': [product: Product]
}>()
</script>

<template>
  <article class="product-card">
    <div class="product-card__image">
      <img 
      :src="props.product.images[0]" 
      :alt="props.product.name" v-if="!props.loading" 
      />
      <AppSpinner 
      v-else 
      size="md"
      color="#3b82f6"
      />
    </div>

    <div class="product-card__info">
      <h3>{{ props.product.name }}</h3>
      <PriceDisplay 
      :currency="'₽'"
      :price="props.product.price"
      :old-price="props.product.compareAtPrice  ?? null"
      size="md"
      />
    </div>

    <div class="product-card__actions">
      <AppButton
        @click="emit('add-to-cart', props.product)"
        variant="primary"
        size="sm"
      >В корзину
      </AppButton>
    </div>
  </article>
</template>

<style scoped lang="css">

.product-card {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}


.product-card--loading {
    opacity: 0.7;
    pointer-events: none;
}


.product-card__image {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;       
    overflow: hidden;
    background-color: #f3f4f6;
}

.product-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;         
    transition: transform 0.3s ease;
}

.product-card:hover .product-card__image img {
    transform: scale(1.05);    
}

.product-card__image :deep(.app-spinner) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}


.product-card__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    flex: 1;                   
}

.product-card__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    line-height: 1.4;
    

    display: -webkit-box;
    -webkit-line-clamp: 2;     
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.product-card__actions {
    padding: 0 1rem 1rem;
}
</style>
