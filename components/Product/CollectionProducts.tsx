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

interface IProps {
  collectionHandle: string
}
const CollectionProducts = (props: IProps) => {
  const { collectionHandle } = props

  /**
   * ||========================
   * || Get collection by handle
   */
  const [productListData] = useQuery<ShopifyGetProductsByCollectionHandleQuery>(
    {
      query: GetProductsByCollectionHandleDocument,
      variables: {
        handle: 'featured-products',
        pageSize: PAGE_SIZE
      }
    }
  )
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

      <Row gutter={[4, 4]}>
        {productListData.data ? (
          productListData.data.collectionByHandle?.products.edges.map(
            (product) => (
              <Col key={product.node.id} md={6} sm={8} xs={12}>
                <ProductCard product={product.node} />
              </Col>
            )
          )
        ) : (
          <Skeleton active />
        )}
      </Row>
    </>
  )
}

export default CollectionProducts
