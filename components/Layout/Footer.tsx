import { Row, Col, Input, Button, Typography, Space, Divider } from 'antd'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import { INavItem } from 'types/utils.types'
import Link from 'next/link'
import { pageRoutes } from 'helpers/route.helpers'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { IProductCollectionHandles } from 'helpers/collection.helpers'

const { Title } = Typography

interface IProps {}

const Footer = observer((props: IProps) => {
  const {} = props

  const {
    AuthStore: { me$ }
  } = useStores()

  const footerItems: INavItem[] = [
    {
      name: 'Information',
      key: 'information',
      children: [
        pageRoutes.aboutPage,
        pageRoutes.shippingPolicyPage,
        pageRoutes.returnAndRefundPage,
        pageRoutes.termsOfUsePage,
        pageRoutes.privacyPage
      ]
    },
    {
      name: 'Products',
      key: 'products',
      children: [
        // {
        //   name: 'All Products',
        //   key: 'all-products',
        //   url: '/products'
        // },
        {
          name: 'Displays',
          key: IProductCollectionHandles.displays,
          url: pageRoutes.productListPage(IProductCollectionHandles.displays)
            .url,
          dynamicUrl: pageRoutes.productListPage(
            IProductCollectionHandles.displays
          ).dynamicUrl
        },
        {
          name: 'Prints',
          key: IProductCollectionHandles.prints,
          url: pageRoutes.productListPage(IProductCollectionHandles.prints).url,
          dynamicUrl: pageRoutes.productListPage(
            IProductCollectionHandles.prints
          ).dynamicUrl
        }
      ]
    },
    {
      name: 'Account',
      key: 'account',
      children: me$
        ? [pageRoutes.accountPage]
        : [pageRoutes.loginPage, pageRoutes.registerPage]
    }
  ]
  return (
    <>
      <style jsx global>{`
        .footer {
          background-color: white;
          margin: 30px auto;
          .footer__wrapper {
            width: 90%;
          }
          .footer__content {
            a {
              color: initial;
              &:hover {
                text-decoration: underline;
              }
            }
            @media (max-width: 768px) {
              margin-bottom: 30px;
            }
          }
        }
      `}</style>
      <Row className="footer" justify="center" align="middle">
        <Row
          className="footer__wrapper"
          style={{ maxWidth: CONTENT_WIDTH }}
          gutter={[16, 16]}
          justify="space-around"
        >
          {footerItems.map((category) => (
            <Col key={category.key} xs={24} lg={8} className="footer__content">
              <Title level={4}>{category.name}</Title>
              {category.children && (
                <div>
                  {category.children.map((item) => (
                    <div key={item.key}>
                      <Link
                        key={item.key}
                        href={item.dynamicUrl || item.url!}
                        as={item.url}
                      >
                        <a>{item.name}</a>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Row>
    </>
  )
})

export default Footer
