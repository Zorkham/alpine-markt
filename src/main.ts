import 'phosphor-icons'

import Alpine from 'alpinejs'
import { cart } from './components/cart'
import { navigation } from './components/navigation'
import { notification } from './stores/notification'
import persist from '@alpinejs/persist'
import { products } from './components/products'

// Register Alpine plugins
Alpine.plugin(persist)

// Register Alpine stores
Alpine.store('notification', notification)

// Register Alpine components
Alpine.data('navigation', navigation)
Alpine.data('products', products)
Alpine.data('cart', cart)

// Extend the Window interface to include Alpine
declare global {
  interface Window {
    Alpine: typeof Alpine
  }
}

// Expose Alpine globally to avoid TypeScript errors and for console access
window.Alpine = Alpine

// Start Alpine.js
Alpine.start()
