import { CONTENT_WIDTH } from 'helpers/layout.helper'

import SectionHeader from 'components/Utils/HeaderLine'
import CollectionProducts from 'components/Product/CollectionProducts'

interface IProps {}
const FeaturedProducts = (props: IProps) => {
  const {} = props

  /**
   * ||========================
   * || Render
   */
  return (
    <>
      <style jsx global>{`
        .featured-products {
          margin: auto;
        }
      `}</style>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div
        className="featured-products"
        style={{
          maxWidth: CONTENT_WIDTH
        }}
      >
        <SectionHeader
          title="Featured Products"
          tagline="Checkout our best selling products trusted by customers"
        />

        <CollectionProducts collectionHandle="featured-products" />
      </div>
    </>
  )
}

export default FeaturedProducts
