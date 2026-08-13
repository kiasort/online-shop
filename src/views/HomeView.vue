<script setup lang="ts">
import {ref, onMounted} from 'vue'
import type { Product } from '../types/product'
import ProductGrid from '../components/product/ProductGrid.vue'
import AppButton from '../components/common/AppButton.vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()

const featuredProducts = ref<Product[]>([])
const newProducts = ref<Product[]>([])

onMounted(async () => {
    try{
        await productStore.fetchProducts()
        featuredProducts.value = productStore.featuredProducts
        newProducts.value = productStore.products.filter(p => p.isNew)
    }catch(e){
        console.error(e)
        throw e
    }
})
</script>

<template>
    <div class="home">
        <section class="home__hero">
            <div class= "home__container">
                <h1>Добро пожаловать в TechShop</h1>
                <p>Лучшие девайсы по выгодным ценам</p>
                <AppButton variant="primary" size="lg">Перейти в каталог</AppButton>
            </div>

        </section>

        <section class="home__featured">
            <div class="home__container">
                <h2>Хиты продаж</h2>
                <ProductGrid :products="featuredProducts" />
            </div>

        </section>

        <section class="home__new-arrivals">
            <div class="home__container">
                <h2>Новинки</h2>
                <ProductGrid :products="newProducts" />
            </div>
        </section>
    </div>
</template>

<style scoped lang="css">
.home {
    min-height: 100vh;
}

.home__hero {
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    color: #fff;
    padding: 5rem 0;
    text-align: center;
}

.home__hero h1 {
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 1rem;
}

.home__hero p {
    font-size: 1.25rem;
    opacity: 0.9;
    margin: 0 0 2rem;
}

.home__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.home__featured,
.home__new-arrivals {
    padding: 3rem 0;
}

.home__featured h2,
.home__new-arrivals h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 1.5rem;
}
</style>