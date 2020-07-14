import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

const api = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_MONFENT_BASE_URL || ''}/api`
})

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const _config = {
      ...config,
      headers: {
        'x-acc-k': process.env.NEXT_PUBLIC_MONFENT_API_KEY || ''
      }
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
