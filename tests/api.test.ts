import { fetchProductsApi } from '../src/utils/api'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ products: [] })
  })
) as jest.Mock

describe('fetchProductsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch products and return the response', async () => {
    const mockResponse = { products: [{ id: 1, name: 'Product 1' }] }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    })

    const result = await fetchProductsApi()
    expect(result).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products/category/mobile-accessories'
    )
  })

  it('should handle fetch errors', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'))

    await expect(fetchProductsApi()).rejects.toThrow('Fetch error')
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products/category/mobile-accessories'
    )
  })
})
