import Alpine from 'alpinejs'
import type { Product } from '../config/product'
import { fetchProductsApi } from '../utils/api'

export const products = () => ({
  products: [] as Product[],
  search: Alpine.$persist('') as unknown as string,
  sortByPrice: Alpine.$persist('none') as unknown as string,

  // Initialize app and fetch products
  async init() {
    await this.fetchProducts()
  },

  // Fetch products from the API
  async fetchProducts() {
    const data = await fetchProductsApi()
    this.products =
      data?.products.map((product: Product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        thumbnail: product.thumbnail,
        price: product.price
      })) || []
  },

  // Filter products by search and sorting
  get filteredProducts() {
    let filtered = [...this.products]

    if (this.search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(this.search.toLowerCase())
      )
    }

    if (this.sortByPrice === 'asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (this.sortByPrice === 'desc') {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  },

  // Clear search
  clearSearch() {
    this.search = ''
  },

  // Clear filters (search and sorting)
  clearFilters() {
    this.search = ''
    this.sortByPrice = 'none'
  }
})
