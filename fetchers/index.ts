import { shopify, shopifyGql } from 'request/shopify'
import axios from 'axios'
import { api } from 'request/axios'
import {
  IGlobalSettings,
  IHomePageContent,
  IProductListPageContent,
  ICustomerDesign,
  IGetCustomerDesignPayload,
  ICreateOrUpdateCustomerDesignPayload
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

export const createCustomerDesign = (
  payload: ICreateOrUpdateCustomerDesignPayload
) => {
  return api
    .post<IMonfentData<ICustomerDesign>>(
      '/object/propromo/customer_design/create',
      payload
    )
    .then((res) => {
      return res.data.result
    })
}

export const updateCustomerDesign = (
  id: string,
  payload: ICreateOrUpdateCustomerDesignPayload
) => {
  return api
    .post<IMonfentData<ICustomerDesign>>(
      `/object/propromo/customer_design/update/${id}`,
      payload
    )
    .then((res) => {
      return res.data.result
    })
}

export const removeCustomerDesign = (id: string) => {
  return api
    .delete<IMonfentData<ICustomerDesign>>(
      `/object/propromo/customer_design/delete/${id}`
    )
    .then((res) => {
      return res.data.result
    })
}

export const getCustomerDesignFetcher = (
  _: string,
  product_handle: string,
  variant_sku: string,
  customer_id: string
) => {
  return api
    .get<IMonfentData<ICustomerDesign[]>>(
      '/object/propromo/customer_design/list'
    )
    .then((res) => {
      const list = res.data.result

      return (
        list.find(
          (d) =>
            d.customer_id === customer_id &&
            d.product_handle === product_handle &&
            d.variant_sku === variant_sku
        ) || null
      )
    })
}
