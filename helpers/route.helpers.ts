import { INavItem } from 'types/utils.types'

export const pageRoutes = {
  homePage: {
    key: 'home-page',
    name: 'Home',
    url: '/'
  } as INavItem,
  productDetailPage: (handle: string) =>
    ({
      key: 'product-detail-page',
      name: 'Product Detail',
      url: '/products/[handle]',
      dynamicUrl: `/products/${handle}`
    } as INavItem)
}
