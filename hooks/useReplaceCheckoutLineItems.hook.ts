import { useEffect } from 'react'
import { useStores } from 'stores'
import { useMutation } from 'urql'
import {
  ShopifyCheckoutLineItemsReplaceMutation,
  ShopifyCheckoutLineItemsReplaceMutationVariables,
  CheckoutLineItemsReplaceDocument,
  ShopifyCheckoutFieldsFragment,
  ShopifyAttributeInput,
  ShopifyCheckoutLineItemInput,
  ShopifyProductVariantFieldsFragment
} from 'graphql/generated'
import { getLineItemsFromCheckout } from 'helpers/checkout.helpers'

export const useReplaceCheckoutLineItems = (
  currentVariant: ShopifyProductVariantFieldsFragment,
  quantity: number
) => {
  const {
    AuthStore: { me$ },
    CheckoutStore: { checkout$, setCheckout$ },
    ProductStore: { customerDesign$ }
  } = useStores()
  /**
   * ||==============================
   * ||==============================
   * || Update checkout line items
   */
  const [
    checkoutLineItemsReplaceResult,
    checkoutLineItemsReplace
  ] = useMutation<
    ShopifyCheckoutLineItemsReplaceMutation,
    ShopifyCheckoutLineItemsReplaceMutationVariables
  >(CheckoutLineItemsReplaceDocument)

  const onReplaceCheckoutLineItems = (
    checkout: ShopifyCheckoutFieldsFragment,
    customAttributes: ShopifyAttributeInput[],
    attributesOnly?: boolean
  ) => {
    // Convert lineitem
    const lineItems: ShopifyCheckoutLineItemInput[] = getLineItemsFromCheckout(
      checkout
    )
    // Find if the variant exists
    const fountLineItem = lineItems.find(
      (i) => i.variantId === currentVariant.id
    )
    // New lineitems
    let newLineItems = lineItems
    if (fountLineItem) {
      if (!attributesOnly) {
        fountLineItem.quantity += quantity
      }
      fountLineItem.customAttributes = customAttributes
    } else {
      if (!attributesOnly) {
        newLineItems = lineItems.concat({
          variantId: currentVariant.id,
          quantity,
          customAttributes
        })
      } else {
        newLineItems = lineItems
      }
    }

    checkoutLineItemsReplace({
      checkoutId: checkout.id,
      lineItems: newLineItems
    })
  }

  // Success & User error
  useEffect(() => {
    const checkout =
      checkoutLineItemsReplaceResult.data?.checkoutLineItemsReplace?.checkout
    if (checkout) {
      setCheckout$(checkout)
    }
  }, [checkoutLineItemsReplaceResult.data])

  return { onReplaceCheckoutLineItems, checkoutLineItemsReplaceResult }
}
