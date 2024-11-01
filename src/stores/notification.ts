import { Product } from '../config/product'

export const notification = {
  product: null as Product | null,

  // Set notification product
  setNotification(product: Product) {
    this.product = product

    setTimeout(() => {
      this.product = null
    }, 3000)
  }
}
