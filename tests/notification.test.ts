import { Product } from '../src/config/product'
import { notification } from '../src/stores/notification'

describe('notification store', () => {
  jest.useFakeTimers()

  beforeEach(() => {
    notification.product = null
  })

  it('should set the product in the notification', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      quantity: 1
    }
    notification.setNotification(product)
    expect(notification.product).toBe(product)
  })

  it('should clear the product after 3000ms', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      quantity: 1
    }
    notification.setNotification(product)
    jest.advanceTimersByTime(3000)
    expect(notification.product).toBeNull()
  })
})
