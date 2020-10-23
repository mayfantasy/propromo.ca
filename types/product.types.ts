export enum IProductFilter {
  'best-seller' = 'best-seller',
  event = 'event',
  'realtor-and-agent' = 'realtor-and-agent',
  'retail-store-and-dealer' = 'retail-store-and-dealer',
  'restaurant-and-cafe' = 'restaurant-and-cafe',
  'service-facility' = 'service-facility',
  'grand-opening' = 'grand-opening'
}

export interface IProductFilterItem {
  key: IProductFilter
  name: string
}
