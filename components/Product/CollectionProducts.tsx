import { CONTENT_WIDTH } from 'helpers/layout.helper'
import { Row, Col, Card, Alert, Skeleton, Typography, Divider } from 'antd'
import useSWR from 'swr'
import { IFetchers } from 'types/fetchers.types'
import ProductCard from 'components/Product/ProductCard'
import SectionHeader from 'components/Utils/HeaderLine'
import Link from 'next/link'
import { PAGE_SIZE } from 'helpers/utils.helper'
import {
  GetProductsByCollectionHandleDocument,
  ShopifyGetProductsByCollectionHandleQuery
} from 'graphql/generated'
import { useQuery } from 'urql'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { ColProps } from 'antd/lib/col'

interface IProps {
  collectionHandle: string
  take?: number
  layout?: ColProps
  title?: React.ReactNode
}
const CollectionProducts = (props: IProps) => {
  const { collectionHandle, take, layout, title } = props

  const router = useRouter()

  /**
   * ||========================
   * || Get collection by handle
   */
  const [productListData, reload] = useQuery<
    ShopifyGetProductsByCollectionHandleQuery
  >({
    query: GetProductsByCollectionHandleDocument,
    variables: {
      handle: collectionHandle,
      pageSize: PAGE_SIZE
    }
  })

  useEffect(() => {
    reload()
  }, [router.asPath])

  const products = productListData.data?.collectionByHandle?.products.edges

  const defaultLayout: ColProps = { md: 6, sm: 8, xs: 24 }
  return (
    <>
      {productListData.error && (
        <>
          <Alert
            banner
            message={
              <small>{JSON.stringify(productListData.error.message)}</small>
            }
            type="error"
          />
          <br />
        </>
      )}

      {productListData.fetching && <Skeleton active />}

      {products && products.length && (
        <>
          {title}
          <Row gutter={[4, 4]}>
            {productListData.fetching && <Skeleton active />}
            {products.slice(0, take || products.length).map((product) => (
              <Col key={product.node.id} {...(layout || defaultLayout)}>
                <ProductCard product={product.node} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default CollectionProducts
