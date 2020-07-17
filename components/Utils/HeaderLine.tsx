import { Typography } from 'antd'

const { Title, Text } = Typography

interface IProps {
  title: string | React.ReactNode
  tagline: string | React.ReactNode
}
const SectionHeader = (props: IProps) => {
  const { title, tagline } = props
  return (
    <>
      <style jsx>{`
        .section-header {
          margin-bottom: 10px;
        }
      `}</style>
      <div className="section-header">
        <Title level={4}>{title}</Title>
        <div>
          <Text type="secondary">
            <small>{tagline}</small>
          </Text>
        </div>
      </div>
    </>
  )
}

export default SectionHeader
