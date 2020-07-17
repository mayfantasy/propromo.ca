import { CONTENT_WIDTH } from 'helpers/layout.helper'
import { Row, Col, Card, Alert, Skeleton, Typography, Divider } from 'antd'
import useSWR from 'swr'
import { IFetchers } from 'types/fetchers.types'
import {
  featuredProductsFetcher,
  allProductsFetcher,
  allCollectionsFetcher
} from 'fetchers'
import ProductCard from 'components/Product/ProductCard'
import SectionHeader from 'components/Utils/HeaderLine'
import Link from 'next/link'

const { Title, Text } = Typography

interface IProps {}
const FeaturedProducts = (props: IProps) => {
  const {} = props

  // const { data, error } = useSWR(
  //   IFetchers.ShopifyAllProducts,
  //   allCollectionsFetcher
  // )
  const { data, error } = useSWR(
    IFetchers.ShopifyFeaturedProducts,
    featuredProductsFetcher
  )
  return (
    <>
      <style jsx global>{`
        .featured-products {
          margin: auto;
        }
      `}</style>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="featured-products" style={{ maxWidth: CONTENT_WIDTH }}>
        <SectionHeader
          title="Featured Products"
          tagline="Checkout our best selling products trusted by customers"
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
            data.map((product) => (
              <Col key={product.id} md={6} sm={8} xs={12}>
                <ProductCard product={product} />
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

export default FeaturedProducts
