import { CONTENT_WIDTH } from 'helpers/layout.helper'
import { Row, Col, Alert, Skeleton, Card, Typography } from 'antd'
import useSWR from 'swr'
import { IFetchers } from 'types/fetchers.types'
import SectionHeader from 'components/Utils/HeaderLine'
import Link from 'next/link'
import { CaretRightFilled } from '@ant-design/icons'
import CollectionCard from 'components/Collection/CollectionCard'
import { useQuery } from 'urql'
import {
  ShopifyGetCollectionsQuery,
  GetCollectionsDocument
} from 'graphql/generated'
import { PAGE_SIZE } from 'helpers/utils.helper'
import { pageRoutes } from 'helpers/route.helpers'

const { Text } = Typography

interface IProps {
  take?: number
}
const CollectionBlocks = (props: IProps) => {
  const { take } = props

  /**
   * ||========================
   * || Get collections
   */
  const [collectionList] = useQuery<ShopifyGetCollectionsQuery>({
    query: GetCollectionsDocument,
    variables: {
      pageSize: PAGE_SIZE
    }
  })

  /**
   * ||========================
   * || Render
   */
  return (
    <>
      <style jsx global>{`
        .collection-blocks {
          margin: auto;
        }
      `}</style>
      <div
        className="collection-blocks"
        style={{
          maxWidth: CONTENT_WIDTH
        }}
      >
        <SectionHeader
          title="Collections"
          tagline="Checkout our product lineup from collections"
        />
        {collectionList.error && (
          <>
            <Alert banner message={collectionList.error.message} type="error" />
            <br />
          </>
        )}
        <Row gutter={[4, 4]}>
          {collectionList.data ? (
            collectionList.data.collections.edges
              .slice(0, take || collectionList.data.collections.edges.length)
              .map((collection) => (
                <Col key={collection.node.id} xs={24} sm={12} lg={8}>
                  <Link
                    href={
                      pageRoutes.productListPage(collection.node.handle)
                        .dynamicUrl || ''
                    }
                    as={pageRoutes.productListPage(collection.node.handle).url}
                  >
                    <a>
                      <CollectionCard collection={collection.node} />
                    </a>
                  </Link>
                </Col>
              ))
          ) : (
            <Skeleton active />
          )}
        </Row>
      </div>
    </>
  )
}

export default CollectionBlocks
