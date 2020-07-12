import Client from 'shopify-buy'

// Initializing a client to return content in the store's primary language
export const shopify = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_STORE_URL || '',
  storefrontAccessToken: process.env.NEXT_PUBLIC_STORE_ACCESS_TOKEN || ''
})
