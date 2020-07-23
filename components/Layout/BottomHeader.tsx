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

const { SubMenu } = Menu
const { useBreakpoint } = Grid

interface IProps {}

const BottomHeader = (props: IProps) => {
  // const { logoUrl, contactPhone, contactEmail } = props

  const bp = useBreakpoint()
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
        style={{ backgroundColor: BOTTOM_HEADER_BG }}
      >
        <Row
          style={{ maxWidth: CONTENT_WIDTH }}
          className="bottom-header__content"
          justify="space-between"
          align="middle"
        >
          <Row className="bottom-header__nav" align="middle">
            {/* Home */}
            <div className="nav-button">
              <Link href={pageRoutes.homePage.url || ''}>
                <a>Home</a>
              </Link>
            </div>
            {/* About */}
            <div className="nav-button">
              <Link href={pageRoutes.aboutPage.url || ''}>
                <a>About</a>
              </Link>
            </div>
            {/* All Products */}
            <div className="nav-button">
              <Link href={pageRoutes.productListPage('all').url || ''}>
                <a>All Products</a>
              </Link>
            </div>
            {/* Hardware */}
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.alipay.com/"
                    >
                      1st menu item
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.taobao.com/"
                    >
                      2nd menu item
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.tmall.com/"
                    >
                      3rd menu item
                    </a>
                  </Menu.Item>
                  <Menu.Item danger>a danger item</Menu.Item>
                </Menu>
              }
            >
              <div className="nav-button">
                <a>
                  Hardwares <CaretDownFilled />
                </a>
              </div>
            </Dropdown>

            {/* Prints */}
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.alipay.com/"
                    >
                      1st menu item
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.taobao.com/"
                    >
                      2nd menu item
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.tmall.com/"
                    >
                      3rd menu item
                    </a>
                  </Menu.Item>
                  <Menu.Item danger>a danger item</Menu.Item>
                </Menu>
              }
            >
              <div className="nav-button">
                <a>
                  Prints <CaretDownFilled />
                </a>
              </div>
            </Dropdown>
          </Row>
          <div className="bottom-header__shopping-cart">
            <ShoppingCartOutlined style={{ fontSize: '25px' }} />
          </div>
        </Row>
      </Row>
    </>
  )
}

export default BottomHeader
