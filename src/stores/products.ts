import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, FilterState, SortOption, Category } from '@/types'
import * as productsApi from '../api/products'

export const useProductStore = defineStore('products', () => {
  const filterValue: FilterState = {
    search: '',
    categories: [],
    priceRange: [0, 999999],
    rating: 0,
    onlyInStock: false,
    onlyDiscounts: false,
  }

  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const filters = ref<FilterState>(filterValue)
  const sortBy = ref<SortOption>('newest')

  const filteredProducts = computed(() => {
    let arrCopy = [...products.value]

    if (filters.value.search.length > 0) {
      const searchLower = filters.value.search.toLowerCase()
      arrCopy = arrCopy.filter((product) => product.name.toLowerCase().includes(searchLower))
    }

    if (filters.value.categories.length > 0) {
      arrCopy = arrCopy.filter((product) => filters.value.categories.includes(product.categoryId))
    }

    if (filters.value.onlyInStock) {
      arrCopy = arrCopy.filter((product) => product.stock > 0)
    }

    if (filters.value.onlyDiscounts) {
      arrCopy = arrCopy.filter((product) => product.compareAtPrice !== null)
    }

    if (filters.value.rating > 0) {
      arrCopy = arrCopy.filter((product) => product.rating >= filters.value.rating)
    }

    switch (sortBy.value) {
      case 'price-asc':
        arrCopy.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        arrCopy.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        arrCopy.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        arrCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'name-abc':
        arrCopy.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-zba':
        arrCopy.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    return arrCopy
  })

  const featuredProducts = computed(() => {
    const featured = products.value.filter((product) => product.featured)
    return featured
  })

  const productCount = computed(() => {
    return filteredProducts.value.length
  })

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      const response = await productsApi.getAllProducts()
      return (products.value = response)
    } catch (e) {
      console.error(e)
      error.value = 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    const response = await productsApi.getCategories()
    categories.value = response
  }

  const setSearch = function (query: string) {
    filters.value.search = query
  }

  const setCategoryFilter = function (ids: string[]) {
    filters.value.categories = ids
  }

  const setSortBy = function (option: SortOption) {
    sortBy.value = option
  }

  const resetFilters = function () {
    filters.value = { ...filterValue }
    sortBy.value = 'newest'
  }
  async function fetchProductById(id: string): Promise<Product | undefined> {
    loading.value = true
    error.value = null
    try {
      const response = await productsApi.getProductById(id)
      return response
    } catch (e) {
      console.error(e)
      error.value = 'Failed to fetch product'
    } finally {
      loading.value = false
    }
  }
  return {
    products,
    categories,
    loading,
    error,
    filters,
    sortBy,
    filteredProducts,
    featuredProducts,
    productCount,
    fetchProducts,
    fetchCategories,
    fetchProductById,
    setSearch,
    setCategoryFilter,
    setSortBy,
    resetFilters,
  }
})
