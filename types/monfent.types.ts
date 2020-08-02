export interface IGlobalSettings {
  announcement: string
  hide_announcement: boolean
  main_logo: string
  contact_phone: string
  contact_email: string
  contact_address: string
}

export interface IHomePageContent {
  title: string
  slider_images: string[]
}

export interface IProductListPageContent {
  title: string
}

export interface ICreateOrUpdateCustomerDesignPayload {
  product_handle: string
  variant_sku: string
  customer_id: string
  customer_name: string
  customer_email: string
  file: string
  _handle: string
}

export interface ICustomerDesign {
  id: string
  product_handle: string
  variant_sku: string
  customer_id: string
  customer_name: string
  customer_email: string
  file: string
  _handle: string
}

export interface IGetCustomerDesignPayload {
  product_handle: string
  variant_sku: string
  customer_id: string
}
