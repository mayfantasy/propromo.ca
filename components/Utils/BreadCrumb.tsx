import { INavItem } from 'types/utils.types'
import { Breadcrumb } from 'antd'
import Link from 'next/link'

interface IProps {
  items: INavItem[]
}
const BreadCrumb = (props: IProps) => {
  const { items } = props
  return (
    <div style={{ margin: '20px 0' }}>
      <Breadcrumb>
        {items.map((item) => (
          <Breadcrumb.Item key={item.key}>
            {item.url ? (
              <Link href={item.url}>
                <a>{item.name}</a>
              </Link>
            ) : (
              <span>{item.name}</span>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  )
}

export default BreadCrumb
