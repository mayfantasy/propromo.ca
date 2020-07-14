export interface IData<T> {
  fetching: boolean
  data: T | null
  error: string | null
}

export interface IMonfentData<T> {
  result: T
}
