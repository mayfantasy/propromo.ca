import { ShoppingCartOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { Badge } from 'antd'

interface IProps {}
const ShoppingCartIcon = observer((props: IProps) => {
  const {} = props
  const {
    CheckoutStore: { checkout$ }
  } = useStores()

  const count = checkout$?.lineItems.edges.reduce(
    (a, c) => a + c.node.quantity,
    0
  )
  return (
    <Badge count={count || 0}>
      <ShoppingCartOutlined
        style={{
          fontSize: '25px'
        }}
      />
    </Badge>
  )
})

export default ShoppingCartIcon
