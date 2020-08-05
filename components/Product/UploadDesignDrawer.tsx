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
  Radio
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
interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  customerDesignData: ICustomerDesign | null | undefined
  uploadedFileUrl: string | undefined
  setUploadedFileUrl: (url: string | undefined) => void
  loading: boolean
  onRemoveCustomerDesign: () => void
}

const UploadDesignDrawer = (props: IProps) => {
  const {
    open,
    setOpen,
    customerDesignData,
    uploadedFileUrl,
    setUploadedFileUrl,
    loading,
    onRemoveCustomerDesign
  } = props

  const fileUrl = uploadedFileUrl || customerDesignData?.file
  return (
    <Drawer
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
        {!fileUrl && (
          <DesignUploader
            onChange={(url: string | undefined) => {
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
  )
}

export default UploadDesignDrawer
