import {
  Card,
  Typography,
  Row,
  Button,
  Tooltip,
  Popover,
  Tag,
  Col,
  Divider
} from 'antd'
import { ShoppingCartOutlined, CaretRightFilled } from '@ant-design/icons'
import { CURRENCY_SYMBOL } from 'helpers/utils.helper'
import Link from 'next/link'
import { pageRoutes } from 'helpers/route.helpers'
import { ShopifyProduct, ShopifyProductFieldsFragment } from 'graphql/generated'

const { Title, Text } = Typography
interface IProps {
  collectionHandle: string
  product: ShopifyProductFieldsFragment
}

const ProductCard = (props: IProps) => {
  const { product, collectionHandle } = props

  console.log(product)

  const productVariants = product.variants
  const firstVariant = productVariants?.edges[0].node
  const variantCount = productVariants?.edges.length
  const totalInventory = product.totalInventory || 0

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
          .product-card__variants-info {
            a {
              color: #0090f0;
            }
          }
        }
      `}</style>

      <Card className="product-card">
        <Link
          href={
            pageRoutes.productDetailPage(
              collectionHandle,
              product.handle as string
            ).dynamicUrl as string
          }
          as={
            pageRoutes.productDetailPage(
              collectionHandle,
              product.handle as string
            ).url
          }
        >
          <a>
            {/* Image */}
            <div className="product-card__image">
              <img
                src={
                  firstVariant?.image?.originalSrc ||
                  product?.images?.edges?.[0].node.originalSrc
                }
              />
            </div>

            {/* Title */}
            <Row
              className="product-card__title"
              justify="center"
              align="middle"
            >
              {/* <Text strong>{product?.title}as dklnfasl djfalskdj f</Text> */}
              <Text strong>{product.title}</Text>
            </Row>

            {/* Actions */}

            <Row
              className="product-card__actions"
              justify="space-between"
              align="middle"
            >
              <div className="product-card__pricing">
                {totalInventory ? (
                  <>
                    <small
                      style={{
                        textDecoration: firstVariant?.compareAtPriceV2?.amount
                          ? 'line-through'
                          : ''
                      }}
                    >
                      {CURRENCY_SYMBOL} {firstVariant?.priceV2.amount}
                    </small>
                    &nbsp;
                    {firstVariant?.compareAtPriceV2?.amount && (
                      <Text type="danger">
                        {CURRENCY_SYMBOL}{' '}
                        {firstVariant?.compareAtPriceV2.amount}
                      </Text>
                    )}
                  </>
                ) : (
                  <Text type="secondary">
                    <small>Out Of Stock</small>
                  </Text>
                )}
              </div>
              <div className="product-card__add-to-cart">
                {
                  <Button
                    type="link"
                    disabled={!totalInventory}
                    shape="circle"
                    icon={<ShoppingCartOutlined />}
                  />
                }
              </div>
            </Row>
            <Divider style={{ margin: '5px 0' }} />
            <div className="product-card__variants-info">
              {variantCount === 1 ? (
                <small>
                  <a>
                    View product <CaretRightFilled />
                  </a>
                </small>
              ) : (
                <small>
                  <a>
                    <strong>{variantCount}</strong> variants available{' '}
                    <CaretRightFilled />
                  </a>
                </small>
              )}
            </div>
          </a>
        </Link>
      </Card>
    </>
  )
}

export default ProductCard
