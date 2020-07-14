import { AppProps } from 'next/app'
import 'antd/dist/antd.less'
import 'styles/global.less'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
