import { Row, Col, Typography } from 'antd'
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
  PushpinOutlined
} from '@ant-design/icons'

const { Text } = Typography

interface IProps {
  email: string
  phone: string
  address: string
}

const ContactBlock = (props: IProps) => {
  const { email, phone, address } = props
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
        <Row justify="space-between">
          <Col xs={24} md={6}>
            {/* Email */}
            <ServiceItem
              icon={<PushpinOutlined />}
              title={
                <span>
                  <strong>{address}</strong>
                </span>
              }
              tagline={
                <Text type="secondary">
                  <small>Markam, ON</small>
                </Text>
              }
            />
          </Col>

          {/* Email */}
          <Col xs={24} md={6}>
            <ServiceItem
              icon={<MailOutlined />}
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
                  <small>Email us anytime!</small>
                </Text>
              }
            />
          </Col>

          {/* Phone */}
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
        </Row>
      </div>
    </>
  )
}

export default ContactBlock
