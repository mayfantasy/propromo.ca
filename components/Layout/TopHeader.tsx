import { Row, Button, Col, Grid, Typography, Spin } from 'antd'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import Hamburger from 'hamburger-react'
import { pageRoutes } from 'helpers/route.helpers'
import Link from 'next/link'
import { useQuery } from 'urql'
import { ShopifyGetCustomerQuery, GetCustomerDocument } from 'graphql/generated'
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { Router, useRouter } from 'next/dist/client/router'
import { UserOutlined } from '@ant-design/icons'

const { Text } = Typography

interface IProps {
  announcement: string
  hideAnnouncement: boolean
}

const TopHeader = observer((props: IProps) => {
  const { announcement, hideAnnouncement } = props
  const { useBreakpoint } = Grid

  const bp = useBreakpoint()
  const router = useRouter()

  const {
    AuthStore: { token$, setMe$, me$, setToken$ }
  } = useStores()

  const redirectUrl = router.query.redirect as string | undefined

  /**
   * ||===============
   * || Logout
   */
  const onLogout = () => {
    setMe$(undefined)
    setToken$(undefined)
  }
  /**
   * ||===================
   * || Get Customer
   */
  const [GetCustomerResult, getCustomer] = useQuery<ShopifyGetCustomerQuery>({
    query: GetCustomerDocument,
    variables: { customerAccessToken: token$ },
    pause: true
  })

  useEffect(() => {
    if (token$) {
      getCustomer()
    }
  }, [token$])

  useEffect(() => {
    if (GetCustomerResult.data?.customer) {
      const me = GetCustomerResult.data.customer
      setMe$(me)
    }
  }, [GetCustomerResult.data])

  /**
   * ||===================
   * || Render
   */
  return (
    <>
      <style jsx global>{`
        .top-header {
          background-color: #efefef;
          min-height: 45px;
          .top-header__content {
            width: 90%;
            font-size: 0.8rem;
          }
          .top-header__account {
            &:hover {
              text-decoration: underline;
            }
          }
        }
      `}</style>

      <Row className="top-header" justify="center" align="middle">
        <Row
          className="top-header__content"
          style={{
            maxWidth: CONTENT_WIDTH
          }}
          justify="space-between"
          align="middle"
        >
          <Col className="top-header__announcement" xs={20} md={16}>
            {!hideAnnouncement && announcement && <div>{announcement}</div>}
          </Col>
          <Col className="top-header__nav" xs={4} md={8}>
            <Row justify="end" align="middle">
              {bp.md &&
                (GetCustomerResult.fetching ? (
                  <Spin />
                ) : me$ ? (
                  <>
                    <Link href={pageRoutes.accountPage.url!}>
                      <a className="mr-15">
                        <Text type="secondary" className="top-header__account">
                          <UserOutlined /> {me$.displayName}
                        </Text>
                      </a>
                    </Link>
                    <a onClick={onLogout}>
                      <small>logout</small>
                    </a>
                  </>
                ) : (
                  <>
                    <Link href={pageRoutes.loginPage.url!}>
                      <Button type="link">Login</Button>
                    </Link>
                    <Link href={pageRoutes.registerPage.url!}>
                      <Button type="link">Register</Button>
                    </Link>
                  </>
                ))}
              {!bp.md && (
                <>
                  <Hamburger />
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Row>
    </>
  )
})

export default TopHeader
