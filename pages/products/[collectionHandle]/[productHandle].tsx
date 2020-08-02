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
  GetProductByHandleDocument,
  ShopifyGetProductsByCollectionHandleQuery,
  GetProductsByCollectionHandleDocument,
  ShopifyGetCollectionByHandleQuery,
  GetCollectionByHandleDocument,
  ShopifyProductVariantFieldsFragment,
  ShopifySelectedOptionFieldsFragment
} from 'graphql/generated'
import {
  PAGE_SIZE,
  CURRENCY_SYMBOL,
  RELATED_PRODUCT_TAG_PREFIX,
  FILEUPLOAD_ENABLED_TAG,
  VARIANT_FILEUPLOAD_ENABLED_TAG_PREFIX
} from 'helpers/utils.helper'
import ImageDisplay from 'components/Product/ImageDisplay'
import { useState, useEffect } from 'react'
import SectionHeader from 'components/Utils/HeaderLine'
import CollectionProducts from 'components/Product/CollectionProducts'
import CollectionBlocks from 'components/HomePage/CollectionBlocks'
import _ from 'lodash'
import UploadDesign from 'components/Product/UploadDesign'

const { Title, Text } = Typography

interface IProps {}
const ProductDetailPage = (props: IProps) => {
  const {} = props
  const bp = useBreakpoint()

  const [currentVariant, setCurrentVariant] = useState<
    ShopifyProductVariantFieldsFragment | undefined
  >()

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
  const [productData, reloadProductData] = useQuery<
    ShopifyGetProductByHandleQuery
  >({
    query: GetProductByHandleDocument,
    variables: {
      handle: productHandle,
      pageSize: PAGE_SIZE
    }
  })

  /**
   * ||========================
   * || Get collection by handle
   */
  const [collectionData, reloadCollectionData] = useQuery<
    ShopifyGetCollectionByHandleQuery
  >({
    query: GetCollectionByHandleDocument,
    variables: {
      handle: collectionHandle
    }
  })

  useEffect(() => {
    reloadProductData()
  }, [router.asPath])

  /**
   * ||========================
   * || On update variant
   */
  const onUpdateVariants = (option: ShopifySelectedOptionFieldsFragment) => {
    const currentSelectedOptions = currentVariant?.selectedOptions

    if (currentSelectedOptions) {
      const newSelectedOptions = [...currentSelectedOptions]
      // Find the old option
      const foundOptionIndex = currentSelectedOptions.findIndex(
        (dso) => dso.name === option.name
      )
      if (foundOptionIndex !== -1) {
        // Replace with the new option
        newSelectedOptions.splice(foundOptionIndex, 1, option)
      }

      // Find variatioin
      const foundVariant = productVariants?.find((variant) => {
        const isEqual = _.isEqual(
          newSelectedOptions.map((o) => ({
            name: o.name,
            value: o.value
          })),
          variant.node.selectedOptions.map((so) => ({
            name: so.name,
            value: so.value
          }))
        )

        return isEqual
      })

      setCurrentVariant(foundVariant?.node)
      setQuantity(1)
    }
  }

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
  const productVariants = product?.variants.edges
  const firstVariant = productVariants?.[0].node
  const hasVariants = productVariants && productVariants.length > 1
  const quantityAvailable = currentVariant?.quantityAvailable || 0
  const relatedCollectionHandle = product?.tags.find((t) =>
    t.includes(RELATED_PRODUCT_TAG_PREFIX)
  )

  const productCollection =
    collectionHandle === 'all-products'
      ? product?.collections.edges[0].node
      : collectionData.data?.collectionByHandle

  const productTags = product?.tags
  const fileuploadEnabled = hasVariants
    ? productTags?.find(
        (t) => t === VARIANT_FILEUPLOAD_ENABLED_TAG_PREFIX + currentVariant?.sku
      )
    : productTags?.find((t) => t === FILEUPLOAD_ENABLED_TAG)

  useEffect(() => {
    setCurrentVariant(firstVariant)
  }, [firstVariant])

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
              {productData.fetching && (
                <>
                  <br />
                  <Skeleton active />
                </>
              )}
              {product && currentVariant && productCollection && (
                <>
                  {/* <BreadCrumb
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
                  /> */}
                  <br />
                  <br />
                  <Row className="product-detail__main" gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                      {/* Images */}
                      <ImageDisplay
                        images={
                          product.images.edges.length
                            ? product.images.edges.map(
                                (i) => i.node?.originalSrc
                              )
                            : ['/square-placeholder.jpg']
                        }
                      />
                    </Col>
                    <Col xs={24} lg={12}>
                      <Title level={3} style={{ height: '60px' }}>
                        {product.title}
                        {/* {hasVariants ? ` - ${currentVariant.title}` : ''} */}
                      </Title>
                      {/* Pricing */}
                      <div className="product-detail__pricing">
                        <span
                          style={{
                            textDecoration: currentVariant.compareAtPriceV2
                              ?.amount
                              ? 'line-through'
                              : ''
                          }}
                        >
                          {CURRENCY_SYMBOL} {currentVariant.priceV2.amount}
                        </span>
                        &nbsp;
                        {currentVariant.compareAtPriceV2?.amount && (
                          <Text type="danger">
                            {CURRENCY_SYMBOL}{' '}
                            {currentVariant.compareAtPriceV2.amount}
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

                      {/* Product Variants */}
                      {product.options.length &&
                        currentVariant.title !== 'Default Title' && (
                          <>
                            <br />
                            {product.options.map((o) => (
                              <div key={o.id} className="mb-15">
                                <Title level={4}>{o.name}</Title>
                                <Row gutter={[2, 2]}>
                                  {o.values.map((v) => (
                                    <Col key={v}>
                                      {currentVariant.selectedOptions.find(
                                        (so) => so.value === v
                                      ) ? (
                                        <Button ghost type="primary">
                                          {v}
                                        </Button>
                                      ) : (
                                        <Button
                                          onClick={() =>
                                            onUpdateVariants({
                                              name: o.name,
                                              value: v
                                            })
                                          }
                                          type="ghost"
                                        >
                                          {v}
                                        </Button>
                                      )}
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                            ))}
                          </>
                        )}
                      <Divider />

                      {/* Upload design */}
                      {/* <pre>{JSON.stringify(fileuploadEnabled, null, 2)}</pre> */}
                      {fileuploadEnabled && currentVariant.sku && (
                        <>
                          <div className="product-detail__fileupload">
                            <UploadDesign
                              productHandle={product.handle}
                              productVariantSku={currentVariant.sku}
                            />
                          </div>
                          <Divider />
                        </>
                      )}

                      {/* Buy Button */}
                      <div className="product-detail__buy-button">
                        <Space>
                          <InputNumber
                            disabled={!quantityAvailable}
                            value={quantity}
                            onChange={(v) => {
                              const value = v as number
                              setQuantity(
                                value <= 1
                                  ? 1
                                  : value > quantityAvailable
                                  ? quantityAvailable
                                  : value
                              )
                            }}
                          />
                          <Button disabled={!quantityAvailable} type="primary">
                            {quantityAvailable ? 'Add To Cart' : 'Out Of Stock'}
                          </Button>
                        </Space>
                      </div>
                      {/* Stock info */}
                      {quantityAvailable < 10 && (
                        <Text type="warning">
                          {quantityAvailable ? (
                            <small>
                              Only {quantityAvailable} left in stock
                            </small>
                          ) : (
                            <small>
                              This product is currently out of stock
                            </small>
                          )}
                        </Text>
                      )}
                    </Col>
                  </Row>

                  <br />
                  <br />

                  {/* Suggested */}
                  {relatedCollectionHandle && (
                    <>
                      <div className="product-detail__suggested">
                        <CollectionProducts
                          title={
                            <SectionHeader
                              title="You may also like"
                              tagline="Checkout the related products"
                            />
                          }
                          take={8}
                          collectionHandle={relatedCollectionHandle}
                        />
                      </div>
                      <br />
                      <br />
                    </>
                  )}

                  {/* Collections */}
                  <div className="product-detail__collectioins">
                    <CollectionBlocks />
                  </div>

                  <br />

                  {/* <pre>
                    <small>{JSON.stringify(productData.data, null, 2)}</small>
                  </pre> */}
                </>
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
