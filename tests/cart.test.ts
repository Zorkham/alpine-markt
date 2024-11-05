import Alpine from 'alpinejs'
import { Product } from '../src/config/product'
import { cart } from '../src/components/cart'

// Mock Alpine.$persist
Alpine.$persist = (value: any) => value

jest.mock('alpinejs', () => ({
  store: jest.fn().mockReturnValue({
    setNotification: jest.fn()
  })
}))

describe('cart', () => {
  let cartInstance: ReturnType<typeof cart>

  beforeEach(() => {
    cartInstance = cart()
    cartInstance.clearCart()
    jest.clearAllMocks()
  })

  it('should initialize with an empty cart', () => {
    expect(cartInstance.cart).toEqual([])
    expect(cartInstance.cartOpen).toBe(false)
  })

  it('should add a product to the cart', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      price: 10,
      quantity: 1
    }
    cartInstance.addToCart(product)

    expect(cartInstance.cart).toEqual([{ ...product, quantity: 1 }])
  })

  it('should increase quantity if the product already exists in the cart', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      price: 10,
      quantity: 1
    }
    cartInstance.addToCart(product)
    cartInstance.addToCart(product)

    expect(cartInstance.cart).toEqual([{ ...product, quantity: 2 }])
  })

  it('should remove a product from the cart', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      price: 10,
      quantity: 1
    }
    cartInstance.addToCart(product)
    cartInstance.removeFromCart(product.id)

    expect(cartInstance.cart).toEqual([])
  })

  it('should clear the cart', () => {
    const product1: Product = {
      id: 1,
      title: 'Test Product 1',
      price: 10,
      quantity: 1
    }
    const product2: Product = {
      id: 2,
      title: 'Test Product 2',
      price: 20,
      quantity: 1
    }

    cartInstance.addToCart(product1)
    cartInstance.addToCart(product2)
    cartInstance.clearCart()

    expect(cartInstance.cart).toEqual([])
  })

  it('should calculate total cart correctly', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      price: 10,
      quantity: 1
    }
    cartInstance.addToCart(product)
    cartInstance.addToCart(product)

    expect(cartInstance.cartTotalItems()).toBe(2)
  })

  it('should calculate total price correctly', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      price: 10,
      quantity: 1
    }
    cartInstance.addToCart(product)
    cartInstance.addToCart(product)

    expect(cartInstance.cartTotal()).toBe(20)
  })

  it('should close the cart', () => {
    cartInstance.cartOpen = true
    cartInstance.closeCart()
    expect(cartInstance.cartOpen).toBe(false)
  })
})
