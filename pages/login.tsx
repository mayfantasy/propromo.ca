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
  message
} from 'antd'
import PageLoading from 'components/PageLoading'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { CONTENT_WIDTH, LOGIN_CONTENT_WIDTH } from 'helpers/layout.helper'
import { useForm } from 'antd/lib/form/Form'
import Link from 'next/link'
import { pageRoutes } from 'helpers/route.helpers'
import { useMutation, useQuery } from 'urql'
import {
  ShopifyLoginMutation,
  ShopifyLoginMutationVariables,
  LoginDocument,
  ShopifyCustomerCreateInput,
  ShopifyGetCustomerQuery,
  GetCustomerDocument
} from '../graphql/generated'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { observer } from 'mobx-react'
import { useStores } from 'stores'

const { Title } = Typography

interface IProps {
  initialGlobalSettings: IGlobalSettings
}

const LoginPage = observer((props: IProps) => {
  const { initialGlobalSettings } = props
  const bp = useBreakpoint()

  const [form] = useForm()
  const router = useRouter()

  const redirectUrl = router.query.redirect as string | undefined

  const {
    AuthStore: { setToken$, token$, me$ }
  } = useStores()

  useEffect(() => {
    if (me$) {
      router.push(pageRoutes.accountPage.url!)
    }
  }, [])

  /**
   * ||===============================
   * || Login
   */

  const [loginResult, login] = useMutation<
    ShopifyLoginMutation,
    ShopifyLoginMutationVariables
  >(LoginDocument)

  const onLogin = () => {
    form.validateFields().then((values) => {
      login({
        input: values as ShopifyCustomerCreateInput
      })
    })
  }

  useEffect(() => {
    if (loginResult.data?.customerAccessTokenCreate?.customerAccessToken) {
      message.success('Login successfully.')
      const token =
        loginResult.data.customerAccessTokenCreate?.customerAccessToken
          ?.accessToken
      setToken$(token)
      router.push(redirectUrl || pageRoutes.homePage.url || '/')
    }
    if (loginResult.data?.customerAccessTokenCreate?.customerUserErrors[0]) {
      message.error(
        loginResult.data?.customerAccessTokenCreate?.customerUserErrors[0]
          .message
      )
    }
  }, [loginResult.data])

  useEffect(() => {
    if (loginResult.error) {
      message.error(loginResult.error.message)
    }
  }, [loginResult.error])

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
          .login-page {
            margin: auto;
          }
        `}</style>
        {globalSettingsData && (
          <Layout globalSettings={globalSettingsData}>
            <Spin spinning={loginResult.fetching}>
              <div
                className="login-page mobile-padding"
                style={{
                  maxWidth: LOGIN_CONTENT_WIDTH
                }}
              >
                <br />
                <br />
                <br />
                <br />

                <Title level={4}>Login</Title>
                <Divider />

                <Form
                  form={form}
                  labelCol={{
                    xs: 5
                  }}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Email is required.'
                      },
                      {
                        type: 'email',
                        message: 'Please enter a valid email address.'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Password is required.'
                      }
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Form>
                <Row justify="end" gutter={2}>
                  <Space>
                    <Link
                      href={`${pageRoutes.registerPage.url!}${
                        redirectUrl ? `?redirect=${redirectUrl}` : ''
                      }`}
                    >
                      <Button>Register</Button>
                    </Link>
                    <Button type="primary" onClick={onLogin}>
                      Login
                    </Button>
                  </Space>
                </Row>
              </div>

              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </Spin>
          </Layout>
        )}
        {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
      </>
    )
  } else {
    return <PageLoading wording="Loading page..." />
  }
})

export default LoginPage
