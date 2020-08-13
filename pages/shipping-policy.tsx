import useSWR from 'swr'
import Head from 'next/head'
import { IFetchers } from 'types/fetchers.types'
import {
  globalSettingsFetcher,
  homePageContentFetcher,
  sendContactUsEmailRequest,
  shippingPolicyPageContentFetcher
} from 'fetchers'
import {
  IGlobalSettings,
  IHomePageContent,
  IContactUsEmailFormValues,
  IShippingPolicyPageContent
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
import { CONTENT_WIDTH } from 'helpers/layout.helper'

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

const ShippingPolicyPage = observer((props: IProps) => {
  const { initialGlobalSettings } = props
  const bp = useBreakpoint()
  const router = useRouter()

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

  const { data: content, error: contentError } = useSWR<
    IShippingPolicyPageContent
  >(IFetchers.ShippingPolicyPageContent, shippingPolicyPageContentFetcher, {
    revalidateOnFocus: false
  })

  /**
   * ||===============================
   * || Render
   */
  if (globalSettingsError || contentError) {
    return (
      <>
        <Alert message="Can not load page." type="error" banner />
        <br />
      </>
    )
  }

  if (globalSettingsData && content) {
    return (
      <>
        <style jsx global>{`
          .shipping-policy-page {
            margin: auto;
          }
        `}</style>
        {globalSettingsData && (
          <Layout globalSettings={globalSettingsData}>
            <div
              className="shipping-policy-page"
              style={{
                maxWidth: CONTENT_WIDTH
              }}
            >
              <BreadCrumb
                items={[pageRoutes.homePage, pageRoutes.shippingPolicyPage]}
              />
              <br />
              <br />
              <Title level={2}>Shipping Policy</Title>
              <Divider />
              <div dangerouslySetInnerHTML={{ __html: content.page_article }} />
            </div>
          </Layout>
        )}
        {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
      </>
    )
  } else {
    return <PageLoading wording="Loading page..." />
  }
})

export default ShippingPolicyPage
