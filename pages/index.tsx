import { shopify } from 'request/shopify'
import { useState, useEffect } from 'react'
import { IData } from 'types/utils.types'
import useSWR from 'swr'
import { productFetcher } from 'fetchers'
import { IFetchers } from 'types/fetchers.types'

const Home = () => {
  /**
   * ||==================
   * || Load products
   */
  const { data, error } = useSWR(IFetchers.product, productFetcher)

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
