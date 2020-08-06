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
  ShopifyAttributeInput
} from 'graphql/generated'
import { Button, message } from 'antd'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { ICustomerDesignMethod } from 'types/design.types'
import { IProductDesignTemplateCustomerField } from 'types/monfent.types'
import { getCustomAttributes } from 'helpers/product.helper'
import { useEffect } from 'react'

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
   * ||===============
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
   * ||===============
   * || Update checkout line items
   */
  const [
    checkoutLineItemsReplaceResult,
    checkoutLineItemsReplace
  ] = useMutation<
    ShopifyCheckoutLineItemsReplaceMutation,
    ShopifyCheckoutLineItemsReplaceMutationVariables
  >(CheckoutLineItemsReplaceDocument)

  // Success & User error
  useEffect(() => {
    const checkout =
      checkoutLineItemsReplaceResult.data?.checkoutLineItemsReplace?.checkout
    if (checkout) {
      setCheckout$(checkout)
    }
  }, [checkoutLineItemsReplaceResult.data])

  /**
   * ||===============
   * || Add to cart
   */
  const onAddToCart = () => {
    // customer attributes (design data for checkout)
    const customAttributes: ShopifyAttributeInput[] = getCustomAttributes(
      customerDesign$
    )
    console.log(customAttributes)
    // ***************************
    // **** If the checkout exists
    if (checkout$) {
      // Convert lineitem
      const lineItems = checkout$.lineItems.edges.map((i) => ({
        variantId: i.node.variant?.id || '',
        quantity: i.node.quantity,
        customAttributes: i.node.customAttributes.map((a) => ({
          key: a.key,
          value: a.value || ''
        }))
      }))
      // Find if the variant exists
      const fountLineItem = lineItems.find(
        (i) => i.variantId === currentVariant.id
      )
      // New lineitems
      let newLineItems = lineItems
      if (fountLineItem) {
        fountLineItem.quantity += 1
        fountLineItem.customAttributes = customAttributes
      } else {
        newLineItems = lineItems.concat({
          variantId: currentVariant.id,
          quantity,
          customAttributes
        })
      }
      checkoutLineItemsReplace({
        checkoutId: checkout$.id,
        lineItems: newLineItems
      })
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
   * ||===============
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
