import { Row, Col } from 'antd'
import { IServiceItem } from 'types/utils.types'

const ServiceItem = (props: IServiceItem) => {
  const { icon, title, tagline } = props
  return (
    <>
      <style jsx global>{`
        .service-item {
          width: 200px;
          .anticon {
            font-size: 35px;
          }
          .service-item__icon-container {
            height: 100%;
          }
          .service-item__title {
            color: black;
          }
          .service-item__tagline {
            line-height: 0.8rem;
            margin-top: 5px;
          }
        }
      `}</style>
      <Row className="service-item" gutter={2}>
        <Col xs={6}>
          <Row className="service-item__icon-container" align="middle">
            {icon}
          </Row>
        </Col>
        <Col xs={18}>
          <div className="service-item__title">{title}</div>
          <div className="service-item__tagline">{tagline}</div>
        </Col>
      </Row>
    </>
  )
}

export default ServiceItem
