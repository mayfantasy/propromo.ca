export interface IGlobalSettings {
  announcement: string
  hide_announcement: boolean
  main_logo: string
  contact_phone: string
  contact_email: string
  contact_address: string
  email_receiver: string
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
  file?: string | null
  _handle?: string
  use_template: boolean
  selected_template?: string | null
  info_logo?: string | null
  info_title?: string | null
  info_description?: string | null
  info_name?: string | null
  info_phone?: string | null
  info_website?: string | null
}

export interface ICustomerDesign {
  id: string
  product_handle: string
  variant_sku: string
  customer_id: string
  customer_name: string
  customer_email: string
  file?: string | null
  _handle: string
  use_template: boolean
  selected_template?: string
  info_logo?: string
  info_title?: string
  info_description?: string
  info_name?: string
  info_phone?: string
  info_website?: string
}

export interface IProductDesignTemplate {
  _handle: string
  template_name: string
  'template_img-src': string
  product_handle: string
  variant_sku: string
  customer_fields: IProductDesignTemplateCustomerField[]
}

export interface IGetCustomerDesignPayload {
  product_handle: string
  variant_sku: string
  customer_id: string
}

export enum IProductDesignTemplateCustomerField {
  logo = 'logo',
  title = 'title',
  description = 'description',
  name = 'name',
  phone = 'phone',
  website = 'website'
}

export interface IProductDesignTemplateInfoFormValues {
  logo?: string
  title?: string
  description?: string
  name?: string
  phone?: string
  website?: string
}

export interface IContactUsEmailFormValues {
  name: string
  email: string
  title: string
  content: string
}
