import { Row, Spin } from 'antd'

interface IProps {
  wording?: string
}
const PageLoading = (props: IProps) => {
  const { wording } = props
  return (
    <Row
      justify="center"
      align="middle"
      style={{ width: '100vw', height: '100vh' }}
    >
      <Spin />
      &nbsp;{wording}
    </Row>
  )
}

export default PageLoading
