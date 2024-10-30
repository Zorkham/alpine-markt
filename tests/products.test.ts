import Alpine from 'alpinejs'
import { fetchProductsApi } from '../src/utils/api'
import { products } from './../src/components/products'
import { Product } from '../src/config/product'

// Mock Alpine.$persist
Alpine.$persist = (value: any) => value

// Mock the API function
jest.mock('../src/utils/api', () => ({
  fetchProductsApi: jest.fn()
}))

describe('products', () => {
  let productInstance: ReturnType<typeof products>

  beforeEach(() => {
    productInstance = products()
    productInstance.init()
    jest.clearAllMocks()
  })

  it('should fetch products from the API', async () => {
    const mockProducts = {
      products: [
        {
          id: 1,
          title: 'Product 1',
          description: 'Description 1',
          thumbnail: 'url1',
          price: 10
        },
        {
          id: 2,
          title: 'Product 2',
          description: 'Description 2',
          thumbnail: 'url2',
          price: 20
        }
      ]
    }

    ;(fetchProductsApi as jest.Mock).mockResolvedValue(mockProducts)

    await productInstance.fetchProducts()

    expect(productInstance.products).toEqual(mockProducts.products)
  })

  it('should filter products by search term', async () => {
    const mockProducts = {
      products: [
        {
          id: 1,
          title: 'Apple',
          description: 'Description 1',
          thumbnail: 'url1',
          price: 10
        },
        {
          id: 2,
          title: 'Banana',
          description: 'Description 2',
          thumbnail: 'url2',
          price: 20
        }
      ]
    }

    ;(fetchProductsApi as jest.Mock).mockResolvedValue(mockProducts)
    await productInstance.fetchProducts()

    productInstance.search = 'apple'
    const filteredProducts = productInstance.filteredProducts

    expect(filteredProducts).toEqual([mockProducts.products[0]])
  })

  it('should sort products by price in ascending order', async () => {
    const mockProducts = {
      products: [
        {
          id: 1,
          title: 'Product A',
          description: 'Description A',
          thumbnail: 'url1',
          price: 30
        },
        {
          id: 2,
          title: 'Product B',
          description: 'Description B',
          thumbnail: 'url2',
          price: 10
        }
      ]
    }

    ;(fetchProductsApi as jest.Mock).mockResolvedValue(mockProducts)
    await productInstance.fetchProducts()

    productInstance.sortByPrice = 'asc'
    const sortedProducts = productInstance.filteredProducts

    expect(sortedProducts).toEqual([
      mockProducts.products[1],
      mockProducts.products[0]
    ]) // Product B should come first
  })

  it('should sort products by price in descending order', async () => {
    const mockProducts = {
      products: [
        {
          id: 1,
          title: 'Product A',
          description: 'Description A',
          thumbnail: 'url1',
          price: 10
        },
        {
          id: 2,
          title: 'Product B',
          description: 'Description B',
          thumbnail: 'url2',
          price: 30
        }
      ]
    }

    ;(fetchProductsApi as jest.Mock).mockResolvedValue(mockProducts)
    await productInstance.fetchProducts()

    productInstance.sortByPrice = 'desc'
    const sortedProducts = productInstance.filteredProducts

    expect(sortedProducts).toEqual([
      mockProducts.products[1],
      mockProducts.products[0]
    ]) // Product B should come first
  })

  it('should clear filters', () => {
    productInstance.search = 'Apple'
    productInstance.sortByPrice = 'asc'

    productInstance.clearFilters()

    expect(productInstance.search).toBe('')
    expect(productInstance.sortByPrice).toBe('none')
  })
})
