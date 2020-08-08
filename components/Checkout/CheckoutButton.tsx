import { useMutation } from 'urql'
import {
  ShopifyCreateCheckoutMutation,
  ShopifyCreateCheckoutMutationVariables,
  CreateCheckoutDocument,
  ShopifyCheckoutLineItemsReplaceMutation,
  ShopifyCheckoutLineItemsReplaceMutationVariables,
  CheckoutLineItemsReplaceDocument,
  ShopifyCheckoutLineItemInput,
  ShopifyProductVariantFieldsFragment,
  ShopifyAttributeInput,
  ShopifyCheckoutFieldsFragment
} from 'graphql/generated'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { getCustomAttributes } from 'helpers/product.helper'
import { useEffect } from 'react'
import { getLineItemsFromCheckout } from 'helpers/checkout.helpers'
import { useReplaceCheckoutLineItems } from 'hooks/useReplaceCheckoutLineItems.hook'

interface IProps {
  disabled?: boolean
  currentVariant: ShopifyProductVariantFieldsFragment
  quantity: number
}
const CheckoutButton = observer((props: IProps) => {
  const { disabled, currentVariant, quantity } = props

  const {
    AuthStore: { me$ },
    CheckoutStore: { checkout$, setCheckout$ },
    ProductStore: { customerDesign$ }
  } = useStores()

  /**
   * ||==============================
   * ||==============================
   * || Create checkout
   */
  const [creatCheckoutResult, createCheckout] = useMutation<
    ShopifyCreateCheckoutMutation,
    ShopifyCreateCheckoutMutationVariables
  >(CreateCheckoutDocument)

  // Success & User error
  useEffect(() => {
    const checkout = creatCheckoutResult.data?.checkoutCreate?.checkout
    if (checkout) {
      setCheckout$(checkout)
    }
  }, [creatCheckoutResult.data])

  /**
   * ||==============================
   * ||==============================
   * || Update checkout line items
   */
  const {
    onReplaceCheckoutLineItems,
    checkoutLineItemsReplaceResult
  } = useReplaceCheckoutLineItems(currentVariant, quantity)

  /**
   * ||==============================
   * ||==============================
   * || When customer design changes
   * || update the checkout line items
   */
  // useEffect(() => {
  //   if (customerDesign$) {
  //     console.log('Setting customer design to checkout...')
  //     // customer attributes (design data for checkout)
  //     const customAttributes: ShopifyAttributeInput[] = getCustomAttributes(
  //       customerDesign$
  //     )
  //     if (checkout$) {
  //       onReplaceCheckoutLineItems(checkout$, customAttributes, true)
  //     }
  //   }
  // }, [customerDesign$])

  /**
   * ||==============================
   * ||==============================
   * || Add to cart
   */
  const onAddToCart = () => {
    // customer attributes (design data for checkout)
    const customAttributes: ShopifyAttributeInput[] = getCustomAttributes(
      customerDesign$
    )

    // ***************************
    // **** If the checkout exists
    if (checkout$) {
      onReplaceCheckoutLineItems(checkout$, customAttributes)
    }
    // **********************************
    // **** If the checkout does not exist
    else {
      // line items
      const lineItems: ShopifyCheckoutLineItemInput[] = [
        {
          variantId: currentVariant.id,
          quantity
        }
      ]

      if (me$) {
        // Auth state
        createCheckout({
          input: {
            allowPartialAddresses: true,
            shippingAddress: me$.defaultAddress,
            email: me$.email,
            lineItems,
            customAttributes
          }
        })
      } else {
        // Un Auth state
        createCheckout({
          input: {
            allowPartialAddresses: true,
            lineItems
          }
        })
      }
    }
  }

  /**
   * ||==============================
   * ||==============================
   * || Render
   */
  return (
    <>
      <Button
        disabled={disabled}
        type="primary"
        onClick={onAddToCart}
        loading={
          checkoutLineItemsReplaceResult.fetching ||
          creatCheckoutResult.fetching
        }
      >
        {!disabled ? 'Add To Cart' : 'Out Of Stock'}
      </Button>

      {/* <pre>
        <small>{JSON.stringify(checkout$, null, 2)}</small>
      </pre>
      <pre>
        <small>{JSON.stringify(me$, null, 2)}</small>
      </pre> */}
    </>
  )
})

export default CheckoutButton
