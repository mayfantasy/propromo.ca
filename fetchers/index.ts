import { shopify, shopifyGql } from 'request/shopify'
import axios from 'axios'
import { api } from 'request/axios'
import {
  IGlobalSettings,
  IHomePageContent,
  IProductListPageContent,
  ICustomerDesign,
  IGetCustomerDesignPayload,
  ICreateOrUpdateCustomerDesignPayload,
  IProductDesignTemplate,
  IContactUsEmailFormValues
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
    .put<IMonfentData<ICustomerDesign>>(
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

export const getProductDesignTemplatesFetcher = (
  _: string,
  product_handle: string,
  variant_sku: string
) => {
  return api
    .get<IMonfentData<IProductDesignTemplate[]>>(
      '/object/propromo/design_templates/list'
    )
    .then((res) => {
      const list = res.data.result

      return (
        list.filter(
          (d) =>
            d.product_handle === product_handle && d.variant_sku === variant_sku
        ) || null
      )
    })
}

export const sendContactUsEmailRequest = async (
  to_email: string,
  form: IContactUsEmailFormValues
) => {
  return api
    .post(`/email/send`, {
      meta: {
        collection_handle: 'propromo',
        schema_handle: 'email_template',
        id: '273578089126035987'
      },
      to_email: to_email,
      data: form
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
