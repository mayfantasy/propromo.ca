import {
  Upload,
  Row,
  Button,
  Modal,
  Space,
  Divider,
  Drawer,
  Col,
  Spin
} from 'antd'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { pageRoutes } from 'helpers/route.helpers'
import { useEffect, useState } from 'react'
import { ModalFuncProps } from 'antd/lib/modal'
import {
  UploadOutlined,
  AppstoreOutlined,
  DownloadOutlined,
  EyeFilled
} from '@ant-design/icons'
import UploadDesignDrawer from './UploadDesignDrawer'
import { isPdf } from 'helpers/file.helpers'
import PDFViewer from 'pdf-viewer-reactjs'
import useSWR, { mutate } from 'swr'
import { IFetchers } from 'types/fetchers.types'
import { ICustomerDesign, IGetCustomerDesignPayload } from 'types/monfent.types'
import {
  createCustomerDesign,
  getCustomerDesignFetcher,
  updateCustomerDesign,
  removeCustomerDesign
} from 'fetchers'

interface IProps {
  productHandle: string
  productVariantSku: string
}

const UploadDesign = observer((props: IProps) => {
  const { productHandle, productVariantSku } = props
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { asPath } = router

  /**
   * ||==============
   * || Store
   */
  const {
    AuthStore: { me$ }
  } = useStores()

  /**
   * ||==============
   * || Un-auth modal
   */
  const [authModalOpen, setAuthModalOpen] = useState(false)

  /**
   * ||====================
   * || Upload Design modal
   */
  const [uploadDrawerOpen, setUploadDrawerOpen] = useState(false)

  /**
   * ||====================
   * || Choose template modal
   */
  const [templateDrawerOpen, setTemplateDrawerOpen] = useState(false)

  /**
   * ||=================
   * || Set customer design
   */
  const {
    data: customerDesignData,
    error: getCustomerDesignError,
    isValidating: gettingCustomerDesign,
    revalidate: getCustomerDesign
  } = useSWR<ICustomerDesign | null>(
    [IFetchers.CustomerDesign, productHandle, productVariantSku, me$?.id],
    getCustomerDesignFetcher,
    {
      revalidateOnFocus: false
    }
  )

  const onCreateCustomerDesign = () => {
    if (me$) {
      console.log('here to create: ', uploadedFileUrl)
      if (!customerDesignData && uploadedFileUrl) {
        setLoading(true)
        createCustomerDesign({
          _handle: productHandle,
          product_handle: productHandle,
          variant_sku: productVariantSku,
          customer_id: me$.id,
          customer_name: me$.displayName,
          file: uploadedFileUrl
        }).then(() => {
          setLoading(false)
          getCustomerDesign()
        })
      }
    }
  }

  const onUpdateCustomerDesign = () => {
    if (me$) {
      if (customerDesignData && uploadedFileUrl) {
        setLoading(true)
        updateCustomerDesign(customerDesignData.id, {
          _handle: productHandle,
          product_handle: productHandle,
          variant_sku: productVariantSku,
          customer_id: me$.id,
          customer_name: me$.displayName,
          file: uploadedFileUrl
        }).then(() => {
          setLoading(false)
          getCustomerDesign()
        })
      }
    }
  }

  useEffect(() => {
    if (customerDesignData) {
      onUpdateCustomerDesign()
    } else {
      onCreateCustomerDesign()
    }
  }, [uploadedFileUrl])

  const onRemoveCustomerDesign = () => {
    if (me$) {
      if (uploadedFileUrl) {
        setUploadedFileUrl(undefined)
      }
      if (customerDesignData) {
        setLoading(true)
        removeCustomerDesign(customerDesignData.id).then(() => {
          setLoading(false)
          getCustomerDesign()
        })
      }
    }
  }

  /**
   * ||==============
   * || Render
   */

  const fileUrl = uploadedFileUrl || customerDesignData?.file
  return (
    <>
      <style jsx global>{`
        .upload-design {
          .upload-design__pdf-viewer {
          }
        }
      `}</style>
      <div className="upload-design">
        {gettingCustomerDesign ? (
          <Spin />
        ) : (
          <Row gutter={[4, 4]}>
            <Col>
              <Button
                type="link"
                onClick={() => {
                  if (me$) {
                    setUploadDrawerOpen(true)
                  } else {
                    setAuthModalOpen(true)
                  }
                }}
              >
                {customerDesignData ? <EyeFilled /> : <UploadOutlined />}{' '}
                {customerDesignData
                  ? 'View Uploaded Design'
                  : 'Upload Your Design'}
              </Button>
            </Col>

            <Col>
              <Button
                type="link"
                onClick={() => {
                  if (me$) {
                    setTemplateDrawerOpen(true)
                  } else {
                    setAuthModalOpen(true)
                  }
                }}
              >
                <AppstoreOutlined />
                Choose from Tempaltes
              </Button>
            </Col>
          </Row>
        )}
      </div>

      {/* Login Modal */}
      <Modal
        title="Please Login"
        visible={authModalOpen}
        onCancel={() => setAuthModalOpen(false)}
        footer={false}
      >
        <div>
          <div>Please login to enable custom design upload.</div>
          <br />
          <Row justify="start">
            <Space>
              <Link href={`${pageRoutes.loginPage.url}?redirect=${asPath}`}>
                <Button type="primary">Login</Button>
              </Link>
              <Link href={`${pageRoutes.registerPage.url!}?redirect=${asPath}`}>
                <Button>Register</Button>
              </Link>
            </Space>
          </Row>
        </div>
      </Modal>

      {/* Upload Drawer */}
      <Drawer
        title="Upload Design"
        placement="right"
        width="720px"
        onClose={() => setUploadDrawerOpen(false)}
        visible={uploadDrawerOpen}
        footer={
          <Row justify="end">
            <Button type="primary" onClick={() => setUploadDrawerOpen(false)}>
              Done
            </Button>
          </Row>
        }
      >
        <div
          style={{
            height: '150px'
          }}
        >
          {!customerDesignData && (
            <UploadDesignDrawer
              onChange={(url: string | undefined) => {
                console.log('onChange: ', url)
                setUploadedFileUrl(url)
              }}
            />
          )}

          <br />

          {fileUrl && (
            <>
              <Row justify="space-between">
                <Button href={fileUrl}>
                  <DownloadOutlined /> Download
                </Button>
                {fileUrl && (
                  <Button
                    loading={loading || gettingCustomerDesign}
                    danger
                    onClick={onRemoveCustomerDesign}
                  >
                    <DownloadOutlined /> Remove
                  </Button>
                )}
              </Row>
              <br />
              {loading || gettingCustomerDesign ? (
                <Spin />
              ) : !isPdf(fileUrl || '') ? (
                <img className="w-100" src={fileUrl} />
              ) : (
                <div className="upload-design__pdf-viewer">
                  <PDFViewer
                    document={{
                      url: fileUrl
                    }}
                    hideNavbar
                    hideRotation
                    hideZoom
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Drawer>

      {/* Choose Template Drawer */}
      <Drawer
        title="Basic Drawer"
        placement="right"
        width="50%"
        closable={false}
        onClose={() => setTemplateDrawerOpen(false)}
        visible={templateDrawerOpen}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
})

export default UploadDesign
