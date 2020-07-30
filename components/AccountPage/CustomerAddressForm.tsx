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
  Select,
  Spin
} from 'antd'
import { confirmPasswordRule } from 'helpers/form.helpers'
import { useStores } from 'stores'
import { useEffect } from 'react'
import { useMutation } from 'urql'
import {
  ShopifyUpdateCustomerMutation,
  ShopifyUpdateCustomerMutationVariables,
  UpdateCustomerDocument,
  ShopifyCustomerUpdateInput,
  ShopifyUpdateCustomerAddressMutation,
  ShopifyUpdateCustomerAddressMutationVariables,
  UpdateCustomerAddressDocument,
  ShopifyMailingAddressInput,
  ShopifyCreateCustomerAddressMutation,
  ShopifyCreateCustomerAddressMutationVariables,
  CreateCustomerAddressDocument,
  ShopifySetCustomerDefaultAddressMutation,
  ShopifySetCustomerDefaultAddressMutationVariables,
  SetCustomerDefaultAddressDocument
} from 'graphql/generated'

const { Text } = Typography
const { Option } = Select

interface IProps {}

const CustomerAddressForm = observer((props: IProps) => {
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
      if (me$.defaultAddress) {
        const ad = me$.defaultAddress
        form.setFieldsValue({
          firstName: ad.firstName,
          lastName: ad.lastName,
          company: ad.company,
          address1: ad.address1,
          address2: ad.address2,
          country: ad.country || 'Canada',
          city: ad.city,
          phone: ad.phone,
          province: ad.province,
          zip: ad.zip
        })
      }
    }
  }, [me$])

  /**
   * ||===============================
   * || Create Shipping Address
   */

  const [createCustomerAddressResult, createCustomerAddress] = useMutation<
    ShopifyCreateCustomerAddressMutation,
    ShopifyCreateCustomerAddressMutationVariables
  >(CreateCustomerAddressDocument)

  const onCreateCustomerAddress = () => {
    console.log('Creating customer address...')
    form.validateFields().then((values) => {
      if (token$) {
        createCustomerAddress({
          customerAccessToken: token$,
          address: values as ShopifyMailingAddressInput
        })
      }
    })
  }

  // Success & Error states
  useEffect(() => {
    const address =
      createCustomerAddressResult.data?.customerAddressCreate?.customerAddress
    const error =
      createCustomerAddressResult.data?.customerAddressCreate
        ?.customerUserErrors[0]
    if (address) {
      onSetDefaultCustomerAddress(address.id)
    }
    if (error) {
      message.error(error.message)
    }
  }, [createCustomerAddressResult.data])

  // GQL Error states
  useEffect(() => {
    if (createCustomerAddressResult.error) {
      message.error(createCustomerAddressResult.error.message)
    }
  }, [createCustomerAddressResult.error])

  /**
   * ||===============================
   * || Set Default Shipping Address
   */

  const [
    setDefaultCustomerAddressResult,
    setDefaultCustomerAddress
  ] = useMutation<
    ShopifySetCustomerDefaultAddressMutation,
    ShopifySetCustomerDefaultAddressMutationVariables
  >(SetCustomerDefaultAddressDocument)

  const onSetDefaultCustomerAddress = (id: string) => {
    console.log('Setting default customer address...')
    if (token$) {
      setDefaultCustomerAddress({
        customerAccessToken: token$,
        addressId: id
      })
    }
  }

  // Success & Error states
  useEffect(() => {
    const customer =
      setDefaultCustomerAddressResult.data?.customerDefaultAddressUpdate
        ?.customer
    const error =
      setDefaultCustomerAddressResult.data?.customerDefaultAddressUpdate
        ?.customerUserErrors[0]
    if (customer) {
      message.success('Shipping address updated successfully.')
    }
    if (error) {
      message.error(error.message)
    }
  }, [setDefaultCustomerAddressResult.data])

  // GQL Error states
  useEffect(() => {
    if (setDefaultCustomerAddressResult.error) {
      message.error(setDefaultCustomerAddressResult.error.message)
    }
  }, [setDefaultCustomerAddressResult.error])

  /**
   * ||===============================
   * || Update Shipping Address
   */

  const [updateCustomerAddressResult, updateCustomerAddress] = useMutation<
    ShopifyUpdateCustomerAddressMutation,
    ShopifyUpdateCustomerAddressMutationVariables
  >(UpdateCustomerAddressDocument)

  const onUpdateCustomerAddress = () => {
    console.log('Updating customer address...')
    form.validateFields().then((values) => {
      if (token$ && me$?.defaultAddress) {
        updateCustomerAddress({
          customerAccessToken: token$,
          id: me$.defaultAddress.id,
          address: values as ShopifyMailingAddressInput
        })
      }
    })
  }
  // Success & Error states
  useEffect(() => {
    const address =
      updateCustomerAddressResult.data?.customerAddressUpdate?.customerAddress
    const error =
      updateCustomerAddressResult.data?.customerAddressUpdate
        ?.customerUserErrors[0]

    if (address) {
      message.success('Shipping address updated successfully.')
    }
    if (error) {
      message.error(error.message)
    }
  }, [updateCustomerAddressResult.data])

  // GQL Error states
  useEffect(() => {
    if (updateCustomerAddressResult.error) {
      message.error(updateCustomerAddressResult.error.message)
    }
  }, [updateCustomerAddressResult.error])

  /**
   * ||===============================
   * || Render
   */
  return (
    <>
      <Spin
        spinning={
          updateCustomerAddressResult.fetching ||
          createCustomerAddressResult.fetching ||
          setDefaultCustomerAddressResult.fetching
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="firstName"
            help={<small>Shipping Contact First Name</small>}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            help={<small>Shipping Contact Last Name</small>}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Company" name="company">
            <Input />
          </Form.Item>
          <Form.Item label="Address 1" name="address1">
            <Input />
          </Form.Item>
          <Form.Item label="Address 2" name="address2">
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact Phone"
            name="phone"
            help={<small>Shipping Contact Phone. Example: +16477777777</small>}
          >
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
          <Form.Item label="Province" name="province">
            <Input />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Select>
              <Option value="Canada">Canada</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Postal Code" name="zip">
            <Input />
          </Form.Item>
        </Form>
        <Row justify="end" gutter={2}>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                if (me$?.defaultAddress) {
                  onUpdateCustomerAddress()
                } else {
                  onCreateCustomerAddress()
                }
              }}
            >
              Save Address
            </Button>
          </Space>
        </Row>
      </Spin>
    </>
  )
})

export default CustomerAddressForm
