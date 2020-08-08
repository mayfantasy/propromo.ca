import { Typography } from 'antd'
import { CURRENCY_SYMBOL } from 'helpers/utils.helper'
import { ShopifyProductVariantFieldsFragment } from 'graphql/generated'

const { Text } = Typography

interface IProps {
  variant: ShopifyProductVariantFieldsFragment | undefined | null
}

const PriceLine = (props: IProps) => {
  const { variant } = props
  const compareAtPrice: number = variant?.compareAtPriceV2?.amount
  const price: number = variant?.priceV2?.amount

  const unitPrice = compareAtPrice || price
  const strikeThroughPrice = compareAtPrice ? price : null

  return (
    <div>
      <Text type="secondary">
        <small
          style={{
            textDecoration: strikeThroughPrice ? 'line-through' : ''
          }}
        >
          {CURRENCY_SYMBOL} {unitPrice}
        </small>
      </Text>
      &nbsp;
      {strikeThroughPrice && (
        <Text type="danger">
          {CURRENCY_SYMBOL} {strikeThroughPrice}
        </Text>
      )}
    </div>
  )
}

export default PriceLine
