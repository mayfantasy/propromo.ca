import { useMutation } from 'urql'
import {
  ShopifyCreateCheckoutMutation,
  ShopifyCreateCheckoutMutationVariables,
  CreateCheckoutDocument,
  ShopifyCheckoutFieldsFragment,
  ShopifyCheckoutCustomerAssociateMutation,
  ShopifyCheckoutCustomerAssociateMutationVariables,
  CheckoutCustomerAssociateDocument
} from 'graphql/generated'
import { useEffect } from 'react'
import { useStores } from 'stores'

export const useInitCheckout = () => {
  const {
    AuthStore: { setToken$, token$, me$ },
    CheckoutStore: { setCheckout$, checkout$ }
  } = useStores()

  const [
    checkoutCustomerAssociateResult,
    checkoutCustomerAssociate
  ] = useMutation<
    ShopifyCheckoutCustomerAssociateMutation,
    ShopifyCheckoutCustomerAssociateMutationVariables
  >(CheckoutCustomerAssociateDocument)

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

    if (myCheckout) {
      console.log('Setting checkout...')
      setCheckout$(myCheckout)
    }

    if (token$ && !myCheckout && checkout$) {
      console.log('Associating...')
      checkoutCustomerAssociate({
        checkoutId: checkout$.id,
        customerAccessToken: token$
      })
    }
  }, [token$, me$, checkout$])
}
