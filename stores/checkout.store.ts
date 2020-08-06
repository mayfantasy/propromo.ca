import { action, observable } from 'mobx'
import {
  ShopifyCheckout,
  ShopifyCheckoutFieldsFragment
} from 'graphql/generated'

class CheckoutStore {
  @observable
  checkout$: ShopifyCheckoutFieldsFragment | undefined

  @action
  setCheckout$ = (checkout: ShopifyCheckoutFieldsFragment | undefined) => {
    this.checkout$ = checkout
    if (checkout) {
      localStorage.setItem('checkout', JSON.stringify(checkout))
    } else {
      localStorage.removeItem('checkout')
    }
  }
}
export default CheckoutStore
