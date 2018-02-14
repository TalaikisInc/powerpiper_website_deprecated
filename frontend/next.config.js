const path = require('path')
const glob = require('glob')
const webpack = require('webpack')

const withTypescript = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

module.exports = withTypescript()
module.exports = withSass()
module.exports = withCSS()

module.exports = {
  poweredByHeader: false,
  webpack: (config) => {
    config.plugins.push(
      new webpack.IgnorePlugin(/^raven$/)
    )

    config.module.rules.push(
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )
    return config
  }
}
