export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
}

export interface Product {
  id: string
  name: string
  description: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  images: string[]
  categoryId: string
  category?: Category
  tags: string[]
  rating: number
  reviewCount: number
  stock: number
  featured: boolean
  isNew: boolean
  discount?: number
  specifications?: Record<string, string>
  createdAt: string
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name-abc' | 'name-zba'

export interface FilterState {
  search: string
  categories: string[]
  priceRange: [number, number]
  rating: number
  onlyInStock: boolean
  onlyDiscounts: boolean
}
