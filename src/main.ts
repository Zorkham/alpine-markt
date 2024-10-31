import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import { navigation } from './components/navigation'
import { notification } from './stores/notification'
import { products } from './components/products'
import { cart } from './components/cart'

import 'phosphor-icons'

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
