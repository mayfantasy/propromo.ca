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
import { ICollectionCardInfo } from 'types/collection.types'

const { Text } = Typography

interface IProps {
  take?: number
}
const CollectionBlocks = (props: IProps) => {
  const { take } = props

  /**
   * ||========================
   * || Collections
   */
  const collectionList: ICollectionCardInfo[] = [
    {
      name: 'All Products',
      handle: 'all',
      imgSrc: '/square-placeholder.jpg'
    },
    {
      name: 'Acrylic Signs',
      handle: 'acrylic-sign',
      imgSrc: '/square-placeholder.jpg'
    },
    {
      name: 'Backdrop Stands & Pop-up Display',
      handle: 'backdrop-stands-pop-up-display',
      imgSrc: '/square-placeholder.jpg'
    }
  ]

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
        <Row gutter={[4, 4]}>
          {collectionList.length ? (
            collectionList.map((collection) => (
              <Col key={collection.handle} xs={24} sm={12} lg={8}>
                <Link
                  href={
                    pageRoutes.productListPage(collection.handle).dynamicUrl!
                  }
                  as={pageRoutes.productListPage(collection.handle).url}
                >
                  <a>
                    <CollectionCard collection={collection} />
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
