import { useMutation } from 'urql'
import {
  ShopifyCreateCheckoutMutation,
  ShopifyCreateCheckoutMutationVariables,
  CreateCheckoutDocument,
  ShopifyCheckoutLineItemsReplaceMutation,
  ShopifyCheckoutLineItemsReplaceMutationVariables,
  CheckoutLineItemsReplaceDocument
} from 'graphql/generated'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import { useStores } from 'stores'

interface IProps {
  disabled?: boolean
}
const CheckoutButton = observer((props: IProps) => {
  const { disabled } = props

  const {
    AuthStore: { me$ },
    CheckoutStore: { checkout$ }
  } = useStores()
  /**
   * ||===============
   * || Create checkout
   */
  const [creatCheckoutResult, createCheckout] = useMutation<
    ShopifyCreateCheckoutMutation,
    ShopifyCreateCheckoutMutationVariables
  >(CreateCheckoutDocument)

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

  /**
   * ||===============
   * || Add to cart
   */
  const onAddToCart = () => {
    if (checkout$) {
      const items = checkout$.lineItems
      console.log('checkout items found, update lineitems')
    } else {
      if (me$) {
        console.log('create checkout with me, with lineitems')
      } else {
        console.log('create checkout without me, wite lineitems')
      }
    }
  }

  /**
   * ||===============
   * || Render
   */
  return (
    <>
      <Button disabled={disabled} type="primary" onClick={onAddToCart}>
        {!disabled ? 'Add To Cart' : 'Out Of Stock'}
      </Button>
    </>
  )
})

export default CheckoutButton
