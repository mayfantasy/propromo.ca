import { FormInstance } from 'antd/lib/form'

const lengthRegex = /(?=.{6,})/i
const numberRegex = /(?=.*[0-9])/i
const letterRegex = /(?=.*[a-zA-Z])/i

export const passwordLengthRule = () => ({
  validator(rule: any, value: string) {
    if (!value || value.match(lengthRegex)) {
      return Promise.resolve()
    }
    return Promise.reject('At least 6 characters')
  }
})

export const leastANumRule = () => ({
  validator(rule: any, value: string) {
    if (!value || value.match(numberRegex)) {
      return Promise.resolve()
    }
    return Promise.reject('At least 1 number')
  }
})

export const leastALetterRule = () => ({
  validator(rule: any, value: string) {
    if (!value || value.match(letterRegex)) {
      return Promise.resolve()
    }
    return Promise.reject('At least 1 letter')
  }
})

export const confirmPasswordRule: any = (fieldName?: string) => (
  form: FormInstance
) => ({
  validator(rule: any, value: string) {
    if (!value || form.getFieldValue(fieldName || 'password') === value) {
      return Promise.resolve()
    }
    return Promise.reject('The two passwords that you entered do not match')
  }
})
