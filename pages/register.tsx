import useSWR from 'swr'
import Head from 'next/head'
import { IFetchers } from 'types/fetchers.types'
import { globalSettingsFetcher, homePageContentFetcher } from 'fetchers'
import { IGlobalSettings, IHomePageContent } from 'types/monfent.types'
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
  Checkbox
} from 'antd'
import PageLoading from 'components/PageLoading'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import {
  CONTENT_WIDTH,
  LOGIN_CONTENT_WIDTH,
  REGISTER_CONTENT_WIDTH
} from 'helpers/layout.helper'
import { useForm } from 'antd/lib/form/Form'
import Link from 'next/link'
import { pageRoutes } from 'helpers/route.helpers'
import { useMutation } from 'urql'
import {
  ShopifyLoginMutation,
  ShopifyLoginMutationVariables,
  LoginDocument,
  ShopifyCustomerCreateInput,
  ShopifyCreateCustomerMutation,
  ShopifyCreateCustomerMutationVariables,
  CreateCustomerDocument
} from '../graphql/generated'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { IRegisterFormValues } from '../types/customer.types'
import { confirmPasswordRule } from 'helpers/form.helpers'

const { Title, Text } = Typography

interface IProps {
  initialGlobalSettings: IGlobalSettings
}

const RegisterPage = (props: IProps) => {
  const { initialGlobalSettings } = props
  const bp = useBreakpoint()

  const [form] = useForm()
  const router = useRouter()

  /**
   * ||===============================
   * || Register
   */

  const [createCustomerResult, createCustomer] = useMutation<
    ShopifyCreateCustomerMutation,
    ShopifyCreateCustomerMutationVariables
  >(CreateCustomerDocument)

  const onRegister = () => {
    // createCustomer({
    //   input: {}
    // })
    form.validateFields().then((values) => {
      const customer = values as IRegisterFormValues
      createCustomer({
        input: {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone || undefined,
          password: customer.password,
          acceptsMarketing: customer.acceptsMarketing
        }
      })
    })
  }

  useEffect(() => {
    if (createCustomerResult.data?.customerCreate?.customer) {
      message.success('Registerd successfully. Please login.')
      router.push(pageRoutes.loginPage.url || '/')
    }
    if (createCustomerResult.data?.customerCreate?.customerUserErrors[0]) {
      message.error(
        createCustomerResult.data?.customerCreate?.customerUserErrors[0].message
      )
    }
  }, [createCustomerResult.data])

  useEffect(() => {
    if (createCustomerResult.error) {
      message.error(createCustomerResult.error.message)
    }
  }, [createCustomerResult.error])

  /**
   * ||===============================
   * || Load Global Settings & Content
   */
  const { data: globalSettingsData, error: globalSettingsError } = useSWR<
    IGlobalSettings
  >(IFetchers.GlobalSettings, globalSettingsFetcher, {
    initialData: initialGlobalSettings
  })

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
        <style jsx>{`
          .register-page {
            margin: auto;
          }
        `}</style>
        {globalSettingsData && (
          <Layout globalSettings={globalSettingsData}>
            <Spin spinning={createCustomerResult.fetching}>
              <div
                className="register-page"
                style={{ maxWidth: LOGIN_CONTENT_WIDTH }}
              >
                <br />
                <br />

                <Title level={4}>Register</Title>
                <Divider />

                <Form form={form} layout="vertical">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Email is required.' },
                      {
                        type: 'email',
                        message: 'Please enter a valid email address.'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      { required: true, message: 'First name is required.' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      { required: true, message: 'Last name is required.' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: 'Password is required.' }
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your passowrd.'
                      },
                      confirmPasswordRule()
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item label="Phone #" name="phone">
                    <Input />
                  </Form.Item>
                  <Form.Item name="acceptsMarketing">
                    <Checkbox>
                      <Text>
                        <small>Accept marketing emails</small>
                      </Text>
                    </Checkbox>
                  </Form.Item>
                </Form>
                <Row justify="end" gutter={2}>
                  <Space>
                    <Link href={pageRoutes.loginPage.url || ''}>
                      <Button>Login</Button>
                    </Link>
                    <Button type="primary" onClick={onRegister}>
                      Register
                    </Button>
                  </Space>
                </Row>
              </div>
            </Spin>
          </Layout>
        )}
        {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
      </>
    )
  } else {
    return <PageLoading wording="Loading page..." />
  }
}

export default RegisterPage
