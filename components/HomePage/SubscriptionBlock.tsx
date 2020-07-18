import { Row, Col, Input, Button, Typography, Space } from 'antd'
import { CONTENT_WIDTH } from 'helpers/layout.helper'

const { Title } = Typography

interface IProps {}

const SubscriptionBlock = (props: IProps) => {
  const {} = props
  return (
    <>
      <style jsx global>{`
        .subscription-block {
          background-color: #0090f0;
          padding: 20px 0;
          .subscription-block__wrapper {
            width: 90%;
          }
          .subscription-block__text {
            color: white;
          }
        }
      `}</style>
      <Row className="subscription-block" justify="center" align="middle">
        <Row
          className="subscription-block__wrapper"
          style={{ maxWidth: CONTENT_WIDTH }}
          gutter={[16, 16]}
          justify="center"
          align="middle"
        >
          <Col xs={24} lg={9} className="subscription-block__text">
            <div>
              <div style={{ color: 'white', fontSize: '20px' }}>
                <strong>Sign Up For Newsletters</strong>
              </div>
            </div>
            <div>
              <small>
                Be the First to Know. Sign up for newsletter today !
              </small>
            </div>
          </Col>
          <Col xs={24} lg={15}>
            <Row>
              <Col flex="1">
                <Input placeholder="Your email address" />
              </Col>
              <Col>
                <Button type="primary" style={{ backgroundColor: '#253237' }}>
                  Subscribe
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </>
  )
}

export default SubscriptionBlock
