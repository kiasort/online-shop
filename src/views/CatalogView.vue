<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useProductStore } from '../stores/products'
import ProductGrid from '../components/product/ProductGrid.vue'
import AppButton from '../components/common/AppButton.vue'
import AppInput from '../components/common/AppInput.vue'
import type {Product, Category, SortOption, FilterState} from '../types/product'

const productStore = useProductStore()
const sortBy = ref('newest')
const selectedCategories = ref<string[]>([])
const priceRange = ref<[number, number]>([0,999999])
const rating = ref(0)

const filteredProducts = computed(()=>{
    return productStore.filteredProducts
})

const applyFilters = function(){
    productStore.setCategoryFilter(selectedCategories.value)
    productStore.setSortBy(sortBy.value as SortOption)
}

const resetFilters = function (){
    productStore.resetFilters()
    selectedCategories.value = []
    priceRange.value = [0, 99999]
    rating.value = 0
    sortBy.value = 'newest'
}

onMounted(async () =>{
    await productStore.fetchProducts()
    await productStore.fetchCategories()
})


</script>


<template>
    <div class="catalog">
        <div class="catalog__header">
            <h1>Каталог</h1>
            <p>Найдено: {{ productStore.products.length }} товаров</p>
        </div>

        <div class="catalog__content">
            <aside class="catalog__sidebar">
                <div class="filter-group">
                    <h3>Категории</h3>
                    <label v-for="category in productStore.categories" :key="category.id">
                        <input 
                        type="checkbox" 
                        :value="category.id"
                        v-model="selectedCategories"
                        />
                        <span>{{ category.name }}</span>
                    </label>
                </div>
                <div class="filter-group">
                    <h3>Цена</h3>
                    <div class="price-inputs">
                        <AppInput v-model="priceRange[0]" placeholder="От" type="number" />  

                        <AppInput v-model="priceRange[1]" placeholder="До" type="number" /> 
                    </div>
                </div>

                <div class="filter-group">
                    <h3>Рейтинг</h3>
                    <select v-model="rating">
                        <option value = "4.5">От 4,5 и выше</option>
                    </select>

                </div>

                <AppButton @click="applyFilters">Применить</AppButton>
            </aside>

            <main class="catalog__main">
                <div class="sort-bar">
                    <label>Сортировка</label>
                    <select v-model="sortBy">
                        <option value="price-asc">По цене ↑</option>
                        <option value="price-desc">По цене ↓</option>
                        <option value="rating">По рейтингу</option>
                        <option value="newest">Сначала новые</option>
                        <option value="name-abc">А-Я</option>
                        <option value="name-zba">Я-А</option>
                        
                    </select>
                    <span>Кол-во: {{ filteredProducts.length }}</span>
                </div>
                <ProductGrid :products="filteredProducts" :loading="productStore.loading"/>
            </main>
        </div>

    </div>
</template>


<style scoped lang="css">
.catalog {
    min-height: 100vh;
}

.catalog__header {
    padding: 2rem 0;
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
}

.catalog__header h1 {
    margin: 0 0 0.5rem;
    font-size: 2rem;
}

.catalog__header p {
    margin: 0;
    color: #6b7280;
}

.catalog__content {
    display: flex;
    gap: 2rem;
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
}

.catalog__sidebar {
    width: 260px;
    flex-shrink: 0;
}

.filter-group {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
}

.filter-group:last-of-type {
    border-bottom: none;
}

.filter-group h3 {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #374151;
}

.filter-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;
    cursor: pointer;
    font-size: 0.875rem;
    color: #4b5563;
}

.filter-group input[type="checkbox"] {
    width: 16px;
    height: 16px;
}

.price-inputs {
    display: flex;
    gap: 0.5rem;
}

.price-inputs .app-input {
    flex: 1;
}

.filter-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #fff;
}

.catalog__main {
    flex: 1;
    min-width: 0;
}

.sort-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 0.75rem 1rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
}

.sort-bar label {
    font-size: 0.875rem;
    color: #6b7280;
}

.sort-bar select {
    padding: 0.375rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #fff;
    flex: 1;
    max-width: 200px;
}

.sort-bar span {
    margin-left: auto;
    font-size: 0.875rem;
    color: #6b7280;
}

@media (max-width: 1024px) {
    .catalog__content {
        flex-direction: column;
    }

    .catalog__sidebar {
        width: 100%;
    }
}
</style>