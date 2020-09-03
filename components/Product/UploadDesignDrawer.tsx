import {
  Upload,
  Row,
  Button,
  Modal,
  Space,
  Divider,
  Drawer,
  Col,
  Spin,
  Radio,
  Typography
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
import DesignUploader from './DesignUploader'
import { isPdf } from 'helpers/file.helpers'
import PDFViewer from 'pdf-viewer-reactjs'
import useSWR, { mutate } from 'swr'
import { IFetchers } from 'types/fetchers.types'
import {
  ICustomerDesign,
  IGetCustomerDesignPayload,
  IProductDesignTemplateInfoFormValues
} from 'types/monfent.types'
import {
  createCustomerDesign,
  getCustomerDesignFetcher,
  updateCustomerDesign,
  removeCustomerDesign
} from 'fetchers'
import { ICustomerDesignMethod } from 'types/design.types'
import { RadioChangeEvent } from 'antd/lib/radio'
import { UPLOAD_DESIGN_PREVIEW_WIDTH } from 'helpers/utils.helper'
const { Title } = Typography
interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  customerDesignData: ICustomerDesign | null | undefined
  uploadedFileUrl: string | undefined
  setUploadedFileUrl: (url: string | undefined) => void
  loading: boolean
  onRemoveCustomerDesign: () => void
  size: [number, number]
  bleed: [number, number]
}

const UploadDesignDrawer = (props: IProps) => {
  const {
    open,
    setOpen,
    customerDesignData,
    uploadedFileUrl,
    setUploadedFileUrl,
    loading,
    onRemoveCustomerDesign,
    bleed,
    size
  } = props

  /**
   * ||=====================
   * || The file preview URL
   */
  const fileUrl = uploadedFileUrl || customerDesignData?.file

  const uploadDesignPreviewSizeStyle = {
    height: UPLOAD_DESIGN_PREVIEW_WIDTH * (size[1] / size[0])
  }
  console.log(size, uploadDesignPreviewSizeStyle)
  const uploadDesignPreviewBleedStyle = {
    width: UPLOAD_DESIGN_PREVIEW_WIDTH * (bleed[0] / size[0]),
    height:
      UPLOAD_DESIGN_PREVIEW_WIDTH * (bleed[0] / size[0]) * (bleed[1] / bleed[0])
  }
  console.log(uploadDesignPreviewBleedStyle)

  /**
   * ||=====================
   * || Render
   */
  return (
    <>
      <style jsx global>{`
        .upload-design {
          .upload-design__size {
            width: 100%;
            border: 1px solid black;
            position: relative;
            .upload-design__preview {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
            .upload-design__bleed {
              border: 1px dashed red;
              z-index: 1;
            }
          }
        }
      `}</style>
      <Drawer
        className="upload-design"
        title="Upload Design"
        placement="right"
        width="720px"
        onClose={() => setOpen(false)}
        visible={open}
        footer={
          <Row justify="end">
            <Button type="primary" onClick={() => setOpen(false)}>
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
          {/* Design Uploader */}
          {/* Only sets the uploaded file url */}
          {!fileUrl && (
            <DesignUploader
              onChange={(url: string | undefined) => {
                setUploadedFileUrl(url)
              }}
            />
          )}

          <br />

          {/* File Preview */}
          {fileUrl && (
            <>
              <Row justify="space-between">
                <Button href={fileUrl}>
                  <DownloadOutlined /> Download
                </Button>
                {fileUrl && (
                  <Button
                    loading={loading}
                    danger
                    onClick={onRemoveCustomerDesign}
                  >
                    <UploadOutlined /> Remove and Re-Upload
                  </Button>
                )}
              </Row>
              <br />
              {loading ? (
                <Spin />
              ) : !isPdf(fileUrl || '') ? (
                <Row
                  className="upload-design__size  overflow-hidden"
                  style={uploadDesignPreviewSizeStyle}
                  justify="center"
                  align="middle"
                >
                  <div className="upload-design__preview">
                    <img className="w-100" src={fileUrl} />
                  </div>
                  <div
                    className="upload-design__bleed overflow-hidden"
                    style={uploadDesignPreviewBleedStyle}
                  />
                </Row>
              ) : (
                <Row
                  className="upload-design__size  overflow-hidden"
                  style={uploadDesignPreviewSizeStyle}
                  justify="center"
                  align="middle"
                >
                  <div className="upload-design__preview">
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
                  </div>
                  <div
                    className="upload-design__bleed overflow-hidden"
                    style={uploadDesignPreviewBleedStyle}
                  />
                </Row>
              )}
            </>
          )}

          <br />
          {/* Guide */}
          <div>
            <Title level={4}>Upload Guide:</Title>
            <div>
              1. Print Size: <strong>{size[0].toFixed(2)}</strong> x{' '}
              <strong>{size[1].toFixed(2)}</strong> Inch --- The uploaded file
              must be in this ratio.
            </div>
            <div>
              2. Bleed Size: <strong>{bleed[0].toFixed(2)}</strong> x{' '}
              <strong>{bleed[1].toFixed(2)}</strong> Inch
            </div>
            <div>
              3. Please ensure{' '}
              <strong>
                all background graphics are inside the bleed line (red dashed
                line)
              </strong>
              , everything outside the bleed line will be trimmed. (Important)
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default UploadDesignDrawer
