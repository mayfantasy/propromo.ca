import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { useRouter } from 'next/dist/client/router'
import PageLoading from 'components/PageLoading'
import {
  Alert,
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  InputNumber,
  Button,
  Space,
  Spin
} from 'antd'
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
import { PAGE_SIZE, CURRENCY_SYMBOL } from 'helpers/utils.helper'
import ImageDisplay from 'components/Product/ImageDisplay'
import { useState, useEffect } from 'react'
import SectionHeader from 'components/Utils/HeaderLine'
import CollectionProducts from 'components/Product/CollectionProducts'
import CollectionBlocks from 'components/HomePage/CollectionBlocks'

const { Title, Text } = Typography

interface IProps {}
const ProductDetailPage = (props: IProps) => {
  const {} = props
  const bp = useBreakpoint()

  const [quantity, setQuantity] = useState(1)
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
  const [productData, reload] = useQuery<ShopifyGetProductByHandleQuery>({
    query: GetProductByHandleDocument,
    variables: {
      handle: productHandle,
      pageSize: PAGE_SIZE
    }
  })

  useEffect(() => {
    reload()
  }, [router.pathname])

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

  const product = productData.data?.productByHandle
  const productVariant = product?.variants.edges[0].node
  const productCollection = product?.collections.edges[0].node

  if (globalSettingsData) {
    return (
      <>
        <style jsx global>{`
          .product-detail {
            margin: auto;
            .product-detail__pricing {
              font-size: 1.1rem;
            }
            .product-detail__description {
              font-size: 0.8rem;
            }
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

              {product && productVariant && productCollection && (
                <Spin spinning={productData.fetching}>
                  <BreadCrumb
                    items={[
                      pageRoutes.homePage,
                      {
                        name: productCollection.title,
                        key: productCollection.title,
                        url: pageRoutes.productListPage(
                          productCollection.handle
                        ).url,
                        dynamicUrl: pageRoutes.productListPage(
                          productCollection.handle
                        ).dynamicUrl
                      },
                      {
                        name: product.title,
                        key: product.title
                      }
                    ]}
                  />
                  <Row className="product-detail__main" gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                      {/* Images */}
                      <ImageDisplay
                        images={product.images.edges.map(
                          (i) => i.node.originalSrc
                        )}
                      />
                    </Col>
                    <Col xs={24} lg={12}>
                      <Title level={4}>{productVariant.title}</Title>

                      {/* Pricing */}
                      <div className="product-detail__pricing">
                        <span
                          style={{
                            textDecoration: productVariant.compareAtPriceV2
                              ?.amount
                              ? 'line-through'
                              : ''
                          }}
                        >
                          {CURRENCY_SYMBOL} {productVariant.priceV2.amount}
                        </span>
                        &nbsp;
                        {productVariant.compareAtPriceV2?.amount && (
                          <Text type="danger">
                            {CURRENCY_SYMBOL}{' '}
                            {productVariant.compareAtPriceV2.amount}
                          </Text>
                        )}
                      </div>

                      <Divider />

                      {/* Description */}
                      <div className="product-detail__description">
                        <Text type="secondary">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: product.descriptionHtml
                            }}
                          />
                        </Text>
                      </div>

                      <Divider />

                      {/* Buy Button */}
                      <div className="product-detail__buy-button">
                        <Space>
                          <InputNumber
                            value={quantity}
                            onChange={(v) => {
                              setQuantity(v as number)
                            }}
                          />
                          <Button type="primary">Add To Cart</Button>
                        </Space>
                      </div>
                    </Col>
                  </Row>

                  <br />
                  <br />

                  {/* Suggested */}
                  <div className="product-detail__suggested">
                    <SectionHeader
                      title="You may also like"
                      tagline="Checkout the related products"
                    />

                    <CollectionProducts
                      take={4}
                      collectionHandle={productCollection.handle}
                    />
                  </div>

                  <br />
                  <br />

                  {/* Collections */}
                  <div className="product-detail__collectioins">
                    <CollectionBlocks />
                  </div>

                  <br />

                  {/* <pre>
                    <small>{JSON.stringify(productData.data, null, 2)}</small>
                  </pre> */}
                </Spin>
              )}
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
