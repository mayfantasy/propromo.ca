import { productFilters } from 'helpers/product.helper'
import { Checkbox, Col, Row } from 'antd'
import { IProductFilterItem, IProductFilter } from 'types/product.types'

interface IProps {
  value: IProductFilterItem[]
  onChange: (value: IProductFilterItem[]) => void
}

const Filters = (props: IProps) => {
  const { value, onChange } = props
  return (
    <Checkbox.Group
      value={value?.map((v) => v.key)}
      onChange={(value) =>
        onChange(value.map((v) => productFilters[v as IProductFilter]))
      }
    >
      {Object.keys(productFilters).map((f) => (
        <Row className="mb-8" key={f}>
          <Col xs={4}>
            <Checkbox value={f} />
          </Col>

          <Col xs={20} className="line-height-medium">
            {productFilters[f].name}
          </Col>
        </Row>
      ))}
    </Checkbox.Group>
  )
}

export default Filters
