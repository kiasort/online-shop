import axiosInstance from './axiosInstance'
import type { Product, Category } from '../types/product'

export interface ProductResponse {
  data: Product[]
  total: number
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await axiosInstance.get('/categories')
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function getAllProducts(params?: {
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
  categoryId?: string
  q?: string
}): Promise<Product[]> {
  try {
    const response = await axiosInstance.get('/products', { params })
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await axiosInstance.get(`/products/${id}`)
    return response.data
  } catch (e) {
    console.error('Товар не найден', e)
    throw e
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await axiosInstance.get('/products?featured=true')
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await axiosInstance.get(`/products?q=${query}`)
    return response.data
  } catch (e) {
    console.error(e)
    throw e
  }
}
