import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const monfentBaseUrl = `${process.env.NEXT_PUBLIC_MONFENT_BASE_URL!}/api`
export const monfentAuthHeaders = {
  'x-acc-k': process.env.NEXT_PUBLIC_MONFENT_API_KEY!
}

const api = Axios.create({
  baseURL: monfentBaseUrl
})

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const _config = {
      ...config,
      headers: monfentAuthHeaders
    }
    return _config
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

api.interceptors.response.use(
  (res: any) => {
    return res
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

export { api }
