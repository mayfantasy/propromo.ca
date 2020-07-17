import { Card, Typography, Row, Button } from 'antd'
import { Product } from 'shopify-buy'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { CURRENCY_SYMBOL } from 'helpers/utils.helper'
import Link from 'next/link'
import { pageRoutes } from 'helpers/route.helpers'

const { Title, Text } = Typography
interface IProps {
  product: Product
}

const ProductCard = (props: IProps) => {
  const { product: parent } = props
  const product = parent?.variants?.[0]
  return (
    <>
      <style jsx global>{`
        .product-card {
          cursor: pointer;
          &:hover {
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
            pageRoutes.productDetailPage((product as any)?.sku as string)
              .url as string
          }
          as={
            pageRoutes.productDetailPage((product as any)?.sku as string)
              .dynamicUrl
          }
        >
          <a>
            {/* Image */}
            <div className="product-card__image">
              <img src={product?.image?.src} />
            </div>

            {/* Title */}
            <Row
              className="product-card__title"
              justify="center"
              align="middle"
            >
              <Text strong>{product?.title}as dklnfasl djfalskdj f</Text>
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
                    textDecoration: product?.compareAtPrice
                      ? 'line-through'
                      : ''
                  }}
                >
                  {CURRENCY_SYMBOL} {product?.price}
                </small>
                &nbsp;
                {product?.compareAtPrice && (
                  <Text type="danger">
                    {CURRENCY_SYMBOL} {product?.compareAtPrice}
                  </Text>
                )}
              </div>
              <div className="product-card__add-to-cart">
                <Button
                  type="link"
                  shape="circle"
                  icon={<ShoppingCartOutlined />}
                />
              </div>
            </Row>
          </a>
        </Link>
      </Card>
    </>
  )
}

export default ProductCard
