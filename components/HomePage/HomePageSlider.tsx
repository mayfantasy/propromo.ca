import { Carousel, Button, Typography, Row, Alert } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { ISliderContent } from 'types/home-page.types'

interface IProps {
  images: string[]
}

const HomePageSlider = (props: IProps) => {
  const { images } = props
  const bp = useBreakpoint()
  const sliderContents: ISliderContent[] = [
    {
      title:
        'Samsung Galaxy Note 8 Giveaway 16GB, Wi-Fi + Cellular for AT&T SHOP NOW',
      tagline: 'Free Shipping On Order $250',
      button: <Button type="primary">Shop Now</Button>
    },
    {
      title:
        'Samsung Galaxy Note 8 Giveaway 16GB, Wi-Fi + Cellular for AT&T SHOP NOW',
      tagline: 'Free Shipping On Order $250',
      button: <Button type="primary">Shop Now</Button>
    }
  ]
  return (
    <div className="home-page-slider">
      <style jsx global>{`
        .home-page-slider {
          .slider-image {
            width: 100%;
            position: relative;
            img {
              width: 100%;
              z-index: -1;
            }
            .slider-image__content {
              width: 35%;
              top: 50%;
              left: 8%;
              transform: translateY(-50%);
              position: absolute;
              z-index: 1;
            }
            .slider-image__content--mobile {
              width: 80%;
              top: 10%;
              left: 50%;
              text-align: center;
              transform: translateX(-50%);
              position: absolute;
              z-index: 1;
            }
          }
        }
      `}</style>
      <Carousel style={{ width: '100%' }} autoplay>
        {images.map((img, i) => (
          <div className="slider-image" key={i}>
            <img src={img} />
            {bp.md ? (
              <div className="slider-image__content">
                {sliderContents.length !== images.length && (
                  <Alert
                    style={{ width: '100%' }}
                    banner
                    message="Error: Slider Images and contents length not matched"
                    type="error"
                  />
                )}
                {sliderContents.length === images.length && (
                  <div className="slider-image__wrapper">
                    <h3>{sliderContents[i].title}</h3>
                    <p>{sliderContents[i].tagline}</p>
                    {sliderContents[i].button}
                  </div>
                )}
              </div>
            ) : (
              <div className="slider-image__content--mobile">
                {sliderContents.length !== images.length && (
                  <Alert
                    style={{ width: '100%' }}
                    banner
                    message="Error: Slider Images and contents length not matched"
                    type="error"
                  />
                )}
                {sliderContents.length === images.length && (
                  <div className="slider-image__wrapper">
                    <h3>{sliderContents[i].title}</h3>
                    <p>{sliderContents[i].tagline}</p>
                    {sliderContents[i].button}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default HomePageSlider
