import { observable, action } from 'mobx'

class SettingsStore {
  @observable
  headerCollapsed$ = false

  @action
  setHeaderCollapsed$ = (collapsed: boolean) => {
    this.headerCollapsed$ = collapsed
  }
}
export default SettingsStore
