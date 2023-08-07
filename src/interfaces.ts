export interface Product {
  id: number,
  name: string,
  price: number,
  weight: number,
  calories?: number | null | undefined,
  section: string  ,
  expirationDate: Date
}

export interface allProducts {
  total: number,
  products: Product[]
}