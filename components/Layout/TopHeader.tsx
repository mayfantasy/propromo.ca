import { Row, Button, Col, Grid } from 'antd'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import Hamburger from 'hamburger-react'
import { pageRoutes } from 'helpers/route.helpers'
import Link from 'next/link'

interface IProps {
  announcement: string
  hideAnnouncement: boolean
}

const TopHeader = (props: IProps) => {
  const { announcement, hideAnnouncement } = props
  const { useBreakpoint } = Grid

  const bp = useBreakpoint()
  return (
    <>
      <style jsx global>{`
        .top-header {
          background-color: #efefef;
          min-height: 45px;
          .top-header__content {
            width: 90%;
            font-size: 0.8rem;
          }
        }
      `}</style>
      <Row className="top-header" justify="center" align="middle">
        <Row
          className="top-header__content"
          style={{ maxWidth: CONTENT_WIDTH }}
          justify="space-between"
          align="middle"
        >
          <Col className="top-header__announcement" xs={20} md={16}>
            {!hideAnnouncement && announcement && <div>{announcement}</div>}
          </Col>
          <Col className="top-header__nav" xs={4} md={8}>
            <Row justify="end">
              {bp.md && (
                <>
                  <Link href={pageRoutes.loginPage.url || ''}>
                    <Button type="link">Login</Button>
                  </Link>
                  <Link href={pageRoutes.registerPage.url || ''}>
                    <Button type="link">Register</Button>
                  </Link>
                </>
              )}
              {!bp.md && (
                <>
                  <Hamburger />
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Row>
    </>
  )
}

export default TopHeader
