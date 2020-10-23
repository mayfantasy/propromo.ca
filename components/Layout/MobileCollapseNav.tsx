import { CaretDownFilled, UserOutlined } from '@ant-design/icons'
import { Button, Drawer, Row, Spin, Typography } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import ShoppingCartIcon from 'components/Checkout/ShoppingCartIcon'
import { GetCustomerDocument, ShopifyGetCustomerQuery } from 'graphql/generated'
import { bottomHeaderItems } from 'helpers/nav.helpers'
import { pageRoutes } from 'helpers/route.helpers'
import { observer } from 'mobx-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useStores } from 'stores'
import { useQuery } from 'urql'
const { Text } = Typography

interface IProps {}
const MobileCollapseNav = observer((props: IProps) => {
  const {
    AuthStore: { token$, setMe$, me$, setToken$ },
    SettingsStore: { headerCollapsed$, setHeaderCollapsed$ }
  } = useStores()
  const bp = useBreakpoint()

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
        .mobile-collapse-nav {
          background-color: #efefef;
          min-height: 45px;
          .mobile-collapse-nav__content {
            width: 90%;
            font-size: 0.8rem;
          }
          .mobile-collapse-nav__account {
            &:hover {
              text-decoration: underline;
            }
          }
        }
      `}</style>
      <Drawer
        className="mobile-collapse-nav"
        width="100%"
        drawerStyle={{ width: '100%' }}
        visible={headerCollapsed$}
        closable
        onClose={() => setHeaderCollapsed$(false)}
      >
        {/* Auth Line */}
        <Row align="middle" justify="space-between" style={{ width: '90%' }}>
          {GetCustomerResult.fetching ? (
            <Spin />
          ) : me$ ? (
            <div>
              <Link href={pageRoutes.accountPage.url!}>
                <a className="mr-15">
                  <Text
                    type="secondary"
                    className="mobile-collapse-nav__account"
                  >
                    <UserOutlined /> {me$.displayName}
                  </Text>
                </a>
              </Link>
              <a onClick={onLogout}>
                <small>logout</small>
              </a>
            </div>
          ) : (
            <div>
              <span className="mr-15">
                <Link href={pageRoutes.loginPage.url!}>
                  <a>Login</a>
                </Link>
              </span>
              <span>
                <Link href={pageRoutes.registerPage.url!}>
                  <a>Register</a>
                </Link>
              </span>
            </div>
          )}
          <ShoppingCartIcon />
        </Row>

        <br />

        {/* Nav */}
        <div>
          {bottomHeaderItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.key}>
                  <div key={item.key}>
                    <Link href={item.dynamicUrl || item.url!} as={item.url}>
                      {/* Set header nav closed on the same page (collection pages) */}
                      <a onClick={() => setHeaderCollapsed$(false)}>
                        {item.name} <CaretDownFilled />
                      </a>
                    </Link>
                  </div>
                  <div className="pl-20">
                    {item.children.map((child) => (
                      <div key={child.key}>
                        <Link
                          href={child.dynamicUrl || child.url!}
                          as={child.url}
                        >
                          <a onClick={() => setHeaderCollapsed$(false)}>
                            {child.name}
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )
            } else {
              return (
                <div key={item.key}>
                  <Link href={item.dynamicUrl || item.url!} as={item.url}>
                    <a>{item.name}</a>
                  </Link>
                </div>
              )
            }
          })}
        </div>
      </Drawer>
    </>
  )
})

export default MobileCollapseNav
