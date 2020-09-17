import useSWR from 'swr'
import Head from 'next/head'
import { IFetchers } from 'types/fetchers.types'
import { globalSettingsFetcher, homePageContentFetcher } from 'fetchers'
import { IGlobalSettings, IHomePageContent } from 'types/monfent.types'
import Layout from 'components/Layout/Layout'
import { Alert, Spin } from 'antd'
import PageLoading from 'components/PageLoading'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import HomePageSlider from 'components/HomePage/HomePageSlider'
import ServiceBlock from 'components/HomePage/ServiceBlock'
import FeaturedProducts from 'components/HomePage/FeaturedProducts'
import CollectionBlocks from 'components/HomePage/CollectionBlocks'
import SubscriptionBlock from 'components/HomePage/SubscriptionBlock'

interface IProps {
  initialGlobalSettings: IGlobalSettings
  initialPageContent: IHomePageContent
}

const HomePage = (props: IProps) => {
  const { initialGlobalSettings, initialPageContent } = props
  const bp = useBreakpoint()
  /**
   * ||===============================
   * || Load Global Settings & Content
   */
  const { data: globalSettingsData, error: globalSettingsError } = useSWR<
    IGlobalSettings
  >(IFetchers.GlobalSettings, globalSettingsFetcher, {
    initialData: initialGlobalSettings
  })
  const { data: pageContent, error: pageContentError } = useSWR<
    IHomePageContent
  >(IFetchers.HomePageContent, homePageContentFetcher, {
    initialData: initialPageContent,
    revalidateOnFocus: false
  })

  /**
   * ||===============================
   * || Render
   */
  if (globalSettingsError) {
    return (
      <>
        <Alert message="Can not load global settings." type="error" banner />
        <br />
      </>
    )
  }

  if (pageContentError) {
    return (
      <>
        <Alert message="Can not load page content." type="error" banner />
        <br />
      </>
    )
  }

  if (globalSettingsData && pageContent) {
    return (
      <>
        {globalSettingsData && pageContent && (
          <Layout globalSettings={globalSettingsData}>
            {/* <pre>{JSON.stringify(bp)}</pre> */}

            <HomePageSlider
              images={
                bp.md
                  ? pageContent.slider_images
                  : pageContent.mobile_slider_images
              }
            />

            <br />
            <br />

            <ServiceBlock />

            <br />
            <br />
            <div className="mobile-padding">
              <CollectionBlocks />
            </div>

            <br />
            {/* <br /> */}

            {/* <FeaturedProducts /> */}
          </Layout>
        )}

        {/* <pre>{JSON.stringify(pageContent, null, 2)}</pre> */}
      </>
    )
  } else {
    return <PageLoading wording="Loading page..." />
  }
}

export const getStaticProps = async () => {
  const globalSettings = await globalSettingsFetcher()
  const pageContent = await homePageContentFetcher()

  return {
    props: {
      globalSettings,
      pageContent
    }
  }
}
export default HomePage
