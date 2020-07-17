import { CONTENT_WIDTH } from 'helpers/layout.helper'
import { Row, Col, Alert, Skeleton } from 'antd'
import useSWR from 'swr'
import { IFetchers } from 'types/fetchers.types'
import { allCollectionsFetcher } from 'fetchers'
import SectionHeader from 'components/Utils/HeaderLine'

interface IProps {}
const CollectionBlocks = (props: IProps) => {
  const {} = props

  const { data, error } = useSWR(
    IFetchers.ShopifyAllProducts,
    allCollectionsFetcher
  )

  return (
    <>
      <style jsx global>{`
        .collection-blocks {
          margin: auto;
          .collection-block__item {
            background-color: #f5f5f5;
            padding: 20px;
          }
        }
      `}</style>
      <div
        className="collection-blocks"
        style={{
          maxWidth: CONTENT_WIDTH
        }}
      >
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
              <Col key={collection.id} xs={24} sm={12} lg={6}>
                <div className="collection-block__item">{collection.title}</div>
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
