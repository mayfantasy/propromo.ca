import { ShoppingCartOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import { Badge, Popover, Empty } from 'antd'
import Link from 'next/link'
import { pageRoutes } from 'helpers/route.helpers'

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

  /**
   * ||===========
   * || Render
   */
  return (
    <>
      <style jsx global>{`
        .shopping-cart-icon {
          max-width: 400px;
        }
      `}</style>
      <Link href={pageRoutes.cartPage.url!}>
        <div style={{ cursor: 'pointer' }}>
          <Badge count={count || 0}>
            <ShoppingCartOutlined
              style={{
                fontSize: '25px'
              }}
            />
          </Badge>
        </div>
      </Link>
    </>
  )
})

export default ShoppingCartIcon
