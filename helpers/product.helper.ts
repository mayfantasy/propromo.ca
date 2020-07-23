import {
  ShopifyProductFieldsFragment,
  ShopifyProductVariantFieldsFragment
} from 'graphql/generated'

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
  products: ShopifyProductVariantFieldsFragment[],
  sortValue: string
) => {
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
          Number(a.compareAtPriceV2?.amount || a.priceV2.amount) >
          Number(b.compareAtPriceV2?.amount || b.priceV2.amount)
        ) {
          return 1
        } else return -1
      })
    case productSortOptions.price_des.value:
      return products.sort((a, b) => {
        if (
          Number(a.compareAtPriceV2?.amount || a.priceV2.amount) <
          Number(b.compareAtPriceV2?.amount || b.priceV2.amount)
        ) {
          return 1
        } else return -1
      })
    default:
      return products
  }
}
