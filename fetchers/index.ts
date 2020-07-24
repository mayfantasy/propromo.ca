import { shopify, shopifyGql } from 'request/shopify'
import axios from 'axios'
import { api } from 'request/axios'
import {
  IGlobalSettings,
  IHomePageContent,
  IProductListPageContent
} from 'types/monfent.types'
import { IMonfentData } from 'types/utils.types'

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

export const productListPageContentFetcher = () =>
  api
    .get<IMonfentData<IProductListPageContent>>(
      '/object/propromo/product_list_page/get/271622376822669843'
    )
    .then((res) => res.data.result)
