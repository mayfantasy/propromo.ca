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
  Checkbox,
  Tabs,
  Select
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
  GetCustomerDocument,
  ShopifyUpdateCustomerMutation,
  ShopifyUpdateCustomerMutationVariables,
  UpdateCustomerDocument,
  ShopifyCustomerUpdateInput,
  ShopifyUpdateCustomerAddressMutation,
  ShopifyUpdateCustomerAddressMutationVariables,
  UpdateCustomerAddressDocument,
  ShopifyCustomerAddressUpdatePayload,
  ShopifyMailingAddressInput
} from '../graphql/generated'
import { useEffect } from 'react'
import { useRouter, Router } from 'next/dist/client/router'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { confirmPasswordRule } from 'helpers/form.helpers'
import CustomerProfileForm from 'components/AccountPage/CustomerProfileForm'
import CustomerAddressForm from 'components/AccountPage/CustomerAddressForm'

const { Title, Text } = Typography
const { TabPane } = Tabs
const { Option } = Select

interface IProps {
  initialGlobalSettings: IGlobalSettings
}

const AccountPage = observer((props: IProps) => {
  const { initialGlobalSettings } = props
  const bp = useBreakpoint()
  const router = useRouter()

  const {
    AuthStore: { me$ }
  } = useStores()

  useEffect(() => {
    if (!me$) {
      router.push(pageRoutes.loginPage.url || '')
    }
  }, [me$])

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
        <style jsx global>{`
          .account-page {
            margin: auto;
          }
        `}</style>
        {globalSettingsData && (
          <Layout globalSettings={globalSettingsData}>
            <div
              className="account-page"
              style={{
                maxWidth: LOGIN_CONTENT_WIDTH
              }}
            >
              <br />
              <br />

              <Title level={2}>My Account</Title>
              <Divider />

              <Tabs defaultActiveKey="1">
                {/* ===================== */}
                {/* Customer Profile Form */}
                {/* ===================== */}
                <TabPane tab="Profile" key="1">
                  <Row>
                    <Col xs={24}>
                      <CustomerProfileForm />
                    </Col>
                  </Row>
                </TabPane>

                {/* ===================== */}
                {/* Shipping Address Form */}
                {/* ===================== */}
                {/* <TabPane tab="Shipping Address" key="2">
                  <Row>
                    <Col xs={24}>
                      <CustomerAddressForm />
                    </Col>
                  </Row>
                </TabPane> */}
              </Tabs>
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

export default AccountPage
