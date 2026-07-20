const BASE_URL = 'http://localhost:5000/api'

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}