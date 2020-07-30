import { Card, Row, Col, Typography } from 'antd'
import { Collection } from 'shopify-buy'
import { CaretRightFilled } from '@ant-design/icons'
import Link from 'next/link'
import { ShopifyCollectionFieldsFragment } from 'graphql/generated'
import { ICollectionCardInfo } from 'types/collection.types'

const { Text } = Typography

interface IProps {
  collection: ICollectionCardInfo
}

const CollectionCard = (props: IProps) => {
  const { collection } = props
  return (
    <>
      <style jsx global>{`
        .collection-card {
          background-color: #f5f5f5;
          cursor: pointer;
          img {
            width: 100%;
          }
          .collection-block__content {
            padding: 20px 0;
          }
          &:hover {
            border: 1px solid #0090f0;
            transition: border 300ms ease-in-out;
            .collection-card__shop-button {
              text-decoration: underline;
            }
          }
        }
      `}</style>
      <Card className="collection-card">
        <Row gutter={[8, 8]}>
          <Col xs={24} md={12}>
            <img src={collection.imgSrc} />
          </Col>
          <Col xs={24} md={12}>
            <div className="collection-card__content">
              <div>
                <Text strong>{collection.name}</Text>
              </div>
              <div>
                <small className="collection-card__shop-button">
                  Shop Now <CaretRightFilled />
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  )
}
export default CollectionCard
