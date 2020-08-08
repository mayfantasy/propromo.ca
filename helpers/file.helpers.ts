export const isPdf = (url: string) => {
  return url.includes('.pdf')
}

export const isLink = (str: string) => {
  return str.includes('https://') || str.includes('http://')
}
