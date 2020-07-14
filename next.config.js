const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/theme.style.less'), 'utf8')
)

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = (phase) => {
  return withCss(
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables
      },
      webpack: (config) => {
        const newConfig = { ...config }
        newConfig.plugins = [
          ...config.plugins,
          new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
          })
        ]
        return newConfig
      }
    })
  )
}
