import { useState, useEffect } from 'react'
import { Row, Col } from 'antd'

interface IProps {
  images: string[]
}
const ImageDisplay = (props: IProps) => {
  const { images } = props

  const [mainImage, setMainImage] = useState(images[0]!)

  useEffect(() => {
    setMainImage(images[0]!)
  }, [images])

  return (
    <>
      <style jsx global>{`
        .image-display {
          width: 100%;
          .image-display__main-image {
            width: 100%;
            margin-bottom: 5px;
            img {
              width: 100%;
            }
          }
          .image-display__thumbnails {
            img {
              cursor: pointer;
              width: 100%;
              border: 1px solid transparent;
              &.active {
                border: 1px solid #0090f0;
              }
            }
          }
        }
      `}</style>
      <div className="image-display">
        <div className="image-display__main-image">
          <img src={mainImage} />
        </div>
        <Row className="image-display__thumbnails" gutter={[4, 4]}>
          {images.map((image) => (
            <Col key={image} span={4}>
              <img
                className={mainImage === image ? 'active' : ''}
                src={image}
                onClick={() => setMainImage(image)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default ImageDisplay
