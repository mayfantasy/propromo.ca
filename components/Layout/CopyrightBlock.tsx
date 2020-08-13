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
      <div className="copyright-block center">
        <small className="mr-8">
          Copyright@ ProPromo Inc. All Rights Reserved.
        </small>
        <br />
        <small>
          Site Powered by{' '}
          <a target="_blank" href="https://www.mayfantasy.com">
            Mayfantasy
          </a>
        </small>
      </div>
    </>
  )
}

export default CopyrightBlock
