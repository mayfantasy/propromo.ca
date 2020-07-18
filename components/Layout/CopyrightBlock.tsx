import { Row } from 'antd'

interface IProps {}

const CopyrightBlock = (props: IProps) => {
  const {} = props
  return (
    <>
      <style jsx global>{`
        .copyright-block {
          padding: 10px;
          background-color: #f5f6f7;
        }
      `}</style>
      <Row className="copyright-block" justify="center">
        <small>Copyright@ ProPromo Inc. All Rights Reserved.</small>
      </Row>
    </>
  )
}

export default CopyrightBlock
