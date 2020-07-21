import { AppProps } from 'next/app'
import 'antd/dist/antd.less'
import 'styles/global.less'
import { Provider as UrqlProvider } from 'urql'
import { shopifyGql } from 'request/shopify'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={shopifyGql}>
      <Component {...pageProps} />
    </UrqlProvider>
  )
}

export default MyApp
