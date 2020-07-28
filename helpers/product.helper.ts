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
