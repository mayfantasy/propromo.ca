import { shopify } from 'request/shopify'
import axios from 'axios'
import { api } from 'request/axios'
import { IGlobalSettings, IHomePageContent } from 'types/monfent,types'
import { IMonfentData } from 'types/utils.types'

/**
 * ||===========================
 * || Shopify Fetchers
 */
export const productFetcher = () =>
  shopify.product.fetchAll().then((data) => data)

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
