import { shopify } from 'request/shopify'
export const productFetcher = () =>
  shopify.product.fetchAll().then((data) => data)
