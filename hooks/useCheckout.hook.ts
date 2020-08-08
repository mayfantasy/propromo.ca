import { useMutation } from 'urql'
import {
  ShopifyCreateCheckoutMutation,
  ShopifyCreateCheckoutMutationVariables,
  CreateCheckoutDocument,
  ShopifyCheckoutFieldsFragment,
  ShopifyCheckoutCustomerAssociateMutation,
  ShopifyCheckoutCustomerAssociateMutationVariables,
  CheckoutCustomerAssociateDocument,
  ShopifyCheckoutShippingAddressUpdateMutation,
  ShopifyCheckoutShippingAddressUpdateMutationVariables,
  CheckoutShippingAddressUpdateDocument
} from 'graphql/generated'
import { useEffect } from 'react'
import { useStores } from 'stores'

export const useInitCheckout = () => {
  const {
    AuthStore: { setToken$, token$, me$ },
    CheckoutStore: { setCheckout$, checkout$ }
  } = useStores()

  // Checkout & Customer association
  const [
    checkoutCustomerAssociateResult,
    checkoutCustomerAssociate
  ] = useMutation<
    ShopifyCheckoutCustomerAssociateMutation,
    ShopifyCheckoutCustomerAssociateMutationVariables
  >(CheckoutCustomerAssociateDocument)

  // Update shipping address
  // const [
  //   checkoutShippingAddressUpdateResult,
  //   checkoutShippingAddressUpdate
  // ] = useMutation<
  //   ShopifyCheckoutShippingAddressUpdateMutation,
  //   ShopifyCheckoutShippingAddressUpdateMutationVariables
  // >(CheckoutShippingAddressUpdateDocument)

  // Initialize checkout
  useEffect(() => {
    const checkoutObjectString = localStorage.getItem('checkout')
    if (checkoutObjectString) {
      const checkout = JSON.parse(
        checkoutObjectString
      ) as ShopifyCheckoutFieldsFragment
      if (checkout) {
        setCheckout$(checkout)
      }
    }
  }, [])

  useEffect(() => {
    const myCheckout = me$?.lastIncompleteCheckout
    // Store the customer's checkout
    if (myCheckout) {
      console.log('Setting checkout...')
      setCheckout$(myCheckout)
    }
    // Associate checkout
    if (token$ && !myCheckout && checkout$) {
      console.log('Associating...')
      checkoutCustomerAssociate({
        checkoutId: checkout$.id,
        customerAccessToken: token$
      })
    }
  }, [me$, checkout$])
}
