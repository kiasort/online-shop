<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import PriceDisplay from '../components/common/PriceDisplay.vue'
import AppButton from '../components/common/AppButton.vue'
import AppInput from '../components/common/AppInput.vue'
import ProductGrid from '../components/product/ProductGrid.vue'
import type { Product } from '../types'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const product = ref<Product | null>(null)
const quantity = ref(1)
const selectedImage = ref(0)

const currentImage = computed(() => {
  return product.value?.images[selectedImage.value] ?? ''
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter(p => p.categoryId === product.value!.categoryId && p.id !== product.value!.id)
    .slice(0, 4)
})

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart({
      product: product.value,
      quantity: quantity.value
    })
  }
}

const selectImage = (index: number) => {
  selectedImage.value = index
}

onMounted(async () => {
  const productId = route.params.id as string
  product.value = await productStore.fetchProductById(productId) ?? null
})
</script>

<template>
  <section class="product-view">
    <div class="product-view__container">

      <div class="product-view__back">
        <router-link to="/catalog">← Back to Catalog</router-link>
      </div>

      <div class="product-view__main" v-if="product">

        <div class="product-view__gallery">
          <div class="gallery__main-image">
            <img :src="currentImage" :alt="product.name" />
          </div>
          <div class="gallery__thumbnails" v-if="product.images.length > 1">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              class="gallery__thumb"
              :class="{ 'gallery__thumb--active': index === selectedImage }"
              @click="selectImage(index)"
            >
              <img :src="image" :alt="`${product.name} - ${index + 1}`" />
            </button>
          </div>
        </div>

        <div class="product-view__info">
          <h1 class="info__name">{{ product.name }}</h1>

          <div class="info__rating">
            <span class="info__stars">{{ '★'.repeat(Math.floor(product.rating)) }}{{ '☆'.repeat(5 - Math.floor(product.rating)) }}</span>
            <span class="info__rating-value">{{ product.rating }}</span>
          </div>

          <PriceDisplay
            :price="product.price"
            :old-price="product.compareAtPrice ?? null"
            currency="USD"
            size="lg"
          />

          <p class="info__description">{{ product.description }}</p>

          <div class="info__quantity">
            <label for="quantity">Quantity:</label>
            <button class="info__qty-btn" @click="quantity = Math.max(1, quantity - 1)">−</button>
            <AppInput
              id="quantity"
              v-model.number="quantity"
              label="Quantity"
              type="number"
              :min="1"
              :disabled="false"
            />
            <button class="info__qty-btn" @click="quantity++">+</button>
          </div>

          <AppButton class="info__add-btn" @click="addToCart">
            Add to Cart
          </AppButton>

          <div class="info__section">
            <h2>Description</h2>
            <p>{{ product.description }}</p>
          </div>

          <div class="info__section">
            <h2>Details</h2>
            <ul class="info__details-list">
              <li>Product ID: {{ product.id }}</li>
              <li>Category: {{ productStore.categories.find(c => c.id === product?.categoryId)?.name || 'N/A' }}</li>
              <li>In Stock: {{ product.stock > 0 ? 'Yes' : 'No' }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="product-view__loading" v-else>
        <p>Loading product...</p>
      </div>

      <section class="product-view__related" v-if="relatedProducts.length > 0">
        <h2>Related Products</h2>
        <ProductGrid :products="relatedProducts" :columns="4" />
      </section>
    </div>
  </section>
</template>

<style lang="css" scoped>
.product-view {
  padding: 40px 0;
  min-height: calc(100vh - 200px);
}

.product-view__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.product-view__back {
  margin-bottom: 30px;
}

.product-view__back a {
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
}

.product-view__back a:hover {
  text-decoration: underline;
}

.product-view__main {
  display: flex;
  gap: 60px;
  margin-bottom: 60px;
}

.product-view__gallery {
  flex: 1;
  max-width: 50%;
}

.gallery__main-image {
  aspect-ratio: 1;
  background: #f3f4f6;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.gallery__main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery__thumbnails {
  display: flex;
  gap: 12px;
}

.gallery__thumb {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: none;
}

.gallery__thumb--active {
  border-color: #3b82f6;
}

.gallery__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-view__info {
  flex: 1;
  max-width: 45%;
}

.info__name {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #111827;
}

.info__rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.info__stars {
  color: #fbbf24;
  font-size: 18px;
}

.info__rating-value {
  color: #6b7280;
  font-size: 14px;
}

.info__description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 24px;
}

.info__quantity {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.info__quantity label {
  font-size: 14px;
  color: #374151;
}

.info__qty-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info__qty-btn:hover {
  background: #f3f4f6;
}

.info__qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.info__add-btn {
  width: 100%;
  margin-bottom: 32px;
}

.info__section {
  margin-bottom: 28px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.info__section h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #111827;
}

.info__section p {
  color: #4b5563;
  line-height: 1.6;
}

.info__details-list {
  list-style: none;
  padding: 0;
}

.info__details-list li {
  padding: 8px 0;
  color: #4b5563;
  border-bottom: 1px solid #f3f4f6;
}

.product-view__loading {
  text-align: center;
  padding: 60px 0;
  color: #6b7280;
}

.product-view__related {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #e5e7eb;
}

.product-view__related h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #111827;
}

@media (max-width: 1024px) {
  .product-view__main {
    flex-direction: column;
  }

  .product-view__gallery,
  .product-view__info {
    max-width: 100%;
  }
}
</style>
