import React from 'react'

import SettingsStore from './settings.store'

export const stores = {
  SettingsStore: new SettingsStore()
}

export const storesContext = React.createContext(stores)

export const useStores = () => React.useContext(storesContext)
