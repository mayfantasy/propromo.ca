import Form, { FormInstance } from 'antd/lib/form'
import { observer } from 'mobx-react'
import { useForm } from 'antd/lib/form/Form'
import {
  Input,
  Checkbox,
  Typography,
  Row,
  Space,
  Button,
  message,
  Spin,
  Divider
} from 'antd'
import { confirmPasswordRule } from 'helpers/form.helpers'
import { useStores } from 'stores'
import { useEffect } from 'react'
import { useMutation } from 'urql'
import {
  ShopifyUpdateCustomerMutation,
  ShopifyUpdateCustomerMutationVariables,
  UpdateCustomerDocument,
  ShopifyCustomerUpdateInput
} from 'graphql/generated'
const { Text, Title } = Typography

interface IProps {}

const CustomerProfileForm = observer((props: IProps) => {
  const {} = props
  const [form] = useForm()

  const {
    AuthStore: { me$, setMe$, token$ }
  } = useStores()

  /**
   * ||===============================
   * || Initialization
   */
  useEffect(() => {
    if (me$) {
      form.setFieldsValue({
        email: me$.email,
        firstName: me$.firstName,
        lastName: me$.lastName,
        phone: me$.phone,
        acceptsMarketing: me$.acceptsMarketing
      })
    }
  }, [me$])

  /**
   * ||===============================
   * || Update Customer
   */

  const [updateCustomerResult, updateCustomer] = useMutation<
    ShopifyUpdateCustomerMutation,
    ShopifyUpdateCustomerMutationVariables
  >(UpdateCustomerDocument)

  const onUpdateCustomer = () => {
    form.validateFields().then((values) => {
      if (token$) {
        const v = values as ShopifyCustomerUpdateInput
        updateCustomer({
          customerAccessToken: token$,
          customer: {
            email: v.email,
            firstName: v.firstName,
            lastName: v.lastName,
            phone: v.phone,
            acceptsMarketing: v.acceptsMarketing,
            password: v.password || undefined
          }
        })
      }
    })
  }

  // Success & Error state
  useEffect(() => {
    const customer = updateCustomerResult.data?.customerUpdate?.customer
    const error =
      updateCustomerResult.data?.customerUpdate?.customerUserErrors[0]

    if (customer) {
      message.success('Your profile updated successfully.')
    }
    if (error) {
      message.error(error.message)
    }
  }, [updateCustomerResult.data])

  // GQL Error state
  useEffect(() => {
    if (updateCustomerResult.error) {
      message.error(updateCustomerResult.error.message)
    }
  }, [updateCustomerResult.error])

  /**
   * ||===============================
   * || Render
   */
  return (
    <>
      <Spin spinning={updateCustomerResult.fetching}>
        <Form form={form} layout="vertical">
          <Title level={4}>Basic</Title>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Please enter a valid email address.'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone #"
            name="phone"
            help={<small>Contact Phone. Example: +16477777777</small>}
          >
            <Input />
          </Form.Item>

          <Divider />

          <Title level={4}>Password</Title>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[confirmPasswordRule()]}
          >
            <Input.Password />
          </Form.Item>

          <Divider />

          <Form.Item name="acceptsMarketing" valuePropName="checked">
            <Checkbox>
              <Text>
                <small>Accept marketing emails</small>
              </Text>
            </Checkbox>
          </Form.Item>
        </Form>
        <Row justify="end" gutter={2}>
          <Space>
            <Button type="primary" onClick={onUpdateCustomer}>
              Save Profile
            </Button>
          </Space>
        </Row>
      </Spin>
    </>
  )
})

export default CustomerProfileForm
