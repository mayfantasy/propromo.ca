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
