import { CONTENT_WIDTH } from 'helpers/layout.helper'
import { Row, Col, Alert, Skeleton, Card, Typography } from 'antd'
import useSWR from 'swr'
import { IFetchers } from 'types/fetchers.types'
import { allCollectionsFetcher } from 'fetchers'
import SectionHeader from 'components/Utils/HeaderLine'
import Link from 'next/link'
import { CaretRightFilled } from '@ant-design/icons'
import CollectionCard from 'components/Collection/CollectionCard'

const { Text } = Typography

interface IProps {}
const CollectionBlocks = (props: IProps) => {
  const {} = props

  const { data, error } = useSWR(
    IFetchers.ShopifyAllCollections,
    allCollectionsFetcher
  )

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
        {error && (
          <>
            <Alert
              banner
              message={<small>{JSON.stringify(error)}</small>}
              type="error"
            />
            <br />
          </>
        )}
        <Row gutter={[4, 4]}>
          {data ? (
            data.map((collection) => (
              <Col key={collection.id} xs={24} sm={12} lg={8}>
                <CollectionCard collection={collection} />
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
