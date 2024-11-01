import Alpine from 'alpinejs'
import type { Product } from '../config/product'

export const cart = () => ({
  cart: Alpine.$persist([]) as unknown as Product[],
  cartOpen: Alpine.$persist(false) as unknown as boolean,

  // Add product to the cart or update quantity if it already exists
  addToCart(product: Product) {
    const existingItem = this.cart.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      this.cart.push({ ...product, quantity: 1 })
    }

    const notificationInstance: any = Alpine.store('notification')
    notificationInstance.setNotification(product)
  },

  // Remove a product from the cart by ID
  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId)
  },

  // Remove all products from the cart
  clearCart() {
    this.cart = []
  },

  // Calculate the total number of items in the cart
  cartTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0)
  },

  // Calculate the total price of the cart
  cartTotal() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  },

  // Toggle Cart Drawer
  toggleCart() {
    this.cartOpen = !this.cartOpen
  },

  // Close Cart Drawer
  closeCart() {
    this.cartOpen = false
  }
})
