export interface IData<T> {
  fetching: boolean
  data: T | null
  error: string | null
}
