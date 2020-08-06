import {
  ShopifyProductFieldsFragment,
  ShopifyProductVariantFieldsFragment,
  ShopifyAttributeInput
} from 'graphql/generated'
import {
  ICustomerDesign,
  IProductDesignTemplateCustomerField
} from 'types/monfent.types'
import { ICustomerDesignMethod } from 'types/design.types'

export const productSortOptions: {
  [key: string]: { value: string; name: string }
} = {
  name_asc: {
    value: 'name_asc',
    name: 'Name, A to Z'
  },
  name_des: {
    value: 'name_des',
    name: 'Name, Z to A'
  },
  price_asc: {
    value: 'price_asc',
    name: 'Price, low to hight'
  },
  price_des: {
    value: 'price_des',
    name: 'Price, high to low'
  }
}

export const sortProducts = (
  products: ShopifyProductFieldsFragment[],
  sortValue: string
) => {
  const getFirstVariant = (product: ShopifyProductFieldsFragment) => {
    return product.variants.edges[0].node
  }
  switch (sortValue) {
    case productSortOptions.name_asc.value:
      return products.sort((a, b) => {
        if (a.title > b.title) {
          return 1
        } else return -1
      })
    case productSortOptions.name_des.value:
      return products.sort((a, b) => {
        if (a.title < b.title) {
          return 1
        } else return -1
      })
    case productSortOptions.price_asc.value:
      return products.sort((a, b) => {
        if (
          Number(
            getFirstVariant(a).compareAtPriceV2?.amount ||
              getFirstVariant(a).priceV2.amount
          ) >
          Number(
            getFirstVariant(b).compareAtPriceV2?.amount ||
              getFirstVariant(b).priceV2.amount
          )
        ) {
          return 1
        } else return -1
      })
    case productSortOptions.price_des.value:
      return products.sort((a, b) => {
        if (
          Number(
            getFirstVariant(a).compareAtPriceV2?.amount ||
              getFirstVariant(a).priceV2.amount
          ) <
          Number(
            getFirstVariant(b).compareAtPriceV2?.amount ||
              getFirstVariant(b).priceV2.amount
          )
        ) {
          return 1
        } else return -1
      })
    default:
      return products
  }
}

export const getCustomAttributes = (
  customerDesign: ICustomerDesign | undefined
): ShopifyAttributeInput[] => {
  return customerDesign
    ? [
        {
          key: 'Design Type',
          value: customerDesign.use_template
            ? ICustomerDesignMethod.template
            : ICustomerDesignMethod.upload
        },
        ...(customerDesign.use_template
          ? [
              ...(customerDesign.info_name
                ? [
                    {
                      key: IProductDesignTemplateCustomerField.name,
                      value: customerDesign.info_name
                    }
                  ]
                : []),
              ...(customerDesign.info_logo
                ? [
                    {
                      key: IProductDesignTemplateCustomerField.logo,
                      value: customerDesign.info_logo
                    }
                  ]
                : []),
              ...(customerDesign.info_description
                ? [
                    {
                      key: IProductDesignTemplateCustomerField.description,
                      value: customerDesign.info_description
                    }
                  ]
                : []),
              ...(customerDesign.info_phone
                ? [
                    {
                      key: IProductDesignTemplateCustomerField.phone,
                      value: customerDesign.info_phone
                    }
                  ]
                : []),
              ...(customerDesign.info_title
                ? [
                    {
                      key: IProductDesignTemplateCustomerField.title,
                      value: customerDesign.info_title
                    }
                  ]
                : []),
              ...(customerDesign.info_website
                ? [
                    {
                      key: IProductDesignTemplateCustomerField.website,
                      value: customerDesign.info_website
                    }
                  ]
                : [])
            ]
          : customerDesign.file
          ? [
              {
                key: 'Uploaded Design',
                value: customerDesign.file
              }
            ]
          : [])
      ]
    : []
}
