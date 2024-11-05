import Alpine from 'alpinejs'
import { cart } from '../src/components/cart'
import { navigation } from '../src/components/navigation'
import persist from '@alpinejs/persist'
import { products } from '../src/components/products'

// Mock the stores
jest.mock('../src/stores/notification')

// Mock the components
jest.mock('../src/components/navigation')
jest.mock('../src/components/cart')
jest.mock('../src/components/products')

describe('Alpine.js initialization', () => {
  beforeAll(() => {
    // Mock the Alpine.js plugin and data methods
    Alpine.plugin = jest.fn()
    Alpine.store = jest.fn()
    Alpine.data = jest.fn()
    Alpine.start = jest.fn()
  })

  it('should register the persist plugin', () => {
    require('../src/main')
    expect(Alpine.plugin).toHaveBeenCalledWith(persist)
  })

  it('should register the navigation component', () => {
    require('../src/main')
    expect(Alpine.data).toHaveBeenCalledWith('navigation', navigation)
  })

  it('should register the products component', () => {
    require('../src/main')
    expect(Alpine.data).toHaveBeenCalledWith('products', products)
  })

  it('should register the cart component', () => {
    require('../src/main')
    expect(Alpine.data).toHaveBeenCalledWith('cart', cart)
  })

  it('should expose Alpine globally', () => {
    require('../src/main')
    expect(window.Alpine).toBe(Alpine)
  })

  it('should start Alpine.js', () => {
    require('../src/main')
    expect(Alpine.start).toHaveBeenCalled()
  })
})
