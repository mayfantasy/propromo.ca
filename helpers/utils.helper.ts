import { isNaN } from 'lodash'

export const CURRENCY_SYMBOL = 'CAD$'
export const PAGE_SIZE = 100
export const RELATED_PRODUCT_TAG_PREFIX = '__related__'
export const FILEUPLOAD_ENABLED_TAG = '__fileupload__enabled'
export const VARIANT_FILEUPLOAD_ENABLED_TAG_PREFIX = '__fileupload__enabled__'
export const VARIANT_FILEUPLOAD_SIZE_PREFIX = '__fileupload__size__'
export const VARIANT_FILEUPLOAD_BLEED_PREFIX = '__fileupload__bleed__'
export const UPLOAD_DESIGN_PREVIEW_WIDTH = 672

export const getFileuploadSize = (
  sizeStr: string | undefined
): [number, number] => {
  const emptySizeArr = [0, 0] as [number, number]
  if (!sizeStr) {
    return emptySizeArr
  }
  const sizeArr = sizeStr.split('x')
  console.log(sizeArr)
  if (sizeArr.length !== 2) {
    return emptySizeArr
  } else {
    if (isNaN(sizeArr[0]) || isNaN(sizeArr[1])) {
      return emptySizeArr
    } else {
      return [Number(sizeArr[0]), Number(sizeArr[1])] as [number, number]
    }
  }
}
