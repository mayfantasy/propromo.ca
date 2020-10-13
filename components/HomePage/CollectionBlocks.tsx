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
import { IProductCollectionHandles } from 'helpers/collection.helpers'

const { Text } = Typography

interface IProps {}
const CollectionBlocks = (props: IProps) => {
  const {} = props

  /**
   * ||========================
   * || Collections
   */
  const collectionList: ICollectionCardInfo[] = [
    {
      name: 'Acrylic Sign Products',
      handle: IProductCollectionHandles.acrylic_sign,
      imgSrc: '/collection-images/acrylic-sign-products.jpg'
    },
    // Up comming products
    // {
    //   name: 'Backdrop Stands & Pop-up Display',
    //   handle: 'backdrop-stands-pop-up-display',
    //   imgSrc: '/square-placeholder.jpg'
    // },
    {
      name: 'Banner Stands',
      handle: IProductCollectionHandles.banner_stands,
      imgSrc: '/collection-images/banner-stands.jpg'
    },
    // {
    //   name: 'Brochure and Newspaper Holders',
    //   handle: IProductCollectionHandles.brochure_and_newspaper_holders,
    //   imgSrc: '/square-placeholder.jpg'
    // },
    {
      name: 'Crowd Control Systems',
      handle: IProductCollectionHandles.crowd_control_systems,
      imgSrc: '/collection-images/crowd-control-systems.jpg'
    },
       {
      name: 'Floor Sign Holders',
      handle: IProductCollectionHandles.floor_sign_holders,
      imgSrc: '/collection-images/floor-sign-holders.jpg'
    },
       {
      name: 'Frame Sign Holders',
      handle: IProductCollectionHandles.frame_sign_holders,
      imgSrc: '/collection-images/frame-sign-holders.jpg'
    },
       {
      name: 'Metal A Frames',
      handle: IProductCollectionHandles.metal_a_frame_sign_holders,
      imgSrc: '/collection-images/metal-aframes.jpg'
    },
    // {
    //   name: 'Flags and Accessories',
    //   handle: IProductCollectionHandles.flags,
    //   imgSrc: '/square-placeholder.jpg'
    // },
    // {
    //   name: 'Prints',
    //   handle: IProductCollectionHandles.prints,
    //   imgSrc: '/square-placeholder.jpg'
    // }
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
