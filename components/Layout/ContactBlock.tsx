import { Row, Col, Typography, Popover } from 'antd'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import ServiceItem from 'components/Utils/ServiceItem'
import {
  PhoneOutlined,
  DeliveredProcedureOutlined,
  CommentOutlined,
  SecurityScanOutlined,
  TrophyOutlined,
  SafetyOutlined,
  CarOutlined,
  MailOutlined,
  PicCenterOutlined,
  PushpinOutlined,
  TeamOutlined,
  WechatOutlined
} from '@ant-design/icons'

const { Text } = Typography

interface IProps {
  email: string
  phone?: string
  wechatQr?: string
  address?: string
}

const ContactBlock = (props: IProps) => {
  const { email, phone, address, wechatQr } = props
  return (
    <>
      <style jsx global>{`
        .contact-block {
          padding: 20px;
          margin: 30px auto;
          a {
            color: initial;
          }
        }
      `}</style>
      <div className="contact-block" style={{ maxWidth: CONTENT_WIDTH }}>
        <Row>
          {address && (
            <Col xs={24} md={8}>
              {/* Address */}
              <ServiceItem
                icon={<PushpinOutlined />}
                title={
                  <span>
                    <strong>Pick Up Available</strong>
                  </span>
                }
                tagline={
                  <Text type="secondary">
                    <small>{address}</small>
                  </Text>
                }
              />
            </Col>
          )}

          {/* Email */}
          <Col xs={24} md={8}>
            <ServiceItem
              icon={<TeamOutlined />}
              title={
                <span>
                  <strong>
                    <a href={`mailto:${email}`} target="_blank">
                      {email}
                    </a>
                  </strong>
                </span>
              }
              tagline={
                <Text type="secondary">
                  <small>Contact us anytime!</small>
                </Text>
              }
            />
          </Col>

          {/* Wechat */}
          <Col xs={24} md={8}>
            <ServiceItem
              icon={<WechatOutlined />}
              title={
                <Popover
                  title="Wechat QR code"
                  trigger="click"
                  content={
                    <div>
                      <img style={{ width: 200 }} src={wechatQr} />
                    </div>
                  }
                >
                  <span>
                    <strong>
                      <a>Click to see QR code</a>
                    </strong>
                  </span>
                </Popover>
              }
              tagline={
                <Text type="secondary">
                  <small>Find us on Wechat</small>
                </Text>
              }
            />
          </Col>

          {/* Phone */}
          {phone && (
            <Col xs={12} md={6}>
              <ServiceItem
                icon={<PhoneOutlined />}
                title={
                  <span>
                    <strong>{phone}</strong>
                  </span>
                }
                tagline={
                  <Text type="secondary">
                    <small>Contact us 24hrs a day</small>
                  </Text>
                }
              />
            </Col>
          )}
        </Row>
      </div>
    </>
  )
}

export default ContactBlock
