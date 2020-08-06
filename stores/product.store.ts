import { action, observable } from 'mobx'
import {
  ShopifyCheckout,
  ShopifyCheckoutFieldsFragment
} from 'graphql/generated'
import { ICustomerDesign } from 'types/monfent.types'

class ProductStore {
  @observable
  customerDesign$: ICustomerDesign | undefined

  @action
  setCustomerDesign$ = (design: ICustomerDesign | undefined) => {
    this.customerDesign$ = design
  }
}
export default ProductStore
