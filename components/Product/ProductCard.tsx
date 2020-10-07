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
import { useRouter } from 'next/dist/client/router'
import PriceLine from 'components/PriceLine'

const { Title, Text } = Typography
interface IProps {
  product: ShopifyProductFieldsFragment
}

const ProductCard = (props: IProps) => {
  const { product } = props

  const router = useRouter()

  const productVariants = product.variants
  const firstVariant = productVariants?.edges[0].node
  const variantCount = productVariants?.edges.length
  const totalInventory = product.totalInventory || 0

  // ===== Don't track inventory
  const dontCheckInventory =
    totalInventory <= 0 && firstVariant?.availableForSale
  // ===== Available
  const available =
    (!dontCheckInventory && totalInventory) || dontCheckInventory

  return (
    <>
      <style jsx global>{`
        .product-card {
          height: 100%;
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
            position: relative;
            .product-card__image__container {
              position: absolute;
              top: 0;
              left: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              img {
                width: 100%;
              }
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

      <Card
        className="product-card"
        onClick={() => {
          router.push(
            pageRoutes.productDetailPage(product.handle as string).url as string
          ),
            pageRoutes.productDetailPage(product.handle as string).dynamicUrl
        }}
      >
        <>
          {/* Image */}
          <div className="product-card__image">
            <div className="product-card__image__placeholder responsive-square" />
            <div className="product-card__image__container w-100 h-100">
              <img
                src={
                  firstVariant?.image?.originalSrc ||
                  product?.images?.edges?.[0]?.node?.originalSrc ||
                  '/square-placeholder.jpg'
                }
              />
            </div>
          </div>

          {/* Title */}
          <Row className="product-card__title" justify="center" align="middle">
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
              {available ? (
                <PriceLine variant={firstVariant} />
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
                  disabled={!available}
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
        </>
      </Card>
    </>
  )
}

export default ProductCard
