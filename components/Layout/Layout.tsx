import { IGlobalSettings } from 'types/monfent.types'
import { Row, Divider } from 'antd'
import TopHeader from './TopHeader'
import MiddleHeader from './MiddleHeader'
import BottomHeader from './BottomHeader'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import Footer from './Footer'
import CopyrightBlock from './CopyrightBlock'
import ContactBlock from './ContactBlock'

interface IProps {
  globalSettings: IGlobalSettings
  children: React.ReactNode
}
const Layout = (props: IProps) => {
  const { globalSettings, children } = props
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
              '1': 'Real Nav Items',
              '2': 'Product Detail Page',
              '3': 'Real Filters',
              '4': 'Sort Products',
              '5': 'Customer Login & Register & My Account Page',
              '6': 'Connect to CRM',
              '7': 'Cart page & Checkout',
              '8': 'Refund & Return Policy page',
              '9': 'About us page',
              '10': 'Terms & policy page'
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
}

export default Layout
