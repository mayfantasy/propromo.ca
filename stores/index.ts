import React from 'react'

import SettingsStore from './settings.store'
import AuthStore from './auth.store'

export const stores = {
  SettingsStore: new SettingsStore(),
  AuthStore: new AuthStore()
}

export const storesContext = React.createContext(stores)

export const useStores = () => React.useContext(storesContext)
