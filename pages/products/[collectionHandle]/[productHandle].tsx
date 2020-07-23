import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { useRouter } from 'next/dist/client/router'
import PageLoading from 'components/PageLoading'
import { Alert } from 'antd'
import Layout from 'components/Layout/Layout'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import BreadCrumb from 'components/Utils/BreadCrumb'
import { pageRoutes } from 'helpers/route.helpers'
import useSWR from 'swr'
import { IGlobalSettings, IProductListPageContent } from 'types/monfent.types'
import { IFetchers } from 'types/fetchers.types'
import { globalSettingsFetcher } from 'fetchers'
import { useQuery } from 'urql'
import {
  ShopifyGetProductByHandleQuery,
  GetProductByHandleDocument
} from 'graphql/generated'
import { PAGE_SIZE } from 'helpers/utils.helper'

interface IProps {}
const ProductDetailPage = (props: IProps) => {
  const {} = props
  const bp = useBreakpoint()
  /**
   * ||===============================
   * || Router
   */
  const router = useRouter()
  const collectionHandle = router.query.collectionHandle as string
  const productHandle = router.query.productHandle as string

  /**
   * ||===============================
   * || Load Global Settings & Content
   */
  const { data: globalSettingsData, error: globalSettingsError } = useSWR<
    IGlobalSettings
  >(IFetchers.GlobalSettings, globalSettingsFetcher)

  /**
   * ||========================
   * || Get product by handle
   */
  const [productData] = useQuery<ShopifyGetProductByHandleQuery>({
    query: GetProductByHandleDocument,
    variables: {
      handle: productHandle,
      pageSize: PAGE_SIZE
    }
  })

  /**
   * ||=======
   * || Render
   */
  if (globalSettingsError) {
    return (
      <>
        <Alert message="Can not load global settings." type="error" banner />
        <br />
      </>
    )
  }

  if (globalSettingsData) {
    return (
      <>
        <style jsx global>{`
          .product-detail {
            margin: auto;
          }
        `}</style>
        {globalSettingsData && (
          <Layout globalSettings={globalSettingsData}>
            <div
              className="product-detail"
              style={{
                maxWidth: CONTENT_WIDTH
              }}
            >
              {productData.error && (
                <>
                  <Alert
                    message={productData.error.message}
                    type="error"
                    banner
                  />
                  <br />
                </>
              )}
              <BreadCrumb
                items={[
                  pageRoutes.homePage,
                  {
                    name: pageRoutes.productListPage(collectionHandle).name,
                    key: pageRoutes.productListPage(collectionHandle).key
                  },
                  {
                    name: pageRoutes.productDetailPage(
                      collectionHandle,
                      productHandle
                    ).name,
                    key: pageRoutes.productDetailPage(
                      collectionHandle,
                      productHandle
                    ).key
                  }
                ]}
              />

              <pre>
                <small>{JSON.stringify(productData.data, null, 2)}</small>
              </pre>
            </div>
          </Layout>
        )}
      </>
    )
  } else {
    return <PageLoading wording="Loading product..." />
  }
}

export default ProductDetailPage
