export interface IData<T> {
  fetching: boolean
  data: T | null
  error: string | null
}

export interface IMonfentData<T> {
  result: T
}

export interface IServiceItem {
  icon?: React.ReactNode
  title: string | React.ReactNode
  tagline: string | React.ReactNode
}

export interface INavItem {
  name: string
  key: string
  url?: string
  dynamicUrl?: string
  icon?: React.ReactNode
  children?: INavItem[]
}
