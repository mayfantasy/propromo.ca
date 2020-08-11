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
  accountPage: {
    key: 'account-page',
    name: 'My Account',
    url: '/account'
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
  contactPage: {
    key: 'contact',
    name: 'Contact Us',
    url: '/contact'
  } as INavItem,
  cartPage: {
    key: 'cart',
    name: 'Cart',
    url: '/cart'
  } as INavItem,
  productDetailPage: (handle: string) =>
    ({
      key: 'product-detail-page',
      name: 'Product Detail',
      url: `/product/${handle}`,
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
