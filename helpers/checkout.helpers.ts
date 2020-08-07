import {
  ShopifyCheckoutFieldsFragment,
  ShopifyCheckoutLineItemInput
} from 'graphql/generated'

export const getLineItemsFromCheckout = (
  checkout: ShopifyCheckoutFieldsFragment
): ShopifyCheckoutLineItemInput[] => {
  return checkout.lineItems.edges.map((i) => ({
    variantId: i.node.variant?.id || '',
    quantity: i.node.quantity,
    customAttributes: i.node.customAttributes.map((a) => ({
      key: a.key,
      value: a.value || ''
    }))
  }))
}
