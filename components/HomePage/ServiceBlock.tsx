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
  CarOutlined
} from '@ant-design/icons'

const { Text } = Typography

interface IProps {}

const ServiceBlock = (props: IProps) => {
  const {} = props
  return (
    <>
      <style jsx global>{`
        .service-block {
          padding: 20px;
          border: 1px solid #ccc;
          margin: auto;
        }
      `}</style>
      <div className="service-block" style={{ maxWidth: CONTENT_WIDTH }}>
        <Row justify="space-between" gutter={[6, 6]}>
          <Col xs={24} md={12} lg={6}>
            {/* Free Shipping */}
            <ServiceItem
              icon={<CarOutlined />}
              title={
                <span>
                  <strong>Free Shipping:</strong>
                </span>
              }
              tagline={
                <Text type="secondary">
                  <small>On all orders over $199</small>
                </Text>
              }
            />
          </Col>

          {/* Best Quality */}
          <Col xs={24} md={12} lg={6}>
            <ServiceItem
              icon={<TrophyOutlined />}
              title={
                <span>
                  <strong>Best Quality:</strong>
                </span>
              }
              tagline={
                <Text type="secondary">
                  <small>Buy the best from us</small>
                </Text>
              }
            />
          </Col>

          {/* Payment Security */}
          <Col xs={24} md={12} lg={6}>
            <ServiceItem
              icon={<SafetyOutlined />}
              title={
                <span>
                  <strong>Payment Security:</strong>
                </span>
              }
              tagline={
                <Text type="secondary">
                  <small>Your payment is secured</small>
                </Text>
              }
            />
          </Col>

          {/* Support 24/7 */}
          <Col xs={24} md={12} lg={6}>
            <ServiceItem
              icon={<CommentOutlined />}
              title={
                <span>
                  <strong>Support 24/7:</strong>
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

export default ServiceBlock
