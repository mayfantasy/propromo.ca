import { shopify } from 'request/shopify'
import axios from 'axios'
import { api } from 'request/axios'
import { IGlobalSettings, IHomePageContent } from 'types/monfent.types'
import { IMonfentData } from 'types/utils.types'
import { ProductResource, Collection, Product } from 'shopify-buy'

/**
 * ||===========================
 * || Shopify Fetchers
 */
// All products
export const allProductsFetcher = () =>
  shopify.product.fetchAll().then((data) => data)

// All collections
export const allCollectionsFetcher = () =>
  shopify.collection.fetchAll().then((data) => data as Collection[])

// Featured Products collection
export const featuredProductsFetcher = () =>
  shopify.collection
    .fetchWithProducts('Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIwNjY5NTM5OTU4NA==')
    // Type error: data is Collection but type is any[]
    .then((data) => (data as any).products as Product[])

/**
 * ||===========================
 * || Monfent Fetchers
 */
export const globalSettingsFetcher = () =>
  api
    .get<IMonfentData<IGlobalSettings>>(
      '/object/propromo/global-settings/get/270997550153073152'
    )
    .then((res) => res.data.result)

export const homePageContentFetcher = () =>
  api
    .get<IMonfentData<IHomePageContent>>(
      '/object/propromo/home-page/get/270997650880332307'
    )
    .then((res) => res.data.result)
