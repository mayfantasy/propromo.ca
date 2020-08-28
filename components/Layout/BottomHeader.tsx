import { Row, Button, Input, Col, Menu, Dropdown } from 'antd'
import { CONTENT_WIDTH, BOTTOM_HEADER_BG } from 'helpers/layout.helper'
import {
  SearchOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  ArrowDownOutlined,
  CaretDownFilled
} from '@ant-design/icons'
import { Grid } from 'antd'
import Link from 'next/link'
import { pageRoutes } from 'helpers/route.helpers'
import ShoppingCartIcon from 'components/Checkout/ShoppingCartIcon'
import { bottomHeaderItems } from 'helpers/nav.helpers'

const { SubMenu } = Menu
const { useBreakpoint } = Grid

interface IProps {}

const BottomHeader = (props: IProps) => {
  // const { logoUrl, contactPhone, contactEmail } = props

  const bp = useBreakpoint()
  /**
   * ||==================
   * || Initialize checkout
   */

  /**
   * ||==================
   * || Render
   */
  return (
    <>
      <style jsx global>{`
        .bottom-header {
          height: 55px;
          color: white;
          .bottom-header__content {
            height: 100%;
            width: 90%;
            font-size: 0.8rem;
            .bottom-header__nav {
              height: 100%;
            }
          }
        }
      `}</style>
      <Row
        className="bottom-header"
        justify="center"
        align="middle"
        style={{
          backgroundColor: BOTTOM_HEADER_BG
        }}
      >
        <Row
          style={{
            maxWidth: CONTENT_WIDTH
          }}
          className="bottom-header__content"
          justify="space-between"
          align="middle"
        >
          <Row className="bottom-header__nav" align="middle">
            {bottomHeaderItems.map((item) => {
              if (item.children) {
                return (
                  <Dropdown
                    key={item.key}
                    overlay={
                      <Menu>
                        {item.children.map((child) => (
                          <Menu.Item key={child.key}>
                            <Link
                              href={child.dynamicUrl || child.url!}
                              as={child.url}
                            >
                              <a>{child.name}</a>
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                  >
                    <div className="nav-button" key={item.key}>
                      <Link href={item.dynamicUrl || item.url!} as={item.url}>
                        <a>
                          {item.name} <CaretDownFilled />
                        </a>
                      </Link>
                    </div>
                  </Dropdown>
                )
              } else {
                return (
                  <div className="nav-button" key={item.key}>
                    <Link href={item.dynamicUrl || item.url!} as={item.url}>
                      <a>{item.name}</a>
                    </Link>
                  </div>
                )
              }
            })}
          </Row>
          <div className="bottom-header__shopping-cart">
            <ShoppingCartIcon />
          </div>
        </Row>
      </Row>
    </>
  )
}

export default BottomHeader
