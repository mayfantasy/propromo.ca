import React from 'react'

import SettingsStore from './settings.store'
import AuthStore from './auth.store'
import CheckoutStore from './checkout.store'
import ProductStore from './product.store'

export const stores = {
  SettingsStore: new SettingsStore(),
  AuthStore: new AuthStore(),
  CheckoutStore: new CheckoutStore(),
  ProductStore: new ProductStore()
}

export const storesContext = React.createContext(stores)

export const useStores = () => React.useContext(storesContext)
