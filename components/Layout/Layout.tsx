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

interface IProps {
  globalSettings: IGlobalSettings
  children: React.ReactNode
}
const Layout = observer((props: IProps) => {
  const { globalSettings, children } = props

  const {
    AuthStore: { setToken$, me$ }
  } = useStores()
  const router = useRouter()

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
          .propromo-layout__content {
            width: 100%;
          }
        }
      `}</style>
      <div className="propromo-layout">
        {/* <pre>
          {JSON.stringify(
            {
              NEXT________: '1',
              '1': 'Real Nav Items',
              '2': 'Edit welcome email template (or do redirection to the real store)',
              '3': 'Real Filters',

              '5':
                'Upload all products to shopify (Upload upload-design product first to do testing)',

              '8': 'Refund & Return Policy page',
              '9': 'About us page',
              '10': 'Terms & policy page',
              '11': 'Connect to CRM',
              '12': 'Product Images & Category Images',
              '13': 'Documentation for product tag machanism on product detail page',
              
              '14': 'Setup shopify payment settings and proceed test orders.'
              
              '17': 'The note field'
            },
            null,
            2
          )}
        </pre> */}
        <TopHeader
          announcement={globalSettings.announcement}
          hideAnnouncement={globalSettings.hide_announcement}
        />
        <MiddleHeader
          logoUrl={globalSettings.main_logo}
          contactEmail={globalSettings.contact_email}
          contactPhone={globalSettings.contact_phone}
        />
        <BottomHeader />
        <Row justify="center">
          <div className="propromo-layout__content">{children}</div>
        </Row>

        <br />
        <br />

        <SubscriptionBlock />

        <ContactBlock
          email={globalSettings.contact_email}
          phone={globalSettings.contact_phone}
          address={globalSettings.contact_address}
        />
        <Divider />
        <Footer />
        <CopyrightBlock />
      </div>
    </>
  )
})

export default Layout
