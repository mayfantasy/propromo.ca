import { Row, Col, Input, Button, Typography, Space, Form, Alert } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { sendContactUsEmailRequest, sendSubscribeEmailRequest } from 'fetchers'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import { useState } from 'react'

const { Title } = Typography

interface IProps {
  emailReceiver: string
}

const SubscriptionBlock = (props: IProps) => {
  const { emailReceiver } = props
  const [subscribeForm] = useForm()
  const [submitStatus, setSubmitStatus] = useState({
    success: '',
    loading: false,
    error: ''
  })
  const onSubscribe = () => {
    subscribeForm.validateFields().then((v) => {
      setSubmitStatus({ success: '', loading: true, error: '' })
      sendSubscribeEmailRequest(emailReceiver, v.email)
        .then(() => {
          setSubmitStatus({
            success: 'Thanks for subsribing our newsletters.',
            loading: false,
            error: ''
          })
        })
        .catch((err) => {
          setSubmitStatus({
            success: '',
            loading: false,
            error: err?.message || 'Internal error, please try again later.'
          })
        })
    })
  }
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
            <Row gutter={2}>
              <Col flex="1">
                <Form form={subscribeForm}>
                  <Form.Item
                    name="email"
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your email address'
                      },
                      {
                        type: 'email',
                        message: 'Please use a valid email address'
                      }
                    ]}
                  >
                    <Input placeholder="Your email address" />
                  </Form.Item>
                </Form>
                {submitStatus.error && (
                  <>
                    <Alert
                      closable
                      className="mt-5"
                      type="error"
                      banner
                      message={submitStatus.error}
                    />
                    <br />
                  </>
                )}
                {submitStatus.success && (
                  <>
                    <Alert
                      closable
                      className="mt-5"
                      type="success"
                      banner
                      message={submitStatus.success}
                    />
                    <br />
                  </>
                )}
              </Col>
              <Col>
                {submitStatus.success ? (
                  <Button>Thank You!</Button>
                ) : (
                  <Button
                    loading={submitStatus.loading}
                    onClick={onSubscribe}
                    type="primary"
                    style={{ backgroundColor: '#253237' }}
                  >
                    Subscribe
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </>
  )
}

export default SubscriptionBlock
