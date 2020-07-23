import { Card, Typography, Row, Button, Tooltip } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { CURRENCY_SYMBOL } from 'helpers/utils.helper'
import Link from 'next/link'
import { pageRoutes } from 'helpers/route.helpers'
import {
  ShopifyProduct,
  ShopifyProductVariantFieldsFragment
} from 'graphql/generated'

const { Title, Text } = Typography
interface IProps {
  collectionHandle: string
  product: ShopifyProductVariantFieldsFragment
}

const ProductCard = (props: IProps) => {
  const { product, collectionHandle } = props

  return (
    <>
      <style jsx global>{`
        .product-card {
          a {
            color: initial;
          }
          cursor: pointer;
          &:hover {
            border: 1px solid #0090f0;
            transition: border 300ms ease-in-out;
            .product-card__title {
              text-decoration: underline;
            }
          }
          .product-card__image {
            img {
              width: 100%;
            }
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
          .product-card__title {
            height: 50px;
            margin-top: 10px;
            text-align: center;
          }
        }
      `}</style>

      <Card className="product-card">
        <Link
          href={
            pageRoutes.productDetailPage(
              collectionHandle,
              product.product.handle as string
            ).dynamicUrl as string
          }
          as={
            pageRoutes.productDetailPage(
              collectionHandle,
              product.product.handle as string
            ).url
          }
        >
          <a>
            {/* Image */}
            <div className="product-card__image">
              <img src={product.image?.originalSrc} />
            </div>

            {/* Title */}
            <Row
              className="product-card__title"
              justify="center"
              align="middle"
            >
              {/* <Text strong>{product?.title}as dklnfasl djfalskdj f</Text> */}
              <Text strong>{product.title}as dklnfasl djfalskdj f</Text>
            </Row>

            {/* Actions */}

            <Row
              className="product-card__actions"
              justify="space-between"
              align="middle"
            >
              <div className="product-card__pricing">
                <small
                  style={{
                    textDecoration: product.compareAtPriceV2?.amount
                      ? 'line-through'
                      : ''
                  }}
                >
                  {CURRENCY_SYMBOL} {product.priceV2.amount}
                </small>
                &nbsp;
                {product.compareAtPriceV2?.amount && (
                  <Text type="danger">
                    {CURRENCY_SYMBOL} {product.compareAtPriceV2.amount}
                  </Text>
                )}
              </div>
              <div className="product-card__add-to-cart">
                <Tooltip title="Add to cart">
                  <Button
                    type="link"
                    shape="circle"
                    icon={<ShoppingCartOutlined />}
                  />
                </Tooltip>
              </div>
            </Row>
          </a>
        </Link>
      </Card>
    </>
  )
}

export default ProductCard
