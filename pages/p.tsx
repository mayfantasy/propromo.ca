import { shopify } from 'request/shopify'
import { useState, useEffect } from 'react'
import { IData } from 'types/utils.types'
import useSWR from 'swr'
import { allProductsFetcher } from 'fetchers'
import { IFetchers } from 'types/fetchers.types'

const Home = () => {
  /**
   * ||==================
   * || Load products
   */
  const { data, error } = useSWR(
    IFetchers.ShopifyAllProducts,
    allProductsFetcher
  )

  /**
   * ||==================
   * || Render
   */
  return (
    <pre>
      <small>{JSON.stringify(data, null, 2)}</small>
    </pre>
  )
}

export default Home
