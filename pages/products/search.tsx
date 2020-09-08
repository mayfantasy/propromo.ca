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
import {
  Alert,
  Row,
  Col,
  Typography,
  Divider,
  Skeleton,
  Select,
  Empty
} from 'antd'
import { useQuery } from 'urql'
import {
  ShopifyGetProductsByCollectionHandleQuery,
  GetProductsByCollectionHandleDocument
} from 'graphql/generated'
import { PAGE_SIZE } from 'helpers/utils.helper'
import ProductCard from 'components/Product/ProductCard'
import { pageRoutes } from 'helpers/route.helpers'
import { productSortOptions, sortProducts } from 'helpers/product.helper'
import { useState } from 'react'
import Filters from 'components/Product/Filters'
import { IProductFilterItem } from 'types/product.types'

const { Title, Text } = Typography
const { Option } = Select

interface IProps {}
const SearchProducts = (props: IProps) => {
  const {} = props
  const bp = useBreakpoint()
  const [sortValue, setSortValue] = useState(productSortOptions.name_asc.value)

  /**
   * ||===============================
   * || Product Filters
   */
  const [filters, setFilters] = useState<IProductFilterItem[]>([])

  /**
   * ||===============================
   * || Router
   */
  const router = useRouter()
  const term = ((router.query.term as string) || '').toLowerCase()

  /**
   * ||===============================
   * || Load Global Settings & Content
   */
  const { data: globalSettingsData, error: globalSettingsError } = useSWR<
    IGlobalSettings
  >(IFetchers.GlobalSettings, globalSettingsFetcher)
  const { data: pageContent, error: pageContentError } = useSWR<
    IProductListPageContent
  >(IFetchers.ProductListPageContent, productListPageContentFetcher, {
    revalidateOnFocus: false
  })

  /**
   * ||========================
   * || Get collection by handle
   */
  const [allProducts] = useQuery<ShopifyGetProductsByCollectionHandleQuery>({
    query: GetProductsByCollectionHandleDocument,
    variables: {
      handle: 'all',
      pageSize: 250
    }
  })

  const productList = allProducts.data?.collectionByHandle?.products.edges || []
  const filteredProducts =
    productList?.filter(
      (p) =>
        p.node.title.toLowerCase().includes(term) ||
        p.node.handle.toLowerCase().includes(term) ||
        p.node.productType.toLowerCase().includes(term) ||
        p.node.tags.some((t) => t.toLowerCase().includes(term)) ||
        p.node.variants.edges.some(
          (v) =>
            v.node.title.toLowerCase().includes(term) ||
            v.node.sku?.toLowerCase().includes(term)
        )
    ) || []
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

  const products = filteredProducts.map((p) => p.node) || []
  // Sort Products
  const sortedProducts = sortProducts(products, sortValue)

  // Filter Products
  const filteredAndSortedProducts = sortedProducts.filter((p) =>
    filters.every((f) =>
      p.collections?.edges?.find((c) => c.node.handle === f.key)
    )
  )

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
              {allProducts.error && (
                <>
                  <Alert
                    message={allProducts.error.message}
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
                    name: 'Search Products',
                    key: 'search'
                  }
                ]}
              />
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={4} style={{ backgroundColor: 'white' }}>
                  <Text strong>Filter By</Text>
                  <Divider />
                  <Filters value={filters} onChange={setFilters} />
                </Col>
                <Col xs={24} lg={20}>
                  {/* Title */}
                  <Title level={4}>Search Products</Title>

                  {/* SortBar */}
                  <Row
                    className="product-list__sorter-bar"
                    justify="end"
                    align="middle"
                  >
                    <Select
                      placeholder="Sort By"
                      value={sortValue}
                      onChange={(v: string) => setSortValue(v)}
                      style={{ width: '300px' }}
                    >
                      {Object.keys(productSortOptions).map((o) => (
                        <Option key={o} value={productSortOptions[o].value}>
                          {productSortOptions[o].name}
                        </Option>
                      ))}
                    </Select>
                  </Row>

                  {/* List Data */}
                  {allProducts.fetching && <Skeleton active />}
                  {filteredProducts.length ? (
                    <Row gutter={[4, 4]}>
                      {filteredAndSortedProducts.length ? (
                        filteredAndSortedProducts.map((product) => (
                          <Col key={product.id} sm={8} xs={12}>
                            <ProductCard product={product} />
                          </Col>
                        ))
                      ) : (
                        <Col xs={24}>
                          <Empty description={<span>No result.</span>} />
                        </Col>
                      )}
                    </Row>
                  ) : (
                    <Empty
                      description={<span>No result for term "{term}".</span>}
                    />
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

export default SearchProducts
