import { IGlobalSettings } from 'types/monfent,types'

interface IProps {
  globalSettings: IGlobalSettings
  children: React.ReactNode
}
const Layout = (props: IProps) => {
  const { globalSettings, children } = props
  return (
    <>
      <style jsx global>{`
        .propromo-layout {
        }
      `}</style>
      <div className="propromo-layout">{children}</div>
    </>
  )
}

export default Layout
