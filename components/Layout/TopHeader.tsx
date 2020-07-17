import { Row, Button, Col, Grid } from 'antd'
import { CONTENT_WIDTH } from 'helpers/layout.helper'
import Hamburger from 'hamburger-react'

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
                  <Button type="link">Login</Button>
                  <Button type="link">Register</Button>
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
