import { CONTENT_WIDTH } from 'helpers/layout.helper'
import PageLoading from 'components/PageLoading'
import Layout from 'components/Layout/Layout'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { useRouter } from 'next/dist/client/router'
import { useStores } from 'stores'
import { useEffect, useState } from 'react'
import { pageRoutes } from 'helpers/route.helpers'
import useSWR from 'swr'
import { IGlobalSettings } from 'types/monfent.types'
import { IFetchers } from 'types/fetchers.types'
import { globalSettingsFetcher } from 'fetchers'
import {
  Alert,
  Typography,
  Divider,
  Row,
  Col,
  Empty,
  Button,
  InputNumber,
  Spin,
  Tooltip,
  Modal,
  Space
} from 'antd'
import { observer } from 'mobx-react'
import { ShoppingCartOutlined, DeleteFilled } from '@ant-design/icons'
import { CURRENCY_SYMBOL } from 'helpers/utils.helper'
import { useMutation } from 'urql'
import {
  ShopifyCheckoutLineItemsReplaceMutation,
  ShopifyCheckoutLineItemsReplaceMutationVariables,
  CheckoutLineItemsReplaceDocument,
  ShopifyCheckoutLineItemInput,
  ShopifyCheckoutCustomerDisassociateMutation,
  ShopifyCheckoutCustomerDisassociateMutationVariables,
  CheckoutCustomerDisassociateDocument
} from 'graphql/generated'
import { getLineItemsFromCheckout } from 'helpers/checkout.helpers'
import Link from 'next/link'
import { isLink } from 'helpers/file.helpers'
import PriceLine from 'components/PriceLine'
import { route } from 'next/dist/next-server/server/router'

const { Title, Text, Link: LinkText } = Typography

const CartPage = observer(() => {
  const bp = useBreakpoint()
  const router = useRouter()

  const [
    checkoutStatusSelectionModalOpen,
    setCheckoutStatusSelectionModalOpen
  ] = useState(false)

  const {
    CheckoutStore: { checkout$, setCheckout$ }
  } = useStores()

  /**
   * ||===============
   * || Disassociate checkout
   */
  const [disassociateResult, disassociate] = useMutation<
    ShopifyCheckoutCustomerDisassociateMutation,
    ShopifyCheckoutCustomerDisassociateMutationVariables
  >(CheckoutCustomerDisassociateDocument)

  /**
   * ||===============
   * || Update checkout line items
   */
  const [
    checkoutLineItemsReplaceResult,
    checkoutLineItemsReplace
  ] = useMutation<
    ShopifyCheckoutLineItemsReplaceMutation,
    ShopifyCheckoutLineItemsReplaceMutationVariables
  >(CheckoutLineItemsReplaceDocument)

  // Success & User error
  useEffect(() => {
    const checkout =
      checkoutLineItemsReplaceResult.data?.checkoutLineItemsReplace?.checkout
    if (checkout) {
      setCheckout$(checkout)
    }
  }, [checkoutLineItemsReplaceResult.data])

  const onUpdateLineQuantity = (variantId: string, quantity: number) => {
    if (checkout$) {
      const lineItems: ShopifyCheckoutLineItemInput[] = getLineItemsFromCheckout(
        checkout$
      )

      let newLineItems = [...lineItems]

      // Find if the item
      const fountLineItem = newLineItems.find((i) => i.variantId === variantId)

      if (fountLineItem) {
        fountLineItem.quantity = quantity
      }

      checkoutLineItemsReplace({
        checkoutId: checkout$.id,
        lineItems: newLineItems
      })
    }
  }

  const onDeleteLineItem = (variantId: string) => {
    if (checkout$) {
      const lineItems: ShopifyCheckoutLineItemInput[] = getLineItemsFromCheckout(
        checkout$
      )
      let newLineItems = [...lineItems]
      const foundLineItemIndex = newLineItems.findIndex(
        (i) => i.variantId === variantId
      )

      if (foundLineItemIndex !== -1) {
        newLineItems.splice(foundLineItemIndex, 1)
      }
      checkoutLineItemsReplace({
        checkoutId: checkout$.id,
        lineItems: newLineItems
      })
    }
  }

  /**
   * ||===============================
   * || Load Global Settings & Content
   */
  const { data: globalSettingsData, error: globalSettingsError } = useSWR<
    IGlobalSettings
  >(IFetchers.GlobalSettings, globalSettingsFetcher, {
    revalidateOnFocus: false
  })

  /**
   * ||===============================
   * || Render
   */
  if (globalSettingsError) {
    return (
      <>
        <Alert message="Can not load global settings." type="error" banner />
        <br />
      </>
    )
  }
  const checkout = checkout$
  const lineItems = checkout?.lineItems.edges
  const isEmpty = !lineItems?.length

  const totalQuantity =
    lineItems?.reduce((a, c) => {
      return a + c.node.quantity
    }, 0) || 0

  if (globalSettingsData) {
    return (
      <>
        <style jsx global>{`
          .cart-page {
            margin: 50px auto;
            .cart-page__lineitem {
              margin-bottom: 15px;
            }
          }
        `}</style>

        {globalSettingsData && (
          <Layout globalSettings={globalSettingsData}>
            <div
              className="cart-page mobile-padding"
              style={{
                maxWidth: CONTENT_WIDTH
              }}
            >
              <Spin spinning={checkoutLineItemsReplaceResult.fetching}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={!isEmpty ? 18 : undefined}>
                    <Title level={4}>Shopping Cart</Title>
                    <Divider />
                    {isEmpty ? (
                      <Empty
                        description={<span>Your shopping cart is empty.</span>}
                      >
                        <Link href={pageRoutes.homePage.url!}>
                          <Button type="primary">Continue Shopping</Button>
                        </Link>
                      </Empty>
                    ) : (
                      <div>
                        {lineItems?.map((item) => {
                          const variant = item.node.variant
                          const isDefaultOption =
                            variant?.selectedOptions.length === 1 &&
                            variant?.selectedOptions[0].name === 'Title' &&
                            variant?.selectedOptions[0].value ===
                              'Default Title'

                          const actualPrice = variant?.priceV2.amount
                          const lineSubtotal = actualPrice * item.node.quantity
                          return (
                            <>
                              <Row
                                className="cart-page__lineitem"
                                gutter={[16, 16]}
                                key={variant?.id}
                              >
                                {/* Image */}
                                <Col xs={24} md={3}>
                                  <img
                                    src={
                                      item.node.variant?.image?.originalSrc ||
                                      '/square-placeholder.jpg'
                                    }
                                    className="w-100"
                                  />
                                </Col>

                                <Col xs={24} md={9}>
                                  {/* Title */}
                                  <Link
                                    href={
                                      pageRoutes.productDetailPage(
                                        variant?.product.handle!
                                      ).url!
                                    }
                                  >
                                    <LinkText strong>
                                      {item.node.title}
                                    </LinkText>
                                  </Link>

                                  {/* Price */}
                                  <PriceLine variant={variant} />

                                  {/* Selected Option */}
                                  {!isDefaultOption && (
                                    <div>
                                      {variant?.selectedOptions.map((o) => (
                                        <small className="mr-15">
                                          {o.name}: {o.value}
                                        </small>
                                      ))}
                                    </div>
                                  )}
                                </Col>

                                {/* Quantity */}
                                {variant && (
                                  <Col xs={24} md={3}>
                                    <InputNumber
                                      value={item.node.quantity}
                                      onChange={(v) => {
                                        if (v || v === 0) {
                                          if (v > 0) {
                                            onUpdateLineQuantity(
                                              variant.id,
                                              v as number
                                            )
                                          }
                                          if (v === 0) {
                                            onDeleteLineItem(variant.id)
                                          }
                                        }
                                      }}
                                    />
                                  </Col>
                                )}

                                {/* Line subtotal */}
                                <Col xs={24} md={4}>
                                  <div className="right">
                                    <Text type="secondary">
                                      <small>
                                        {CURRENCY_SYMBOL}{' '}
                                        {lineSubtotal.toFixed(2)}
                                      </small>
                                    </Text>
                                  </div>
                                </Col>

                                {/* Delete */}
                                {variant && (
                                  <Col xs={24} md={4}>
                                    <div className="right">
                                      <Tooltip title="Remove This Product">
                                        <DeleteFilled
                                          style={{
                                            cursor: 'pointer'
                                          }}
                                          onClick={() => {
                                            onDeleteLineItem(variant.id)
                                          }}
                                        />
                                      </Tooltip>
                                    </div>
                                  </Col>
                                )}
                              </Row>
                              {!!item.node.customAttributes.length && (
                                <Row>
                                  {item.node.customAttributes.map((a) => (
                                    <Col className="mr-15">
                                      <small>
                                        {a.key}:{' '}
                                        <strong>
                                          {isLink(a.value!) ? (
                                            <a href={a.value!}>download link</a>
                                          ) : (
                                            a.value
                                          )}
                                        </strong>{' '}
                                      </small>
                                    </Col>
                                  ))}
                                </Row>
                              )}
                              <Divider />
                            </>
                          )
                        })}
                      </div>
                    )}
                  </Col>
                  {!isEmpty && (
                    <Col xs={24} lg={6}>
                      <Title level={4}>Summary</Title>
                      <Divider />
                      {/* Subtotal */}
                      <Row justify="space-between" align="middle">
                        <Col>
                          {totalQuantity} Item{totalQuantity > 1 && 's'}
                        </Col>
                        <Col>${checkout?.subtotalPriceV2.amount}</Col>
                      </Row>

                      {/* Tax */}
                      <Row justify="space-between" align="middle">
                        <Col>Tax</Col>
                        <Col>${checkout?.totalTaxV2.amount}</Col>
                      </Row>

                      <Divider />
                      <Row justify="space-between" align="middle">
                        <Col>Total</Col>
                        <Col>${checkout?.totalPriceV2.amount}</Col>
                      </Row>

                      <br />
                      {/* Shipping Notice */}
                      <div>
                        <Text type="secondary">
                          Shipping rate will be counted during the checkout.
                        </Text>
                      </div>

                      <Divider />

                      {/* Checkout button */}
                      {checkout?.webUrl && (
                        <div>
                          <a href={checkout.webUrl} target="_blank">
                            <Button
                              onClick={() =>
                                setCheckoutStatusSelectionModalOpen(true)
                              }
                              className="btn-black w-100"
                              size="large"
                              type="primary"
                            >
                              Checkout Now
                            </Button>
                          </a>
                        </div>
                      )}

                      {/* Customer Note */}
                    </Col>
                  )}
                </Row>
              </Spin>
            </div>

            {/* Checkout status modal */}
            <Modal
              visible={checkoutStatusSelectionModalOpen}
              closable={false}
              title="Have you completed your order successfully?"
              footer={false}
              width="90%"
              style={{ maxWidth: 800 }}
            >
              <Spin spinning={disassociateResult.fetching}>
                <Row justify="center" gutter={[16, 16]}>
                  <Space direction={bp.md ? 'horizontal' : 'vertical'}>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (checkout$) {
                          disassociate({ checkoutId: checkout$?.id! }).then(
                            () => {
                              localStorage.removeItem('checkout')
                              setCheckout$(undefined)
                              router.push(pageRoutes.homePage.url!)
                            }
                          )
                        }
                      }}
                    >
                      Yes, my order was placed successfully
                    </Button>
                    <Button
                      onClick={() => setCheckoutStatusSelectionModalOpen(false)}
                    >
                      No, keep my shopping cart.
                    </Button>
                  </Space>
                </Row>
              </Spin>
            </Modal>
          </Layout>
        )}
        {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
      </>
    )
  } else {
    return <PageLoading wording="Loading page..." />
  }
})

export default CartPage
