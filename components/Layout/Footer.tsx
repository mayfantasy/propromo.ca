import { Row, Col, Input, Button, Typography, Space, Divider } from 'antd'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import { INavItem } from 'types/utils.types'
import Link from 'next/link'

const { Title } = Typography

interface IProps {}

const footerItems: INavItem[] = [
  {
    name: 'Information',
    key: 'information',
    children: [
      {
        name: 'About us',
        key: 'about-us',
        url: '/about-us'
      },
      {
        name: 'Return & Refund Policy',
        key: 'return-and-refund-policy',
        url: '/return-and-refund-policy'
      },
      {
        name: 'Term & Conditions',
        key: 'terms-and-conditions',
        url: '/terms'
      },
      {
        name: 'Privacy Policy',
        key: 'privacy-policy',
        url: '/privacy-policy'
      }
    ]
  },
  {
    name: 'Products',
    key: 'products',
    children: [
      {
        name: 'All Products',
        key: 'all-products',
        url: '/products'
      },
      {
        name: 'Hardwares',
        key: 'hardwares',
        url: '/products/hardware'
      },
      {
        name: 'Prints',
        key: 'prints',
        url: '/products/prints'
      }
    ]
  },
  {
    name: 'Account',
    key: 'account',
    children: [
      {
        name: 'My Account',
        key: 'my-account',
        url: '/account'
      },
      {
        name: 'Login',
        key: 'login',
        url: '/login'
      },
      {
        name: 'Register',
        key: 'register',
        url: '/register'
      }
    ]
  }
]

const Footer = (props: IProps) => {
  const {} = props
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
                        href={item.url || ''}
                        as={item.dynamicUrl}
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
}

export default Footer
