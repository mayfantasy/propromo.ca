import { action, observable } from 'mobx'

class AuthStore {
  @observable
  token$: string | null = null

  @action
  setToken$ = (token: string | null) => {
    this.token$ = token
  }

  // @observable
  // me$: IToken | null = null

  // @action
  // signIn$ = (payload: { encoded: string; token: IToken }) => {
  //   this.me$ = payload.token

  //   // Set token to local storage
  //   storeTokenId(payload.encoded)

  //   if (this.me$) {
  //     window.location.href = buildUrl(
  //       pageRoutes.productsPage.url,
  //       this.me$.user.brands[0].id,
  //       getDefaultCountry().id
  //     )
  //   }
  // }

  // @action
  // setMe$ = (payload: IToken) => {
  //   this.me$ = payload
  // }

  // @action
  // logout$ = () => {
  //   unstoreTokenId()
  //   this.me$ = null
  //   window.location.href = pageRoutes.loginPage.url as string
  // }
}
export default AuthStore
