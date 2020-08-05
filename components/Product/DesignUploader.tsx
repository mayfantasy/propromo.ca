import { Upload, Button } from 'antd'
import {
  InboxOutlined,
  LoadingOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload'
import { message, Spin } from 'antd'
import { useState, useEffect } from 'react'
import { monfentBaseUrl, monfentAuthHeaders, api } from 'request/axios'
import { UploadFile, RcCustomRequestOptions } from 'antd/lib/upload/interface'
const { Dragger } = Upload

interface IProps {
  onChange: any
}
const DesignUploader = (props: IProps) => {
  const { onChange } = props

  const [uploadStatus, setUploadStatus] = useState(false)

  /**
   * ||================
   * || Upload config
   */
  const config = {
    name: 'mf_image_uploader',
    multiple: false,
    action: `${monfentBaseUrl!}/storage/upload-image`,
    headers: monfentAuthHeaders,
    // ==============
    // Pre Validation
    beforeUpload: (file: UploadFile<any>) => {
      const isValid =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/pdf'

      // Type validation
      if (!isValid) {
        message.error('Only PDF, JPG or PNG files are supported.')
      }
      const isLt2M = file.size / 1024 / 1024 < 2

      // Size validation
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      return isValid && isLt2M
    },
    // ===============
    // On Upload
    onChange: (info: UploadChangeParam) => {
      console.log(info)
      const status = info.file.status

      const list = info.fileList

      // Loading
      if (status === 'uploading') {
        setUploadStatus(true)
        return
      }

      // Success
      if (status === 'done') {
        setUploadStatus(false)

        const url = info.file.response.result[1].mediaLink
        onChange(url)

        message.success(`${info.file.name} file uploaded successfully.`)
      }

      // Error
      else if (status === 'error') {
        setUploadStatus(false)
        // message.error(info.file.error)
      }
    },
    // Custom request

    customRequest: async (config: RcCustomRequestOptions) => {
      const { file, action, onError, onSuccess, onProgress } = config

      const form = new FormData()
      form.append('mf_image_uploader', file, file.name)

      try {
        setUploadStatus(true)
        const res = await api.post(action, form)
        setUploadStatus(false)

        const url = res.data.result[1].mediaLink
        onChange(url)

        message.success(`File uploaded successfully.`)
      } catch (e) {
        setUploadStatus(false)
        message.error(e?.message || 'Failed to upload, please try again.')
      }
    }
  }

  /**
   * ||================
   * || Render
   */
  return (
    <Dragger {...config}>
      <p className="ant-upload-drag-icon">
        {uploadStatus ? <LoadingOutlined /> : <InboxOutlined />}
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for a single upload</p>
    </Dragger>
  )
}

export default DesignUploader
