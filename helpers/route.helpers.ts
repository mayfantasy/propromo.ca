import { INavItem } from 'types/utils.types'

export const pageRoutes = {
  productDetailPage: (handle: string) =>
    ({
      key: 'product-detail-page',
      name: 'Product Detail',
      url: '/products/[handle]',
      dynamicUrl: `/products/${handle}`
    } as INavItem)
}
