import {
  Row,
  Button,
  Space,
  Divider,
  Drawer,
  Col,
  Spin,
  Skeleton,
  Typography,
  Input
} from 'antd'
import { useEffect, useState } from 'react'

import {
  ICustomerDesign,
  IProductDesignTemplate,
  IProductDesignTemplateCustomerField
} from 'types/monfent.types'
import Form, { FormInstance } from 'antd/lib/form'

const { Title } = Typography

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  form: FormInstance
  loading: boolean
  designTemplatesData: IProductDesignTemplate[] | null | undefined
  onSubmit: () => void
  customerDesignData: ICustomerDesign | null | undefined
  selectedTemplateUrl: string | undefined
  setSelectedTemplateUrl: (template: string | undefined) => void
}

const SelectTemplateDrawer = (props: IProps) => {
  const {
    open,
    setOpen,
    form,
    loading,
    designTemplatesData,
    onSubmit,
    selectedTemplateUrl,
    setSelectedTemplateUrl
  } = props
  const [currentActive, setCurrentActive] = useState<
    IProductDesignTemplate | undefined
  >()

  /**
   * ||============================
   * || Initialize the selected
   * || active design
   */
  useEffect(() => {
    // find active design by the
    // stored file url from the design list
    const template = designTemplatesData?.find(
      (t) => t['template_img-src'] === selectedTemplateUrl
    )
    setCurrentActive(template)
  }, [selectedTemplateUrl])

  /**
   * ||======================
   * || Render
   */
  return (
    <>
      <style jsx global>{`
        .product-design-template {
          .product-design-template__template-box {
            cursor: pointer;
            .product-design-template__template-image {
              border: 3px solid transparent;
              &:hover {
                border: 3px solid #0090f0;
                transition: border 300ms ease-in-out;
              }
              &.active {
                border: 3px solid #0090f0;
              }
            }

            .product-design-template__template-name {
              margin-top: 5px;
            }
          }
        }
      `}</style>
      <Drawer
        className="product-design-template"
        title="Select Template"
        placement="right"
        width="80%"
        closable={true}
        onClose={() => setOpen(false)}
        visible={open}
      >
        <Row gutter={[16, 16]} className="h-100">
          {/* Select Template */}
          <Col xs={24} lg={12} className="h-100 overflow-scroll">
            <Title level={4}>Template Library</Title>
            <Row gutter={[4, 4]}>
              {!designTemplatesData && <Skeleton active />}
              {designTemplatesData &&
                designTemplatesData.map((template) => (
                  <Col xs={12} key={template._handle}>
                    <div
                      className="product-design-template__template-box"
                      onClick={() => {
                        setCurrentActive(template)
                        setSelectedTemplateUrl(template['template_img-src'])
                      }}
                    >
                      <div className="product-design-template__template-name">
                        {template.template_name}
                      </div>
                      <div
                        className={`product-design-template__template-image ${
                          currentActive?._handle === template._handle ||
                          selectedTemplateUrl === template['template_img-src']
                            ? 'active'
                            : ''
                        }`}
                      >
                        <img
                          src={template['template_img-src']}
                          className="w-100"
                        />
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </Col>

          {/* Preview & Form */}
          {currentActive && (
            <Col xs={24} lg={12}>
              {/* Template Preview */}
              <Title level={4}>Preview Template</Title>
              <div className="product-design-template__template-preview">
                <img
                  src={currentActive['template_img-src']}
                  className="w-100"
                />
              </div>

              <Divider />

              {/* Form */}
              <Title level={4}>Your Info</Title>
              <Spin spinning={loading}>
                <Form form={form} layout="vertical">
                  <Row gutter={[4, 4]}>
                    {currentActive.customer_fields.map((f) => {
                      let field
                      switch (f) {
                        // Title
                        case IProductDesignTemplateCustomerField.title:
                          field = (
                            <Col
                              xs={24}
                              lg={24}
                              key={IProductDesignTemplateCustomerField.title}
                            >
                              <Form.Item
                                name={IProductDesignTemplateCustomerField.title}
                                label="Title"
                              >
                                <Input placeholder="Best promotion ever" />
                              </Form.Item>
                            </Col>
                          )
                          break

                        // Name Field
                        case IProductDesignTemplateCustomerField.name:
                          field = (
                            <Col
                              xs={24}
                              lg={12}
                              key={IProductDesignTemplateCustomerField.name}
                            >
                              <Form.Item
                                name={IProductDesignTemplateCustomerField.name}
                                label="Name"
                              >
                                <Input placeholder="Bob Alan" />
                              </Form.Item>
                            </Col>
                          )
                          break

                        // Description Field
                        case IProductDesignTemplateCustomerField.description:
                          field = (
                            <Col
                              xs={24}
                              lg={24}
                              key={
                                IProductDesignTemplateCustomerField.description
                              }
                            >
                              <Form.Item
                                name={
                                  IProductDesignTemplateCustomerField.description
                                }
                                label="Description"
                              >
                                <Input.TextArea placeholder="Something about me..." />
                              </Form.Item>
                            </Col>
                          )
                          break

                        // Phone # Field
                        case IProductDesignTemplateCustomerField.phone:
                          field = (
                            <Col
                              xs={24}
                              lg={12}
                              key={IProductDesignTemplateCustomerField.phone}
                            >
                              <Form.Item
                                name={IProductDesignTemplateCustomerField.phone}
                                label="Phone #"
                              >
                                <Input placeholder="(777)-777-7777" />
                              </Form.Item>
                            </Col>
                          )
                          break

                        // Website
                        case IProductDesignTemplateCustomerField.website:
                          field = (
                            <Col
                              xs={24}
                              lg={12}
                              key={IProductDesignTemplateCustomerField.website}
                            >
                              <Form.Item
                                name={
                                  IProductDesignTemplateCustomerField.website
                                }
                                label="Website"
                              >
                                <Input placeholder="www.myname.com" />
                              </Form.Item>
                            </Col>
                          )
                        default:
                          break
                      }

                      return field
                    })}
                  </Row>

                  <Divider />

                  {/* Submit button */}
                  <div>
                    <Space>
                      <Button
                        type="primary"
                        onClick={onSubmit}
                        loading={loading}
                      >
                        Confirm
                      </Button>
                      <Button onClick={() => setOpen(false)}>Done</Button>
                    </Space>
                  </div>
                </Form>
              </Spin>
            </Col>
          )}
        </Row>
      </Drawer>
    </>
  )
}
export default SelectTemplateDrawer
