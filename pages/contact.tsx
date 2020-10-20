import useSWR from 'swr'
import Head from 'next/head'
import { IFetchers } from 'types/fetchers.types'
import {
  globalSettingsFetcher,
  homePageContentFetcher,
  sendContactUsEmailRequest
} from 'fetchers'
import {
  IGlobalSettings,
  IHomePageContent,
  IContactUsEmailFormValues
} from 'types/monfent.types'
import Layout from 'components/Layout/Layout'
import {
  Alert,
  Spin,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Row,
  Col,
  Space,
  message,
  Checkbox,
  Tabs,
  Select,
  Comment
} from 'antd'
import PageLoading from 'components/PageLoading'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import {
  CONTENT_WIDTH,
  LOGIN_CONTENT_WIDTH,
  REGISTER_CONTENT_WIDTH
} from 'helpers/layout.helper'

import { useRouter } from 'next/dist/client/router'
import { observer } from 'mobx-react'
import BreadCrumb from 'components/Utils/BreadCrumb'
import { pageRoutes } from 'helpers/route.helpers'
import { PushpinOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import { useState } from 'react'

const { Title, Text } = Typography

interface IProps {
  initialGlobalSettings: IGlobalSettings
}

const ContactPage = observer((props: IProps) => {
  const { initialGlobalSettings } = props
  const bp = useBreakpoint()
  const router = useRouter()

  const [form] = useForm()
  const [submitStatus, setSubmitStatus] = useState({
    success: '',
    loading: false,
    error: ''
  })

  /**
   * ||===============================
   * || Load Global Settings & Content
   */
  const { data: globalSettingsData, error: globalSettingsError } = useSWR<
    IGlobalSettings
  >(IFetchers.GlobalSettings, globalSettingsFetcher, {
    initialData: initialGlobalSettings,
    revalidateOnFocus: false
  })

  const onSubmitForm = (values: IContactUsEmailFormValues) => {
    if (globalSettingsData) {
      setSubmitStatus({ success: '', loading: true, error: '' })
      sendContactUsEmailRequest(globalSettingsData.email_receiver, values)
        .then(() => {
          setSubmitStatus({
            success:
              'Thanks for contacting us, our customer service representative will contact you as soon as possible.',
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
    }
  }

  /**
   * ||===============================
   * || Render
   */
  if (globalSettingsError) {
    return (
      <>
        <Alert message="Can not load global settings." type="error" banner />
        <br />
      </>
    )
  }

  if (globalSettingsData) {
    return (
      <>
        <style jsx global>{`
          .contact-page {
            margin: auto;
          }
        `}</style>
        {globalSettingsData && (
          <Layout globalSettings={globalSettingsData} htmlTitle="Contact Us">
            <div
              className="contact-page mobile-padding"
              style={{
                maxWidth: REGISTER_CONTENT_WIDTH
              }}
            >
              <BreadCrumb
                items={[pageRoutes.homePage, pageRoutes.contactPage]}
              />
              <br />
              <br />
              <Title level={2}>Contact Us</Title>
              <Divider />
              <Spin spinning={submitStatus.loading}>
                <Form
                  form={form}
                  onFinish={(values) =>
                    onSubmitForm(values as IContactUsEmailFormValues)
                  }
                  layout="vertical"
                >
                  <Row gutter={[4, 4]}>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="name"
                        label="Full Name"
                        required
                        rules={[
                          { required: true, message: 'Name is required.' }
                        ]}
                      >
                        <Input placeholder="Bob Alan" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        required
                        rules={[
                          {
                            required: true,
                            message: 'Email is required.'
                          },
                          {
                            type: 'email'
                          }
                        ]}
                      >
                        <Input placeholder="my-email@gmail.com" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={24}>
                      <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                          {
                            required: true,
                            message: 'Email title is required.'
                          }
                        ]}
                      >
                        <Input placeholder="How long does it take to ship to Downtown Toronto?" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={24}>
                      <Form.Item
                        name="content"
                        label="Message"
                        rules={[
                          { required: true, message: 'Message is required.' }
                        ]}
                      >
                        <Input.TextArea
                          rows={5}
                          placeholder="Hi, I want to know..."
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <br />
                  {submitStatus.error && (
                    <>
                      <Alert type="error" banner message={submitStatus.error} />
                      <br />
                    </>
                  )}
                  {submitStatus.success && (
                    <>
                      <Alert
                        type="success"
                        banner
                        message={submitStatus.success}
                      />
                      <br />
                    </>
                  )}
                  {!submitStatus.success && (
                    <Row>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Row>
                  )}
                </Form>
              </Spin>
            </div>
          </Layout>
        )}
        {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
      </>
    )
  } else {
    return <PageLoading wording="Loading page..." />
  }
})

export default ContactPage
