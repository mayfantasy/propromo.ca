import { INavItem } from 'types/utils.types'

export const pageRoutes = {
  loginPage: {
    key: 'login-page',
    name: 'Login',
    url: '/login'
  } as INavItem,
  registerPage: {
    key: 'register-page',
    name: 'Register',
    url: '/register'
  } as INavItem,
  homePage: {
    key: 'home-page',
    name: 'Home',
    url: '/'
  } as INavItem,
  aboutPage: {
    key: 'about',
    name: 'About',
    url: '/about'
  } as INavItem,
  productDetailPage: (collectionHanadle: string, handle: string) =>
    ({
      key: 'product-detail-page',
      name: 'Product Detail',
      url: `/products/${collectionHanadle}/${handle}`,
      dynamicUrl: '/products/[collectionHandle]/[productHandle]'
    } as INavItem),
  productListPage: (handle: string) =>
    ({
      key: 'product-list-page',
      name: 'Product List',
      url: `/products/${handle}`,
      dynamicUrl: '/products/[collectionHandle]'
    } as INavItem)
}
