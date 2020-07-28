import { action, observable } from 'mobx'
import {
  ShopifyCustomer,
  ShopifyCustomerFieldsFragment
} from 'graphql/generated'

class AuthStore {
  @observable
  token$: string | undefined

  @action
  setToken$ = (token: string | undefined) => {
    this.token$ = token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }

  @observable
  me$: ShopifyCustomerFieldsFragment | undefined

  @action
  setMe$ = (me: ShopifyCustomerFieldsFragment | undefined) => {
    this.me$ = me
  }
}
export default AuthStore
