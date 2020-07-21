import { CONTENT_WIDTH } from 'helpers/layout.helper'
import { globalSettingsFetcher, productListPageContentFetcher } from 'fetchers'
import PageLoading from 'components/PageLoading'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { IGlobalSettings, IProductListPageContent } from 'types/monfent.types'
import { IFetchers } from 'types/fetchers.types'
import useSWR from 'swr'
import Layout from 'components/Layout/Layout'
import BreadCrumb from 'components/Utils/BreadCrumb'
import { useRouter } from 'next/dist/client/router'
import { Alert, Row, Col, Typography, Divider, Skeleton, Select } from 'antd'
import { useQuery } from 'urql'
import {
  ShopifyGetProductsByCollectionHandleQuery,
  GetProductsByCollectionHandleDocument
} from 'graphql/generated'
import { PAGE_SIZE } from 'helpers/utils.helper'
import ProductCard from 'components/Product/ProductCard'
import { pageRoutes } from 'helpers/route.helpers'
import { productSortOptions } from 'helpers/product.helper'

const { Title, Text } = Typography
const { Option } = Select

interface IProps {}
const ProductList = (props: IProps) => {
  const {} = props
  const bp = useBreakpoint()
  /**
   * ||===============================
   * || Router
   */
  const router = useRouter()
  const collectionHandle = router.query.collectionHandle as string

  /**
   * ||===============================
   * || Load Global Settings & Content
   */
  const { data: globalSettingsData, error: globalSettingsError } = useSWR<
    IGlobalSettings
  >(IFetchers.GlobalSettings, globalSettingsFetcher)
  const { data: pageContent, error: pageContentError } = useSWR<
    IProductListPageContent
  >(IFetchers.ProductListPageContent, productListPageContentFetcher)

  /**
   * ||========================
   * || Get collection by handle
   */
  const [collectionWithProducts] = useQuery<
    ShopifyGetProductsByCollectionHandleQuery
  >({
    query: GetProductsByCollectionHandleDocument,
    variables: {
      handle: collectionHandle,
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

  if (pageContentError) {
    return (
      <>
        <Alert message="Can not load page content." type="error" banner />
        <br />
      </>
    )
  }
  const collectionTitle = collectionWithProducts.data?.collectionByHandle?.title

  if (globalSettingsData && pageContent) {
    return (
      <>
        <style jsx global>{`
          .product-list {
            margin: auto;
            .product-list__sorter-bar {
              background-color: #f6f7f8;
              padding: 0 10px;
              height: 50px;
              margin-bottom: 20px;
            }
          }
        `}</style>
        {globalSettingsData && pageContent && (
          <Layout globalSettings={globalSettingsData}>
            <div
              className="product-list"
              style={{
                maxWidth: CONTENT_WIDTH
              }}
            >
              {collectionWithProducts.error && (
                <>
                  <Alert
                    message={collectionWithProducts.error.message}
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
                    name: collectionTitle || '',
                    key: collectionHandle
                  }
                ]}
              />
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={4} style={{ backgroundColor: 'white' }}>
                  <Text strong>Filter By</Text>
                  <Divider />
                  <div>filters here</div>
                </Col>
                <Col xs={24} lg={20}>
                  {/* Title */}
                  <Title level={4}>{collectionTitle}</Title>

                  {/* SortBar */}
                  <Row
                    className="product-list__sorter-bar"
                    justify="end"
                    align="middle"
                  >
                    <Select placeholder="Sort By" style={{ width: '300px' }}>
                      {Object.keys(productSortOptions).map((o) => (
                        <Option value={productSortOptions[o].value}>
                          {productSortOptions[o].name}
                        </Option>
                      ))}
                    </Select>
                  </Row>

                  {/* List Data */}
                  {collectionWithProducts.data ? (
                    <Row gutter={[4, 4]}>
                      {collectionWithProducts.data.collectionByHandle?.products.edges.map(
                        (product) => (
                          <Col key={product.node.id} sm={8} xs={12}>
                            <ProductCard product={product.node} />
                          </Col>
                        )
                      )}
                    </Row>
                  ) : (
                    <Skeleton active />
                  )}
                </Col>
              </Row>

              {/* <pre>
                <small>{JSON.stringify(productListData.data, null, 2)}</small>
              </pre> */}
            </div>
          </Layout>
        )}
      </>
    )
  } else {
    return <PageLoading wording="Loading page..." />
  }
}

export default ProductList
