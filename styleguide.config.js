const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  components: 'components/**/*.tsx',
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                getCustomTransformers: () => ({
                  before: [tsImportPluginFactory({
                    libraryName: 'antd',
                    libraryDirectory: 'lib',
                    style: true
                  })]
                }),
              },
              options: {
                useBabel: true
              }
            }
          ]
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules'
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: 1
              }
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        }
      ]
    }
  }
}
