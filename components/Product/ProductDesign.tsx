import {
  Row,
  Button,
  Modal,
  Space,
  Col,
  Spin,
  Radio,
  message,
  Popover,
  Typography
} from 'antd'
import { observer } from 'mobx-react'
import { useStores } from 'stores'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { pageRoutes } from 'helpers/route.helpers'
import { useEffect, useState } from 'react'
import {
  UploadOutlined,
  AppstoreOutlined,
  DownloadOutlined,
  EyeFilled
} from '@ant-design/icons'

import useSWR, { mutate } from 'swr'
import { IFetchers } from 'types/fetchers.types'
import {
  ICustomerDesign,
  IProductDesignTemplate,
  IProductDesignTemplateInfoFormValues,
  IGlobalSettings,
  ICreateOrUpdateCustomerDesignPayload
} from 'types/monfent.types'
import {
  createCustomerDesign,
  getCustomerDesignFetcher,
  updateCustomerDesign,
  getProductDesignTemplatesFetcher
} from 'fetchers'
import { ICustomerDesignMethod } from 'types/design.types'
import { RadioChangeEvent } from 'antd/lib/radio'
import UploadDesignDrawer from './UploadDesignDrawer'
import SelectTemplateDrawer from './SelectTemplateDrawer'
import { useForm } from 'antd/lib/form/Form'
import {
  ShopifyAttributeInput,
  ShopifyProductVariantFieldsFragment
} from 'graphql/generated'
import { getCustomAttributes } from 'helpers/product.helper'
import { useReplaceCheckoutLineItems } from 'hooks/useReplaceCheckoutLineItems.hook'

const { Text } = Typography

interface IProps {
  productHandle: string
  currentVariant: ShopifyProductVariantFieldsFragment
  quantity: number
  globalSettingsData: IGlobalSettings
}

const ProductDesign = observer((props: IProps) => {
  const { productHandle, currentVariant, globalSettingsData, quantity } = props
  const productVariantSku = currentVariant.sku
  const [loading, setLoading] = useState(false)

  // The uploaded file Url (set by upload event not the original design data)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | undefined>()
  // Design method (Upload design or Select template)
  const [method, setMethod] = useState(ICustomerDesignMethod.upload)
  // Information form for selected template
  const [templateInfoForm] = useForm()
  // Selected template url
  const [selectedTemplateUrl, setSelectedTemplateUrl] = useState<
    string | undefined
  >()

  const router = useRouter()
  const { asPath } = router

  /**
   * ||============================
   * || Refresh when variant changes
   */
  useEffect(() => {
    setUploadedFileUrl(undefined)
    setSelectedTemplateUrl(undefined)
    templateInfoForm.resetFields()
  }, [productVariantSku])

  /**
   * ||==============
   * || Store
   */
  const {
    AuthStore: { me$ },
    ProductStore: { setCustomerDesign$ },
    CheckoutStore: { checkout$ }
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
  const [selectTemplateDrawerOpen, setSelectTemplateDrawerOpen] = useState(
    false
  )

  /**
   * ||=================
   * || Get Templates
   */
  const {
    data: designTemplatesData,
    error: getDesignTemplatesError,
    isValidating: gettingDesignTemplates,
    revalidate: getDesignTemplates
  } = useSWR<IProductDesignTemplate[] | null>(
    [IFetchers.ProductDesignTemplates, productHandle, productVariantSku],
    getProductDesignTemplatesFetcher,
    {
      revalidateOnFocus: false
    }
  )

  /**
   * ||=================
   * || Get customer design
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

  // Initialization right after getting
  // customer design data
  useEffect(() => {
    if (customerDesignData) {
      // ======================
      // 1. Set method
      console.log('1. Set method')
      setMethod(
        customerDesignData.use_template
          ? ICustomerDesignMethod.template
          : ICustomerDesignMethod.upload
      )
      // ======================
      // 2. Set selected template
      console.log('2. Set selected template')
      const url = customerDesignData.selected_template
      if (url) {
        setSelectedTemplateUrl(url)
      }

      // ======================
      // 3. Set customer info
      //    for the template
      console.log('3. Set customer info for the template')
      const values = {
        name: customerDesignData.info_name,
        logo: customerDesignData.info_logo,
        description: customerDesignData.info_description,
        phone: customerDesignData.info_phone,
        title: customerDesignData.info_title,
        website: customerDesignData.info_website
      }
      templateInfoForm.setFieldsValue(values)

      // ======================
      // 4. Set to store
      setCustomerDesign$(customerDesignData)
    }
  }, [customerDesignData])

  // Create or Update the design
  const {
    onReplaceCheckoutLineItems,
    checkoutLineItemsReplaceResult
  } = useReplaceCheckoutLineItems(currentVariant, quantity)

  const onCreateOrUpdateCustomerDesign = () => {
    if (me$) {
      const payload: ICreateOrUpdateCustomerDesignPayload = {
        _handle: productHandle,
        product_handle: productHandle,
        variant_sku: productVariantSku!,
        customer_id: me$.id,
        customer_email: me$.email || '',
        customer_name: me$.displayName,
        file: uploadedFileUrl || null,
        use_template: method === ICustomerDesignMethod.template,
        selected_template: selectedTemplateUrl,
        info_logo: templateInfoForm.getFieldValue('logo') || null,
        info_name: templateInfoForm.getFieldValue('name') || null,
        info_description: templateInfoForm.getFieldValue('description') || null,
        info_title: templateInfoForm.getFieldValue('title') || null,
        info_phone: templateInfoForm.getFieldValue('phone') || null,
        info_website: templateInfoForm.getFieldValue('website') || null
      }

      const successCallback = () => {
        setLoading(false)
        getCustomerDesign()

        // * || When customer design changes
        // * || update the checkout line items
        console.log('Setting customer design to checkout...')
        // customer attributes (design data for checkout)
        const customAttributes: ShopifyAttributeInput[] = getCustomAttributes(
          payload
        )
        if (checkout$) {
          onReplaceCheckoutLineItems(checkout$, customAttributes, true)
        }
      }

      if (!customerDesignData) {
        setLoading(true)
        createCustomerDesign(payload).then(successCallback)
      } else {
        setLoading(true)
        updateCustomerDesign(customerDesignData.id, payload).then(
          successCallback
        )
      }
    }
  }

  // Automatically save the uploaded design
  // When a file is uploaded
  useEffect(() => {
    if (uploadedFileUrl) {
      onCreateOrUpdateCustomerDesign()
    }
  }, [uploadedFileUrl])

  // Remove the file url from the design
  // is actually updating the design by
  // setting the file field empty
  const onRemoveCustomerDesign = () => {
    if (me$) {
      if (uploadedFileUrl) {
        setUploadedFileUrl(undefined)
      }
      if (customerDesignData?.file) {
        onCreateOrUpdateCustomerDesign()
      }
    }
  }

  /**
   * ||==============
   * || Render
   */

  return (
    <>
      <style jsx global>{`
        .upload-design {
          .upload-design__pdf-viewer {
          }
        }
      `}</style>

      <div className="upload-design">
        <Spin spinning={gettingCustomerDesign}>
          <div className="upload-design__select-method">
            <Radio.Group
              value={method}
              onChange={(v: RadioChangeEvent) => setMethod(v.target.value)}
            >
              <Radio value={ICustomerDesignMethod.upload}>
                Upload Your Design
              </Radio>
              <Radio value={ICustomerDesignMethod.template}>
                Select A Template
              </Radio>
            </Radio.Group>
          </div>
        </Spin>

        <br />

        <Row gutter={[4, 4]} align="middle">
          {/* Button for Selected Upload Custom Design */}
          {method === ICustomerDesignMethod.upload && (
            <Col>
              <Button
                loading={gettingCustomerDesign}
                type="primary"
                onClick={() => {
                  if (me$) {
                    setUploadDrawerOpen(true)
                  } else {
                    setAuthModalOpen(true)
                  }
                }}
              >
                {customerDesignData?.file ? <EyeFilled /> : <UploadOutlined />}{' '}
                {customerDesignData?.file
                  ? 'View Uploaded Design'
                  : 'Upload Your Design'}
              </Button>
            </Col>
          )}

          {/* Button for Selected Template Seleection */}
          {method === ICustomerDesignMethod.template && (
            <Col>
              <Button
                loading={gettingCustomerDesign}
                disabled={!designTemplatesData?.length}
                type="primary"
                onClick={() => {
                  if (me$) {
                    setSelectTemplateDrawerOpen(true)
                  } else {
                    setAuthModalOpen(true)
                  }
                }}
              >
                <AppstoreOutlined />
                {!designTemplatesData?.length
                  ? 'No templates for this item'
                  : 'Choose from Tempaltes'}
              </Button>
            </Col>
          )}
          <Popover
            trigger="click"
            title="Let Us Help"
            placement="bottom"
            content={
              <div>
                <div>
                  Email:{' '}
                  <a href={`mailto:${globalSettingsData.contact_email}`}>
                    {globalSettingsData.contact_email}
                  </a>
                </div>
                <div>Phone #: {globalSettingsData.contact_phone}</div>
              </div>
            }
          >
            <a className="ml-15">
              <small>Have a question?</small>
            </a>
          </Popover>
        </Row>
        {/* <div>
          <Text type="secondary">
            <small>Skip the upload process</small>
          </Text>
        </div> */}
      </div>

      {/* Un-Auth state Login Modal */}
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

      {/* Upload Design Drawer */}
      <UploadDesignDrawer
        {...{
          open: uploadDrawerOpen,
          setOpen: setUploadDrawerOpen,
          loading: loading || gettingCustomerDesign,
          customerDesignData,
          uploadedFileUrl,
          setUploadedFileUrl,
          onRemoveCustomerDesign
        }}
      />

      {/* Choose Template Drawer */}
      <SelectTemplateDrawer
        {...{
          open: selectTemplateDrawerOpen,
          setOpen: setSelectTemplateDrawerOpen,
          loading: gettingDesignTemplates || loading,
          form: templateInfoForm,
          designTemplatesData,
          onSubmit: onCreateOrUpdateCustomerDesign,
          customerDesignData,
          selectedTemplateUrl,
          setSelectedTemplateUrl
        }}
      />
    </>
  )
})

export default ProductDesign
