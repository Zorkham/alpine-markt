export async function fetchProductsApi() {
  const response = await fetch(
    'https://dummyjson.com/products/category/mobile-accessories'
  )
  return await response.json()
}
