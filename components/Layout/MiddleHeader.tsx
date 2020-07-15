import { Row, Button, Input, Col } from 'antd'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import { SearchOutlined, PhoneOutlined } from '@ant-design/icons'
import { Grid } from 'antd'

const { useBreakpoint } = Grid

interface IProps {
  logoUrl: string
  contactPhone: string
  contactEmail: string
}

const MiddleHeader = (props: IProps) => {
  const { logoUrl, contactPhone, contactEmail } = props

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
                width: 180px;
              }
            }
            .middle-header__search {
              width: 100%;
            }
            .middle-header__contact {
              width: 200px;
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
          <Col xs={24} lg={6}>
            <div className="middle-header__logo center_md">
              <img src={logoUrl} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="middle-header__search">
              <Input.Search
                placeholder="Search products"
                enterButton={<SearchOutlined />}
              />
            </div>
          </Col>
          {!bp.xs && (
            <Col xs={24} lg={4}>
              <Row className="middle-header__contact" gutter={2}>
                <Col xs={6}>
                  <PhoneOutlined style={{ fontSize: '35px' }} />
                </Col>
                <Col xs={18}>
                  <div>
                    <strong>Call us:</strong> {contactPhone}
                  </div>
                  <div>
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  </div>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Row>
    </>
  )
}

export default MiddleHeader
