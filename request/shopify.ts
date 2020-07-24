import Client from 'shopify-buy'
import Axios from 'axios'
import { createClient } from 'urql'

// Initializing a client to return content in the store's primary language
export const shopify = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_STORE_URL || '',
  storefrontAccessToken: process.env.NEXT_PUBLIC_STORE_ACCESS_TOKEN || ''
})

export const shopifyGql = createClient({
  url: `https://${process.env.NEXT_PUBLIC_STORE_URL}/api/2020-07/graphql.json`,
  fetchOptions: () => {
    return {
      headers: {
        'X-Shopify-Storefront-Access-Token':
          `${process.env.NEXT_PUBLIC_STORE_ACCESS_TOKEN}` || ''
      }
    }
  }
})
