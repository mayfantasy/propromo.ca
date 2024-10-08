import { Row, Button, Input, Col } from 'antd'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import {
  SearchOutlined,
  PhoneOutlined,
  MailOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { Grid } from 'antd'
import ServiceItem from 'components/Utils/ServiceItem'
import { pageRoutes } from 'helpers/route.helpers'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

const { useBreakpoint } = Grid

interface IProps {
  logoUrl: string
  contactPhone: string
  contactEmail: string
}

const MiddleHeader = (props: IProps) => {
  const { logoUrl, contactPhone, contactEmail } = props
  const router = useRouter()

  const bp = useBreakpoint()
  return (
    <>
      <style jsx global>{`
        .middle-header {
          background-color: #ffffff;
          min-height: 100px;
          .middle-header__content {
            width: 90%;
            font-size: 0.8rem;
            .middle-header__logo {
              img {
                width: 100%;
              }
            }
            .middle-header__search {
              width: 100%;
            }
          }
        }
      `}</style>

      <Row className="middle-header" justify="center" align="middle">
        <Row
          className="middle-header__content"
          style={{ maxWidth: CONTENT_WIDTH }}
          justify="space-between"
          align="middle"
        >
          <Col xs={24} md={4} lg={6}>
            <div
              className={`middle-header__logo center_md ${
                !bp.md ? 'mv-20' : ''
              }`}
            >
              <Link href={pageRoutes.homePage.url!}>
                <a>
                  <img src={logoUrl} />
                </a>
              </Link>
            </div>
          </Col>
          <Col xs={24} md={12} lg={12}>
            <div className="middle-header__search">
              <Input.Search
                placeholder="Search products"
                enterButton={<SearchOutlined />}
                onSearch={(term) => {
                  router.push(
                    `${pageRoutes.productSearchPage.url}?term=${term}`
                  )
                }}
              />
            </div>
          </Col>
          {bp.md && (
            <Col xs={24} md={6} lg={4}>
              <ServiceItem
                title={
                  <span>
                    <strong>Contact us 24/7</strong>
                  </span>
                }
                tagline={<a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
              />
            </Col>
          )}
        </Row>
      </Row>
      {!bp.md && <br />}
    </>
  )
}

export default MiddleHeader
