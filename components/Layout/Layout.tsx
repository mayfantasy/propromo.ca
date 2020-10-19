import { IGlobalSettings } from 'types/monfent.types'
import { Row, Divider } from 'antd'
import TopHeader from './TopHeader'
import MiddleHeader from './MiddleHeader'
import BottomHeader from './BottomHeader'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import Footer from './Footer'
import CopyrightBlock from './CopyrightBlock'
import ContactBlock from './ContactBlock'
import SubscriptionBlock from 'components/HomePage/SubscriptionBlock'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { pageRoutes } from 'helpers/route.helpers'
import { useMutation } from 'urql'
import {
  ShopifyCreateCheckoutMutation,
  ShopifyCreateCheckoutMutationVariables,
  CreateCheckoutDocument
} from 'graphql/generated'
import { useInitCheckout } from 'hooks/useCheckout.hook'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import MobileCollapseNav from './MobileCollapseNav'

interface IProps {
  globalSettings: IGlobalSettings
  children: React.ReactNode
}
const Layout = observer((props: IProps) => {
  const { globalSettings, children } = props

  const {
    SettingsStore: { setHeaderCollapsed$ },
    AuthStore: { setToken$, me$ }
  } = useStores()
  const router = useRouter()
  const bp = useBreakpoint()

  /**
   * ||===============
   * || Route change
   */
  useEffect(() => {
    setHeaderCollapsed$(false)
  }, [router.pathname])

  /**
   * ||===============
   * || Initialization
   */
  useEffect(() => {
    // Initialize token
    const token = localStorage.getItem('token')
    if (token) {
      setToken$(token)
    }
  }, [])

  useInitCheckout()

  /**
   * ||===============
   * || Render
   */
  return (
    <>
      <style jsx global>{`
        .propromo-layout {
          width: 100vw;
          .propromo-layout__content {
            width: 100%;
          }
        }
      `}</style>
      <div className="propromo-layout">
        <TopHeader
          announcement={globalSettings.announcement}
          hideAnnouncement={globalSettings.hide_announcement}
        />
        <MiddleHeader
          logoUrl={globalSettings.main_logo}
          contactEmail={globalSettings.contact_email}
          contactPhone={globalSettings.contact_phone}
        />

        {bp.md ? <BottomHeader /> : <MobileCollapseNav />}
        <Row justify="center">
          <div className="propromo-layout__content">{children}</div>
        </Row>

        <br />
        <br />

        <SubscriptionBlock emailReceiver={globalSettings.email_receiver} />

        <ContactBlock
          email={globalSettings.contact_email}
          address={globalSettings.contact_address}
          wechatQr={globalSettings.contact_wechat_qr}
          // phone={globalSettings.contact_phone}
        />
        <Divider />
        <Footer />
        <CopyrightBlock />
      </div>
    </>
  )
})

export default Layout
